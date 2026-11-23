// criticalUX Figma plugin: main thread (runs inside Figma's sandbox).
// Depends on rules.js and engine.js, which build.js concatenates in front of this file.

figma.showUI(__html__, { width: 360, height: 600, themeColors: true });
try { figma.root.setRelaunchData({ open: "Audit screens against criticalUX rules" }); } catch (e) { /* manifest without relaunch buttons */ }

var MAX_NODES = 4000;
var FONT = { r: { family: "Inter", style: "Regular" }, m: { family: "Inter", style: "Medium" }, s: { family: "Inter", style: "Semi Bold" }, b: { family: "Inter", style: "Bold" } };
var C = {
  page: "#F5F6F8", card: "#FFFFFF", calm: "#F1F2F4", text: "#14171C", muted: "#4F5663", border: "#D9DCE1",
  accent: "#2B50E0", positive: "#0A7448", negative: "#C42B21", pending: "#5B4BC4", warning: "#8A5800", info: "#1F5BC8",
  lime: "#B8EF2B", ink: "#11140F", high: "#C42B21", medium: "#8A5800", low: "#1F5BC8"
};

// ------------------------------------------------------------------ serialize
function firstSolid(paints) {
  if (!paints || paints === figma.mixed || !paints.length) return null;
  for (var i = paints.length - 1; i >= 0; i--) {
    var p = paints[i];
    if (p.visible !== false && p.type === "SOLID") return { r: p.color.r, g: p.color.g, b: p.color.b, a: p.opacity == null ? 1 : p.opacity };
  }
  return null;
}
function weightOf(style) {
  style = String(style || "").toLowerCase();
  if (/black|heavy/.test(style)) return 900;
  if (/extra ?bold/.test(style)) return 800;
  if (/semi ?bold|demi/.test(style)) return 600;
  if (/bold/.test(style)) return 700;
  if (/medium/.test(style)) return 500;
  if (/light|thin/.test(style)) return 300;
  return 400;
}
function serialize(node, counter) {
  counter = counter || { n: 0 };
  if (counter.n++ > MAX_NODES) return null;
  var bb = node.absoluteBoundingBox || { x: 0, y: 0, width: node.width || 0, height: node.height || 0 };
  var o = { id: node.id, name: node.name, type: node.type, x: bb.x, y: bb.y, w: bb.width, h: bb.height, visible: node.visible !== false, children: [] };
  if ("fills" in node) o.fill = firstSolid(node.fills);
  if ("strokes" in node && node.strokes && node.strokes.length) o.stroke = true;
  if ("cornerRadius" in node && node.cornerRadius !== figma.mixed) o.radius = node.cornerRadius || 0;
  else if ("topLeftRadius" in node) o.radius = node.topLeftRadius || 0;
  if ("opacity" in node) o.opacity = node.opacity;
  if (node.type === "TEXT") {
    o.text = node.characters;
    o.fontSize = node.fontSize === figma.mixed ? (node.characters.length ? node.getRangeFontSize(0, 1) : 16) : node.fontSize;
    var fn = node.fontName === figma.mixed ? (node.characters.length ? node.getRangeFontName(0, 1) : null) : node.fontName;
    o.fontWeight = fn ? weightOf(fn.style) : 400;
    if (node.fills === figma.mixed && node.characters.length) o.fill = firstSolid(node.getRangeFills(0, 1));
  }
  if (node.type === "INSTANCE" || node.type === "COMPONENT") {
    o.props = {};
    try {
      var cp = node.componentProperties || {};
      for (var k in cp) if (Object.prototype.hasOwnProperty.call(cp, k)) o.props[k.split("#")[0]] = String(cp[k].value);
    } catch (e) { /* component sets without properties */ }
    try {
      var vp = node.variantProperties || {};
      for (var v in vp) if (Object.prototype.hasOwnProperty.call(vp, v)) o.props[v] = String(vp[v]);
    } catch (e2) {}
  }
  if ("children" in node) {
    for (var i = 0; i < node.children.length; i++) {
      var c = serialize(node.children[i], counter);
      if (c) o.children.push(c);
    }
  }
  return o;
}
function auditRoots() {
  var sel = figma.currentPage.selection;
  if (!sel.length) return [];
  return sel.filter(function (n) { return n.type !== "SLICE"; });
}

