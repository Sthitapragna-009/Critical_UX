// Smoke test: runs the built code.js against a strict mock of the Figma plugin API.
// Run: node --test figma-plugin/test
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ENUMS = {
  layoutMode: ["NONE", "HORIZONTAL", "VERTICAL"],
  primaryAxisSizingMode: ["FIXED", "AUTO"],
  counterAxisSizingMode: ["FIXED", "AUTO"],
  primaryAxisAlignItems: ["MIN", "CENTER", "MAX", "SPACE_BETWEEN"],
  counterAxisAlignItems: ["MIN", "CENTER", "MAX", "BASELINE"],
  layoutAlign: ["MIN", "CENTER", "MAX", "STRETCH", "INHERIT"],
  textAutoResize: ["NONE", "WIDTH_AND_HEIGHT", "HEIGHT", "TRUNCATE"],
  textAlignHorizontal: ["LEFT", "CENTER", "RIGHT", "JUSTIFIED"],
  layoutWrap: ["NO_WRAP", "WRAP"]
};

function makeFigma() {
  let ids = 0;
  const loaded = new Set();
  const posted = [];
  const notes = [];
  const all = {};
  function mk(type, init) {
    const props = { type, id: "1:" + ++ids, name: type, visible: true, width: 100, height: 100, x: 0, y: 0, children: [], parent: null, _pd: {} };
    const node = new Proxy(props, {
      set(t, k, v) {
        if (ENUMS[k] && !ENUMS[k].includes(v)) throw new Error(type + "." + k + " = " + v + " is not a valid value");
        if (type === "TEXT" && (k === "characters" || k === "fontSize")) {
          const f = t.fontName || { family: "Inter", style: "Regular" };
          if (!loaded.has(f.family + "|" + f.style)) throw new Error("Font " + f.family + " " + f.style + " not loaded before setting " + k);
        }
        if (k === "fontName" && !loaded.has(v.family + "|" + v.style)) throw new Error("Font " + v.family + " " + v.style + " not loaded");
        if ((k === "layoutAlign" || k === "layoutGrow") && !t.parent) {
          // Figma allows setting these before append; nothing to check.
        }
        t[k] = v;
        return true;
      }
    });
    Object.assign(props, {
      appendChild(c) { if (c.parent) c.parent.children.splice(c.parent.children.indexOf(c), 1); c.parent = node; props.children.push(c); },
      resize(w, h) { if (!(w > 0 && h > 0)) throw new Error("resize needs positive size, got " + w + "x" + h); props.width = w; props.height = h; },
      remove() { if (props.parent) props.parent.children.splice(props.parent.children.indexOf(node), 1); props.parent = null; },
      setPluginData(k, v) { props._pd[k] = v; },
      getPluginData(k) { return props._pd[k] || ""; },
      setRangeOpenTypeFeatures() {},
      findAll(fn) { const out = []; (function w(n) { n.children.forEach((c) => { if (fn(c)) out.push(c); w(c); }); })(node); return out; },
      get absoluteBoundingBox() { return { x: props.x, y: props.y, width: props.width, height: props.height }; },
      exportAsync() { return Promise.resolve(new Uint8Array([137, 80, 78, 71])); }
    });
    all[props.id] = node;
    return node;
  }
  const page = mk("PAGE", { name: "Page 1" });
  const figma = {
    mixed: Symbol("mixed"),
    showUI() {},
    notify(m, o) { notes.push({ m, o }); },
    on() {},
    ui: { postMessage(m) { posted.push(m); }, onmessage: null },
    clientStorage: { getAsync: () => Promise.resolve({}), setAsync: () => Promise.resolve() },
    loadFontAsync(f) { if (!f || !f.family) throw new Error("bad font"); loaded.add(f.family + "|" + f.style); return Promise.resolve(); },
    createFrame: () => mk("FRAME"),
    createComponent: () => mk("COMPONENT"),
    createRectangle: () => mk("RECTANGLE"),
    createText: () => { const t = mk("TEXT"); return t; },
    createNodeFromSvg(svg) { if (!/^<svg/.test(svg)) throw new Error("bad svg"); return mk("FRAME", {}); },
    getNodeByIdAsync: (id) => Promise.resolve(all[id] || null),
    setCurrentPageAsync: () => Promise.resolve(),
    base64Encode: () => "iVBORw0KGgo=",
    viewport: { center: { x: 500, y: 400 }, scrollAndZoomIntoView() {} },
    currentPage: page
  };
  page.selection = [];
  return { figma, posted, notes, mk, page };
}

function load() {
  const env = makeFigma();
  const code = fs.readFileSync(path.join(__dirname, "..", "code.js"), "utf8");
  const ctx = { figma: env.figma, __html__: "<html></html>", console, Promise, Math, JSON, Object, String, Number, Date, Array, Infinity };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return env;
}
const tick = () => new Promise((r) => setTimeout(r, 20));

test("audit posts findings for a selected frame", async () => {
  const env = load();
  const { figma, mk } = env;
  // build a bad screen through the mock API, the way a designer's file would look
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  const screen = mk("FRAME"); screen.name = "Pay"; screen.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; screen.resize(390, 800);
  const t1 = figma.createText(); t1.characters = "Are you sure?"; t1.fontSize = 16; t1.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; screen.appendChild(t1);
  const t2 = figma.createText(); t2.characters = "24,000.00"; t2.fontSize = 16; t2.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; screen.appendChild(t2);
  const t3 = figma.createText(); t3.characters = "Send money to Ramesh"; t3.fontSize = 16; t3.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; screen.appendChild(t3);
  figma.currentPage.selection = [screen];
  figma.ui.onmessage({ type: "audit" });
  await tick();
  const res = env.posted.find((m) => m.type === "audit-result");
  assert.ok(res && !res.error, JSON.stringify(res));
  const ids = res.findings.map((f) => f.ruleId);
  assert.ok(ids.includes("core-4") && ids.includes("data-2"), ids.join(","));
});

test("empty selection asks the designer to select a frame", async () => {
  const env = load();
  env.figma.ui.onmessage({ type: "audit" });
  await tick();
  assert.match(env.posted.find((m) => m.type === "audit-result").error, /Select/);
});

for (const id of ["confirm", "fees", "scam", "failed", "unknown", "consent", "status", "patient", "question", "alarms"]) {
  test("pattern inserts without API errors: " + id, async () => {
    const env = load();
    env.figma.ui.onmessage({ type: "insert", id });
    await tick();
    const err = env.notes.find((n) => n.o && n.o.error);
    assert.ok(!err, err && err.m);
    const ins = env.page.children.find((c) => c.type === "COMPONENT");
    assert.ok(ins, "component added to page");
    assert.match(ins.name, /^criticalUX \//);
  });
}

test("annotate adds markers and a notes panel, clear removes them", async () => {
  const env = load();
  const { figma, mk } = env;
  const n = mk("FRAME"); n.name = "Button"; n.x = 40; n.y = 600; n.resize(320, 56);
  figma.ui.onmessage({ type: "annotate", native: true, findings: [{ ruleId: "core-4", severity: "high", nodeId: n.id, layer: "Button", problem: "Vague button", fix: "Name the action" }] });
  await tick(); await tick();
  const markers = env.page.findAll((x) => x.getPluginData("cux") === "marker");
  assert.strictEqual(markers.length, 2);
  assert.ok(Array.isArray(n.annotations) && /criticalUX 1/.test(n.annotations[0].label));
  figma.ui.onmessage({ type: "clear-markers" });
  assert.strictEqual(env.page.findAll((x) => x.getPluginData("cux") === "marker").length, 0);
});
