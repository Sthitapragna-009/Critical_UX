// Run: node --test figma-plugin/test
const test = require("node:test");
const assert = require("node:assert");
const { audit } = require("../src/engine.js");
const { CUX_RULES_BY_ID } = require("../src/rules.js");

let n = 0;
const W = { r: 1, g: 1, b: 1, a: 1 }, INK = { r: 0.08, g: 0.09, b: 0.11, a: 1 }, LIME = { r: 0.72, g: 0.94, b: 0.17, a: 1 };
function T(text, extra) { return Object.assign({ id: "t" + ++n, name: text.slice(0, 20), type: "TEXT", x: 0, y: 0, w: 200, h: 24, text, fontSize: 16, fill: INK, children: [] }, extra || {}); }
function F(name, children, extra) { return Object.assign({ id: "f" + ++n, name, type: "FRAME", x: 0, y: 0, w: 390, h: 800, fill: null, children }, extra || {}); }
function Btn(label, extra) { return F("Button", [T(label, { fill: W })], Object.assign({ w: 320, h: 56, fill: INK, radius: 12 }, extra || {})); }
const rules = (f) => f.map((x) => x.ruleId);

test("bad payment screen trips the key money rules", () => {
  const screen = F("Payment", [
    T("Are you sure?"),
    T("24,000.00"),
    F("Row", [F("Checkbox", [], { props: { "Checked": "True" }, w: 24, h: 24 }), T("Add trip protection ₹199")]),
    T("Card 4111 1111 1111 1111"),
    T("Error U30"),
    T("Your card was flagged as fraud. Payment declined."),
    T("Low contrast note", { fill: { r: 0.8, g: 0.8, b: 0.8, a: 1 } }),
    Btn("Yes"),
    F("Close button", [T("×", { fill: W })], { w: 20, h: 20, fill: INK, radius: 10 })
  ], { fill: W });
  const f = audit([screen]);
  const ids = rules(f);
  for (const r of ["core-4", "data-2", "flows-8", "data-14", "core-10", "flows-6", "core-12"]) assert.ok(ids.includes(r), "missing " + r + " in " + ids.join(","));
  assert.strictEqual(f[0].severity, "high", "highs sort first");
  for (const x of f) assert.ok(CUX_RULES_BY_ID[x.ruleId], "unknown rule " + x.ruleId);
});

test("a well-designed confirmation stays clean", () => {
  const screen = F("Review payment", [
    T("₹24,000.00", { fontSize: 48 }),
    T("Ramesh Kumar"), T("Name verified by the bank"),
    T("Fee ₹0.00"), T("Arrives instantly. You can't cancel this."),
    Btn("Pay ₹24,000.00 to Ramesh"),
    F("Button", [T("Edit")], { w: 120, h: 56, fill: W, stroke: true, radius: 12 })
  ], { fill: W });
  const f = audit([screen]).filter((x) => x.severity !== "low");
  assert.deepStrictEqual(f.map((x) => x.ruleId + ":" + x.problem), []);
});

test("bare Pay button and missing consequence are flagged", () => {
  const f = audit([F("Pay", [T("₹500.00"), Btn("Pay")], { fill: W })]);
  const ids = rules(f);
  assert.ok(ids.includes("flows-3"));
});

test("clinical notation and patient identity", () => {
  const f = audit([F("Order", [T("Give 1.0 mg"), T("then .5 mg"), T("Insulin 10 U")], { fill: W })]);
  const ids = rules(f);
  assert.strictEqual(ids.filter((r) => r === "dom-5").length, 3);
  assert.ok(ids.includes("dom-3"), "patient not identified");
});

test("credit pre-selected and Not-now-only consent", () => {
  const f = audit([F("Checkout", [
    F("Option", [F("Radio", [], { props: { "Selected": "true" }, w: 24, h: 24 }), T("Pay later in 3 EMIs")]),
    T("Allow notifications for offers?"),
    Btn("Allow"), Btn("Not now")
  ], { fill: W })]);
  const ids = rules(f);
  assert.ok(ids.includes("flows-9"));
  assert.ok(ids.includes("flows-8"));
});

test("safe action as a text link next to a scam warning", () => {
  const f = audit([F("Collect", [T("Warning: this request is from someone not in your contacts"), T("₹9,999.00"), Btn("Pay ₹9,999.00"), T("Decline")], { fill: W })]);
  assert.ok(rules(f).includes("flows-5"));
});

test("UPI reference numbers are not treated as unmasked accounts", () => {
  const f = audit([F("Receipt", [T("UPI ref 4417 2209 8831"), T("₹2,000.00 sent")], { fill: W })]);
  assert.ok(!rules(f).includes("data-14"));
});