// ------------------------------------------------------------------ helpers
function rgb(hexStr) {
  var h = hexStr.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
}
function solid(hexStr, opacity) { return [{ type: "SOLID", color: rgb(hexStr), opacity: opacity == null ? 1 : opacity }]; }
function loadFonts() { return Promise.all([figma.loadFontAsync(FONT.r), figma.loadFontAsync(FONT.m), figma.loadFontAsync(FONT.s), figma.loadFontAsync(FONT.b)]); }
function txt(chars, size, weight, color, opts) {
  var t = figma.createText();
  t.fontName = weight === "b" ? FONT.b : weight === "s" ? FONT.s : weight === "m" ? FONT.m : FONT.r;
  t.characters = chars;
  t.fontSize = size;
  t.fills = solid(color || C.text);
  opts = opts || {};
  if (opts.width) { t.textAutoResize = "HEIGHT"; t.resize(opts.width, t.height); }
  if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: "PERCENT" };
  if (opts.tabular) { try { t.setRangeOpenTypeFeatures(0, chars.length, { TNUM: true }); } catch (e) {} }
  if (opts.name) t.name = opts.name;
  if (opts.align) t.textAlignHorizontal = opts.align;
  return t;
}
function box(name, o) {
  o = o || {};
  var f = o.component ? figma.createComponent() : figma.createFrame();
  f.name = name;
  f.layoutMode = o.dir === "h" ? "HORIZONTAL" : "VERTICAL";
  f.primaryAxisSizingMode = o.fixedMain ? "FIXED" : "AUTO";
  f.counterAxisSizingMode = o.width || o.height ? "FIXED" : "AUTO";
  f.itemSpacing = o.gap == null ? 12 : o.gap;
  var p = o.pad == null ? 0 : o.pad;
  if (typeof p === "number") p = [p, p, p, p];
  f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3];
  f.fills = o.fill ? solid(o.fill, o.fillOpacity) : [];
  if (o.stroke) { f.strokes = solid(o.stroke); f.strokeWeight = o.strokeWeight || 1; }
  f.cornerRadius = o.radius || 0;
  if (o.width && f.layoutMode === "VERTICAL") f.resize(o.width, 10);
  if (o.width && f.layoutMode === "HORIZONTAL") { f.primaryAxisSizingMode = "FIXED"; f.counterAxisSizingMode = "AUTO"; f.resize(o.width, 10); }
  if (o.align) f.counterAxisAlignItems = o.align;
  if (o.justify) f.primaryAxisAlignItems = o.justify;
  f.clipsContent = false;
  return f;
}
function fill(child) { child.layoutAlign = "STRETCH"; return child; }
function grow(child) { child.layoutGrow = 1; return child; }
function add(parent, kids) { for (var i = 0; i < kids.length; i++) if (kids[i]) parent.appendChild(kids[i]); return parent; }
function icon(svg, color, size) {
  var n = figma.createNodeFromSvg(svg.replace(/currentColor/g, color));
  n.name = "icon";
  n.resize(size || 20, size || 20);
  return n;
}
var ICONS = {
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M20 6L9 17l-5-5"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g></svg>',
  undo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></g></svg>',
  alert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></g></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></g></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12l2 2l4-4"/></g></svg>',
  back: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>'
};
function button(label, kind, opts) {
  opts = opts || {};
  var primary = kind === "primary", danger = kind === "danger";
  var b = box("Button / " + (kind || "secondary"), { dir: "h", pad: [16, 20, 16, 20], radius: 12, fill: primary ? C.text : danger ? C.negative : C.card, stroke: primary || danger ? null : C.border, justify: "CENTER", align: "CENTER", gap: 8 });
  add(b, [txt(label, 16, "s", primary || danger ? "#FFFFFF" : C.text)]);
  return b;
}
function row(label, value, opts) {
  opts = opts || {};
  var r = box("Row / " + label, { dir: "h", gap: 12, justify: "SPACE_BETWEEN", align: "CENTER", pad: [12, 0, 12, 0] });
  add(r, [txt(label, 15, "r", C.muted), txt(value, opts.big ? 17 : 15, opts.strong ? "s" : "m", opts.color || C.text, { tabular: true })]);
  return r;
}
function divider() { var d = figma.createRectangle(); d.name = "Divider"; d.resize(100, 1); d.fills = solid(C.border); d.layoutAlign = "STRETCH"; return d; }
function chip(label, color, ic) {
  var c = box("Status / " + label, { dir: "h", gap: 6, pad: [6, 12, 6, 10], radius: 999, fill: color, fillOpacity: 0.1, align: "CENTER" });
  add(c, [icon(ICONS[ic], color, 16), txt(label, 14, "s", color)]);
  return c;
}
function card(name, width) { return box(name, { component: true, width: width || 390, pad: 24, gap: 16, radius: 24, fill: C.card, stroke: C.border }); }
function note(rules) { var t = txt("criticalUX · " + rules, 11, "m", C.muted); t.name = "Rules applied"; return t; }

// ------------------------------------------------------------------ patterns
var PATTERNS = {
  confirm: function () {
    var c = card("criticalUX / Payment confirmation");
    var hero = box("Amount", { gap: 6, pad: 20, radius: 16, fill: C.lime, align: "MAX" });
    add(hero, [txt("You're sending", 13, "s", C.ink), txt("₹24,000.00", 40, "s", C.ink, { tabular: true, name: "Amount" })]);
    var payee = box("Payee", { dir: "h", gap: 12, align: "CENTER" });
    var av = box("Avatar", { pad: [12, 13, 12, 13], radius: 999, fill: C.calm, align: "CENTER" }); add(av, [txt("RK", 15, "s", C.text)]);
    var pt = box("Payee text", { gap: 2 });
    var ok = box("Verified", { dir: "h", gap: 6, align: "CENTER" }); add(ok, [icon(ICONS.check, C.positive, 16), txt("Name verified by the bank", 13, "m", C.positive)]);
    add(pt, [txt("Ramesh Kumar", 17, "s"), txt("ramesh.k@okhdfcbank", 13, "r", C.muted), ok]);
    add(payee, [av, pt]);
    var rows = box("Details", { gap: 0 });
    add(rows, [fill(row("Fee", "₹0.00")), fill(divider()), fill(row("Arrives", "Instantly, UPI")), fill(divider()), fill(row("Can you cancel?", "No"))]);
    add(c, [fill(hero), payee, fill(rows), fill(button("Pay ₹24,000.00 to Ramesh Kumar", "primary")), fill(button("Edit", "secondary")), note("core-4 · flows-1 · flows-2 · flows-3")]);
    return c;
  },
  fees: function () {
    var c = card("criticalUX / Fee and FX quote");
    add(c, [txt("Review the cost", 20, "s")]);
    var rows = box("Quote", { gap: 0 });
    add(rows, [fill(row("You send", "1,000.00 GBP")), fill(divider()), fill(row("Our fee", "−4.12 GBP")), fill(divider()), fill(row("Rate (mid-market)", "1 GBP = 106.42 INR")), fill(divider()), fill(row("They receive", "1,05,981.53 INR", { strong: true, big: true })), fill(divider()), fill(row("Should arrive", "Tomorrow (estimate)"))]);
    add(c, [fill(rows), txt("The rate is the mid-market rate with no markup. Your fee is the only charge.", 13, "r", C.muted, { width: 342 }), fill(button("Continue", "primary")), note("flows-1 · data-2 · data-12")]);
    return c;
  },
  scam: function () {
    var c = card("criticalUX / Collect request warning");
    var warn = box("Warning", { dir: "h", gap: 12, pad: 16, radius: 16, fill: C.warning, fillOpacity: 0.1, stroke: C.warning });
    var wt = box("Warning text", { gap: 4 });
    add(wt, [txt("You're being asked to pay", 16, "s", C.warning), txt("Entering your UPI PIN sends money. It never receives it.", 14, "r", C.text, { width: 270 })]);
    add(warn, [icon(ICONS.alert, C.warning, 22), wt]);
    add(c, [fill(warn), txt("₹9,999.00", 36, "s", C.text, { tabular: true }), txt("Requested by", 13, "r", C.muted), txt("KYC Update Desk", 17, "s"), txt("kycupdate.help@ybl · Not in your contacts · First request", 13, "r", C.muted, { width: 342 }),
      fill(button("Decline request", "primary")), fill(button("Pay anyway", "secondary")), note("core-5 · flows-4 · flows-5")]);
    return c;
  },
  failed: function () {
    var c = card("criticalUX / Payment failed");
    add(c, [icon(ICONS.info, C.warning, 32), txt("Payment didn't go through", 22, "s"), txt("₹2,500.00 was not debited from your account. Ramesh Kumar hasn't received it.", 15, "r", C.muted, { width: 342, lineHeight: 140 }),
      fill(button("Try again", "primary")), fill(button("Pay another way", "secondary")), note("core-10 · flows-6")]);
    return c;
  },
  unknown: function () {
    var c = card("criticalUX / Unknown result");
    add(c, [icon(ICONS.clock, C.pending, 32), txt("Checking whether your payment went through", 20, "s", C.text, { width: 342 }), txt("Don't pay again yet. We'll update you here and by SMS as soon as your bank confirms.", 15, "r", C.muted, { width: 342, lineHeight: 140 }),
      fill(row("Amount", "₹2,500.00")), fill(row("Started", "10:42 am")), fill(button("Done", "secondary")), note("flows-7 · data-12 · data-13")]);
    return c;
  },
  consent: function () {
    var c = card("criticalUX / Consent, off by default");
    add(c, [txt("Choose what we can use", 20, "s"), txt("Each one is optional. You can change these anytime in Settings.", 14, "r", C.muted, { width: 342 })]);
    var items = [["Offers by SMS", "Up to 2 messages a month"], ["Share spending with my accountant", "Read-only, for 90 days"], ["Add trip protection (₹199)", "Covers cancellations up to ₹10,000"]];
    for (var i = 0; i < items.length; i++) {
      var r = box("Option / " + items[i][0], { dir: "h", gap: 12, pad: 14, radius: 14, stroke: C.border });
      var cb = box("Checkbox / Unchecked", { pad: 11, radius: 6, stroke: C.text, strokeWeight: 2 });
      var tt = box("Text", { gap: 2 }); add(tt, [txt(items[i][0], 15, "s"), txt(items[i][1], 13, "r", C.muted)]);
      add(r, [cb, tt]); add(c, [fill(r)]);
    }
    add(c, [fill(button("Continue", "primary")), note("flows-8 · flows-dark")]);
    return c;
  },
  status: function () {
    var c = card("criticalUX / Status chips");
    var wrap = box("Chips", { dir: "h", gap: 8 });
    try { wrap.layoutWrap = "WRAP"; wrap.counterAxisSpacing = 8; } catch (e) {}
    add(wrap, [chip("Pending", C.pending, "clock"), chip("Paid", C.positive, "check"), chip("Failed", C.negative, "x"), chip("Refunded", C.info, "undo"), chip("Returned", C.warning, "undo")]);
    add(c, [txt("Status = icon + word + colour", 17, "s"), fill(wrap), note("data-chip · data-12")]);
    return c;
  },
  patient: function () {
    var c = card("criticalUX / Patient banner and dose", 440);
    var ban = box("Patient banner", { dir: "h", gap: 12, pad: 14, radius: 14, fill: C.calm, align: "CENTER" });
    var bt = box("Identity", { gap: 2 }); add(bt, [txt("Asha Verma", 17, "s"), txt("DOB 12 Mar 1961 (64 y) · UHID 448120", 13, "r", C.muted)]);
    add(ban, [bt, chip("Allergy: penicillin", C.negative, "alert")]);
    var dose = box("Order", { gap: 4 });
    add(dose, [txt("Metformin 500 mg", 20, "s"), txt("By mouth, twice a day with food", 15, "r", C.muted), txt("Next dose 8:00 pm · 0.5 tablet if eGFR below 45", 13, "r", C.muted)]);
    add(c, [fill(ban), dose, fill(button("Record dose given to Asha Verma", "primary")), note("dom-3 · dom-5")]);
    return c;
  },
  question: function () {
    var c = card("criticalUX / One question per page");
    var back = box("Back link", { dir: "h", gap: 4, align: "CENTER" }); add(back, [icon(ICONS.back, C.text, 16), txt("Back", 15, "m")]);
    var fields = box("Date fields", { dir: "h", gap: 12 });
    var labels = [["Day", 56], ["Month", 56], ["Year", 88]];
    for (var i = 0; i < labels.length; i++) {
      var f = box("Field / " + labels[i][0], { gap: 6 });
      var input = figma.createRectangle(); input.name = "Input"; input.resize(labels[i][1], 44); input.cornerRadius = 8; input.fills = solid(C.card); input.strokes = solid(C.text); input.strokeWeight = 2;
      add(f, [txt(labels[i][0], 14, "m"), input]); add(fields, [f]);
    }
    add(c, [back, txt("What is your date of birth?", 24, "b", C.text, { width: 342 }), txt("For example, 27 3 1985", 14, "r", C.muted), fields, txt("Middle name (optional)", 14, "m"), button("Continue", "primary"), note("dom-9 · core-12")]);
    return c;
  },
  alarms: function () {
    var c = card("criticalUX / Alarm tiers", 440);
    var tiers = [["Critical", "Pump 3 pressure high · 12 s ago", C.negative, "alert", true], ["Warning", "Feeder 7 load at 92% · 4 min ago", C.warning, "alert", false], ["Advisory", "Sensor 14 offline, last value 3.2 bar at 10:41", C.info, "info", false]];
    add(c, [txt("Only the top tier interrupts", 17, "s")]);
    for (var i = 0; i < tiers.length; i++) {
      var r = box("Alarm / " + tiers[i][0], { dir: "h", gap: 12, pad: 14, radius: 14, fill: tiers[i][2], fillOpacity: tiers[i][4] ? 0.12 : 0.06, align: "CENTER" });
      var tt = box("Text", { gap: 2 }); add(tt, [txt(tiers[i][0], 15, "s", tiers[i][2]), txt(tiers[i][1], 13, "r", C.text, { width: 220 })]);
      add(r, [icon(ICONS[tiers[i][3]], tiers[i][2], 22), grow(tt)]);
      if (tiers[i][4]) add(r, [button("Acknowledge", "danger")]);
      add(c, [fill(r)]);
    }
    add(c, [note("core-7 · core-8 · dom-6 · dom-8")]);
    return c;
  }
};

// ------------------------------------------------------------------ annotations
function clearMarkers() {
  var removed = 0;
  var nodes = figma.currentPage.findAll(function (n) { return n.getPluginData("cux") === "marker"; });
  for (var i = 0; i < nodes.length; i++) { nodes[i].remove(); removed++; }
  return removed;
}
function annotate(findings, native) {
  return loadFonts().then(function () {
    var byNode = [];
    var count = 0;
    var promises = findings.map(function (f) { return figma.getNodeByIdAsync(f.nodeId).then(function (n) { return { f: f, n: n }; }); });
    return Promise.all(promises).then(function (pairs) {
      var group = [];
      var minX = Infinity, maxX = -Infinity, minY = Infinity;
      pairs.forEach(function (p, i) {
        if (!p.n || !p.n.absoluteBoundingBox) return;
        var bb = p.n.absoluteBoundingBox;
        minX = Math.min(minX, bb.x); maxX = Math.max(maxX, bb.x + bb.width); minY = Math.min(minY, bb.y);
        var dot = figma.createFrame();
        dot.name = "criticalUX " + (i + 1);
        dot.resize(26, 26); dot.cornerRadius = 13;
        dot.fills = solid(C[p.f.severity] || C.high);
        dot.strokes = solid("#FFFFFF"); dot.strokeWeight = 2;
        dot.layoutMode = "HORIZONTAL"; dot.primaryAxisAlignItems = "CENTER"; dot.counterAxisAlignItems = "CENTER";
        dot.primaryAxisSizingMode = "FIXED"; dot.counterAxisSizingMode = "FIXED";
        add(dot, [txt(String(i + 1), 12, "b", "#FFFFFF")]);
        dot.x = bb.x - 13; dot.y = bb.y - 13;
        dot.setPluginData("cux", "marker");
        figma.currentPage.appendChild(dot);
        group.push(dot);
        if (native) {
          try {
            var rule = CUX_RULES_BY_ID[p.f.ruleId];
            var existing = (p.n.annotations || []).filter(function (a) { return !(a.label && a.label.indexOf("criticalUX") === 0); });
            p.n.annotations = existing.concat([{ label: "criticalUX " + (i + 1) + " · " + p.f.ruleId + " · " + p.f.problem + " Fix: " + p.f.fix + (rule ? " (" + rule.title + ")" : "") }]);
          } catch (e) { /* annotations unsupported on this node type */ }
        }
        count++;
        byNode.push(p);
      });
      if (!count) return 0;
      // notes panel to the right of the audited area
      var panel = box("criticalUX audit notes", { width: 380, pad: 20, gap: 12, radius: 20, fill: C.card, stroke: C.border });
      add(panel, [txt("criticalUX audit", 18, "b"), txt(count + " issue" + (count > 1 ? "s" : "") + " · " + new Date().toLocaleDateString(), 12, "r", C.muted)]);
      pairs.forEach(function (p, i) {
        if (!p.n) return;
        var r = box("Note " + (i + 1), { dir: "h", gap: 10 });
        var num = figma.createFrame(); num.resize(22, 22); num.cornerRadius = 11; num.fills = solid(C[p.f.severity] || C.high);
        num.layoutMode = "HORIZONTAL"; num.primaryAxisAlignItems = "CENTER"; num.counterAxisAlignItems = "CENTER"; num.primaryAxisSizingMode = "FIXED"; num.counterAxisSizingMode = "FIXED";
        add(num, [txt(String(i + 1), 11, "b", "#FFFFFF")]);
        var tt = box("Text", { gap: 3 });
        var rule = CUX_RULES_BY_ID[p.f.ruleId];
        add(tt, [txt(p.f.problem, 13, "s", C.text, { width: 310 }), txt("Fix: " + p.f.fix, 12, "r", C.muted, { width: 310 }), txt(p.f.ruleId + (rule ? " · " + rule.title : "") + " · " + p.f.severity, 11, "m", C[p.f.severity] || C.muted, { width: 310 })]);
        add(r, [num, tt]); add(panel, [r]);
      });
      panel.x = maxX + 80; panel.y = minY;
      panel.setPluginData("cux", "marker");
      figma.currentPage.appendChild(panel);
      return count;
    });
  });
}

// ------------------------------------------------------------------ messages
function post(msg) { figma.ui.postMessage(msg); }

figma.on("selectionchange", function () {
  var s = figma.currentPage.selection;
  post({ type: "selection", count: s.length, names: s.slice(0, 3).map(function (n) { return n.name; }) });
});

figma.ui.onmessage = function (msg) {
  if (msg.type === "init") {
    Promise.all([figma.clientStorage.getAsync("cux-settings")]).then(function (r) {
      var s = figma.currentPage.selection;
      post({ type: "init", settings: r[0] || {}, count: s.length, names: s.slice(0, 3).map(function (n) { return n.name; }) });
    });
  }
  if (msg.type === "save-settings") figma.clientStorage.setAsync("cux-settings", msg.settings);

  if (msg.type === "audit") {
    var roots = auditRoots();
    if (!roots.length) { post({ type: "audit-result", error: "Select one or more frames to audit." }); return; }
    var counter = { n: 0 };
    var snaps = roots.map(function (r) { return serialize(r, counter); }).filter(Boolean);
    var findings = audit(snaps, {});
    post({ type: "audit-result", findings: findings, screens: roots.map(function (r) { return r.name; }), nodes: counter.n, truncated: counter.n > MAX_NODES });
  }

  if (msg.type === "select") {
    figma.getNodeByIdAsync(msg.nodeId).then(function (n) {
      if (!n) { figma.notify("That layer no longer exists."); return; }
      var page = n; while (page && page.type !== "PAGE") page = page.parent;
      var go = page && page !== figma.currentPage ? figma.setCurrentPageAsync(page) : Promise.resolve();
      go.then(function () { figma.currentPage.selection = [n]; figma.viewport.scrollAndZoomIntoView([n]); });
    });
  }

  if (msg.type === "annotate") {
    annotate(msg.findings, msg.native).then(function (n) { figma.notify(n ? "criticalUX: added " + n + " markers and a notes panel" : "Nothing to annotate"); post({ type: "annotated", count: n }); });
  }
  if (msg.type === "clear-markers") { var k = clearMarkers(); figma.notify("Removed " + k + " criticalUX markers"); }

  if (msg.type === "insert") {
    var build = PATTERNS[msg.id];
    if (!build) return;
    loadFonts().then(function () {
      var node = build();
      var c = figma.viewport.center;
      node.x = Math.round(c.x - node.width / 2); node.y = Math.round(c.y - node.height / 2);
      figma.currentPage.appendChild(node);
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
      figma.notify("Inserted " + node.name);
    }).catch(function (e) { figma.notify("Couldn't insert: " + e.message, { error: true }); });
  }

  if (msg.type === "capture") {
    var rs = auditRoots();
    if (!rs.length) { post({ type: "capture-result", error: "Select a frame for the deep review." }); return; }
    var target = rs[0];
    var scale = Math.min(2, 1400 / Math.max(target.width, target.height, 1));
    var cnt = { n: 0 };
    var snap = serialize(target, cnt);
    target.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: scale } }).then(function (bytes) {
      post({ type: "capture-result", png: figma.base64Encode(bytes), snapshot: snap, name: target.name });
    }).catch(function (e) { post({ type: "capture-result", error: "Couldn't export the frame: " + e.message }); });
  }
};
