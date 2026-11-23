// criticalUX built-in audit engine.
// Input: a plain snapshot of the selected Figma layers (see serialize() in figma-main.js):
//   { id, name, type, x, y, w, h, visible, text?, fontSize?, fontWeight?, fill?, opacity?,
//     props?: { key: value }, children: [] }
//   fill is { r, g, b, a } in 0..1 for the first visible solid fill, or null.
// Output: findings [{ key, ruleId, severity, nodeId, layer, problem, fix, evidence }].
// Heuristic checks: they flag what layers alone can show. Claude deep review covers the rest.

var SEV_ORDER = { high: 0, medium: 1, low: 2 };

var RX = {
  vagueButton: /^(yes|ok|okay|confirm|submit|proceed|continue|done|i agree|agree|accept)[.!]?$/i,
  areYouSure: /are you sure|do you want to proceed|do you really want/i,
  bareAction: /^(pay|pay now|send|send money|send now|transfer|transfer now|confirm payment|place order|buy|buy now|invest|invest now|borrow)[.!]?$/i,
  moneyContext: /[₹$£€¥]|\b(inr|usd|gbp|eur|pay|payment|send|transfer|upi|balance|amount|fee|loan|emi|invest|trade|refund|wallet|account)\b/i,
  highStakes: /[₹$£€¥]|\b(pay|payment|send|transfer|delete|remove|close account|cancel|dose|mg|patient|submit|application|aadhaar|kyc|alarm|loan|invest)\b/i,
  bareNumber: /^[+\-−]?\s?\d{1,3}(,\d{2,3})+(\.\d{1,3})?$|^[+\-−]?\s?\d+\.\d{2}$/,
  currencyToken: /^([₹$£€¥]|inr|usd|gbp|eur|aud|sgd|jpy|rs\.?)$/i,
  hasCurrency: /[₹$£€¥]|\b(inr|usd|gbp|eur|aud|sgd|jpy|cad|rs\.?)\b/i,
  compact: /[₹$£€¥]\s?\d+(\.\d+)?\s?(k|l|lakh|lakhs|cr|crore|m|mn|b|bn)\b/i,
  actionableName: /amount|balance|fee|total|pay|price|transfer|send/i,
  toggleName: /check|toggle|switch|radio|tick|selected|opt/i,
  onValue: /^(true|on|checked|selected|yes|1|active|ticked)$/i,
  consentWords: /\b(add|insurance|protection|protect|subscribe|newsletter|marketing|consent|agree|share|offers|donat\w*|tip|warranty|updates|promotional|cover|plan)\b/i,
  creditWords: /\b(pay later|bnpl|emi|credit|overdraft|loan|instal?ments?)\b/i,
  status: /^(pending|paid|failed|success|successful|declined|refunded|returned|processing|completed|complete|approved|rejected|blocked|cancelled|canceled|on hold|in review|verified|unverified)$/i,
  errorCode: /\b(error|err)\b[\s:#-]*[A-Z]{0,3}\d{2,}|^transaction failed\.?$|^payment failed\.?$|^something went wrong\.?$|\bcode\s*[A-Z]{0,3}\d{2,}\b/i,
  fraud: /\b(fraud|fraudulent|stolen|lost card|suspicious card|flagged)\b/i,
  declineCtx: /declin|failed|couldn.?t|could not|unsuccessful|didn.?t go through/i,
  noFee: /\b(no|zero|0)\s*(transfer\s*)?(fee|fees|charges)\b|\bfree transfer\b|\bfee[- ]free\b/i,
  rateWords: /\b(rate|exchange|markup|mid-market|conversion)\b/i,
  doseTrailing: /\b\d+\.0\s?(mg|mcg|ml|g|units?)\b/i,
  doseLeading: /(^|[^\d])\.\d+\s?(mg|mcg|ml)\b/i,
  doseAbbrev: /\b\d+(\.\d+)?\s?(U|IU|u|iu)\b|µg/,
  asterisk: /\S\s?\*$/,
  celebrate: /🎉|🥳|🎊|congrat|woo+hoo|you.?re on fire|streak|level up|jackpot|nice trade|big win/i,
  riskyMoney: /\b(invest|trade|trading|stock|crypto|bitcoin|loan|borrow|credit|spend|bet|wager|leverage|margin)\b/i,
  longDigits: /(?:\d[ -]?){12,19}/,
  refWords: /\b(ref|reference|utr|transaction id|txn|order id|rrn)\b/i,
  aadhaar: /aadhaar|aadhar/i,
  permissionCtx: /\b(allow|permission|consent|notifications?|track|tracking|marketing|location|contacts|share)\b/i,
  notNow: /^not now$|^maybe later$|^later$/i,
  realNo: /^(no|no thanks|don.?t allow|do not allow|decline|deny|reject|opt out)$/i,
  urgency: /only \d+ left|ends in \d|hurry|last chance|offer expires|expires in \d|\d+ (people|others) (are )?(viewing|looking|bought)|selling fast/i,
  sendButton: /^(pay|send|transfer|confirm)\b/i,
  consequence: /can.?t|cannot|can not|irreversible|undo|cancel (within|until|before)|arriv|instant|reversible|refund|non-refundable|within \d|by \d|today|tomorrow/i,
  warningCtx: /\b(scam|fraud|suspicious|caution|warning|risky|be careful|not in your contacts|first time)\b/i,
  safeWords: /^(cancel|go back|decline|decline request|don.?t pay|stop|call my bank|save for later|not now)$/i,
  clinical: /\b(\d+\s?(mg|mcg|ml)|dose|dosage|administer|medication|infusion|tablet)\b/i,
  patientId: /\b(patient|mrn|dob|date of birth|born|nhs no|uhid|abha|age)\b/i,
  formCtx: /\b(name|email|phone|address|date|password|pin|required|optional)\b/i
};

function luminance(c) {
  function ch(v) { return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
  return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
}
function contrast(a, b) {
  var l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function blend(top, bottom) {
  var a = top.a;
  return { r: top.r * a + bottom.r * (1 - a), g: top.g * a + bottom.g * (1 - a), b: top.b * a + bottom.b * (1 - a), a: 1 };
}
function hex(c) {
  function h(v) { var s = Math.round(v * 255).toString(16); return s.length < 2 ? "0" + s : s; }
  return "#" + h(c.r) + h(c.g) + h(c.b);
}

function collectText(node) {
  var out = [];
  (function walk(n) {
    if (n.visible === false) return;
    if (n.type === "TEXT" && n.text) out.push(n.text);
    var k = n.children || [];
    for (var i = 0; i < k.length; i++) walk(k[i]);
  })(node);
  return out;
}
function textsDirect(node) {
  var k = node.children || [], out = [];
  for (var i = 0; i < k.length; i++) if (k[i].type === "TEXT" && k[i].visible !== false && k[i].text) out.push(k[i]);
  return out;
}
function hasVector(node) {
  var found = false;
  (function walk(n) {
    if (found) return;
    if (/VECTOR|BOOLEAN_OPERATION|STAR|POLYGON|ELLIPSE|LINE/.test(n.type) || /icon|glyph|svg/i.test(n.name || "")) { found = true; return; }
    var k = n.children || [];
    for (var i = 0; i < k.length; i++) walk(k[i]);
  })(node);
  return found;
}
function clean(t) { return String(t || "").replace(/\s+/g, " ").trim(); }

function isButtonish(node) {
  if (node.type === "TEXT") return false;
  if (/button|btn|cta|\baction\b|primary|secondary/i.test(node.name || "")) return true;
  var texts = collectText(node);
  if (texts.length !== 1) return false;
  var t = clean(texts[0]);
  if (t.length === 0 || t.length > 34) return false;
  var hasFillOrStroke = !!node.fill || !!node.stroke;
  return hasFillOrStroke && node.h >= 28 && node.h <= 96 && node.w <= 640 && (node.radius || 0) > 0;
}

function propsOn(node) {
  var p = node.props || {};
  for (var k in p) {
    if (!Object.prototype.hasOwnProperty.call(p, k)) continue;
    var v = String(p[k]);
    if (/check|state|selected|value|on|toggle|tick|active/i.test(k) && RX.onValue.test(v)) return true;
    if (/^(state|status|type)$/i.test(k) && /^(checked|selected|on|active)$/i.test(v)) return true;
  }
  var nm = node.name || "";
  if (/unchecked|unselected|\boff\b|=false|empty/i.test(nm)) return false;
  return /(^|[^a-z])(checked|selected|ticked|=true|\bon\b|=on)/i.test(nm);
}

function audit(roots, opts) {
  opts = opts || {};
  var findings = [];
  var seen = {};
  var perRule = {};
  var LIMIT = { "core-12-text": 6, "core-12-contrast": 10, "core-12-target": 8 };

  function add(ruleId, severity, node, problem, fix, evidence, bucket) {
    var key = ruleId + "|" + node.id + "|" + (bucket || "");
    if (seen[key]) return;
    var b = bucket || ruleId;
    perRule[b] = (perRule[b] || 0) + 1;
    if (LIMIT[b] && perRule[b] > LIMIT[b]) return;
    seen[key] = true;
    findings.push({ key: key, ruleId: ruleId, severity: severity, nodeId: node.id, layer: node.name || node.type, problem: problem, fix: fix, evidence: evidence || "" });
  }

  for (var r = 0; r < roots.length; r++) auditScreen(roots[r]);

  function auditScreen(screen) {
    var all = collectText(screen).map(clean);
    var joined = all.join(" \n ");
    var money = RX.moneyContext.test(joined);
    var stakes = RX.highStakes.test(joined);
    var currencies = {};
    all.forEach(function (t) { var m = t.match(/[₹$£€¥]|\b(INR|USD|GBP|EUR|AUD|SGD|JPY)\b/g); if (m) m.forEach(function (c) { currencies[c.toUpperCase().replace("₹", "INR").replace("$", "USD").replace("£", "GBP").replace("€", "EUR")] = 1; }); });
    var multiCurrency = Object.keys(currencies).length >= 2;
    var buttons = [];

    walk(screen, [], screen.fill ? blend(screen.fill, { r: 1, g: 1, b: 1, a: 1 }) : null);

    // ---- screen-level checks
    var buttonTexts = buttons.map(function (b) { return clean(collectText(b).join(" ")); });
    if (RX.permissionCtx.test(joined) && buttonTexts.some(function (t) { return RX.notNow.test(t); }) && !buttonTexts.some(function (t) { return RX.realNo.test(t); })) {
      var nn = buttons[buttonTexts.findIndex(function (t) { return RX.notNow.test(t); })];
      add("flows-8", "low", nn, "\"Not now\" is the only way to say no.", "Offer a real, equal-weight \"No\" or \"Don't allow\" that ends the request.", clean(collectText(nn).join(" ")));
    }
    var sendIdx = buttonTexts.findIndex(function (t) { return RX.sendButton.test(t); });
    if (sendIdx >= 0 && money && !all.some(function (t) { return RX.consequence.test(t); })) {
      add("flows-3", "medium", buttons[sendIdx], "The confirmation doesn't say when the money arrives or whether it can be cancelled.", "Add the consequence near the button: \"Arrives instantly. You can't cancel this.\"", buttonTexts[sendIdx]);
    }
    if (RX.warningCtx.test(joined)) {
      // safe action that is only a text link
      var walkSafe = function (n, inButton) {
        if (n.visible === false) return;
        var btn = inButton || isButtonish(n);
        if (n.type === "TEXT" && RX.safeWords.test(clean(n.text)) && !btn) {
          add("flows-5", "medium", n, "The safe action \"" + clean(n.text) + "\" is a plain text link next to a warning.", "Make the safe action a real, prominent button, at least as strong as the risky one.", clean(n.text));
        }
        (n.children || []).forEach(function (c) { walkSafe(c, btn); });
      };
      walkSafe(screen, false);
    }
    if (RX.clinical.test(joined) && !RX.patientId.test(joined)) {
      add("dom-3", "medium", screen, "A medication or dose appears but the patient isn't identified on this screen.", "Show a persistent patient banner: full name, date of birth and ID.", "");
    }
    if (multiCurrency && RX.noFee.test(joined) && !RX.rateWords.test(joined)) {
      add("flows-1", "medium", screen, "\"No fee\" appears on a currency conversion without the exchange rate.", "Show the rate and say whether it is mid-market or includes a markup; fees plus rate are the real cost.", "");
    }

    function walk(node, parents, bg) {
      if (node.visible === false) return;
      var myBg = bg;
      if (node.type !== "TEXT" && node.fill && node.fill.a > 0) myBg = blend(node.fill, bg || { r: 1, g: 1, b: 1, a: 1 });
      var parent = parents[parents.length - 1];

      if (isButtonish(node)) {
        buttons.push(node);
        var bt = clean(collectText(node).join(" "));
        if (RX.vagueButton.test(bt) && stakes) {
          add("core-4", money ? "high" : "medium", node, "The button says \"" + bt + "\" on a high-stakes screen.", "Name the action and its object: \"Pay ₹24,000 to Ramesh Kumar\", \"Delete 3 records\".", bt);
        } else if (RX.bareAction.test(bt) && money) {
          add("flows-3", "medium", node, "\"" + bt + "\" doesn't say how much or to whom.", "Restate the amount and payee on the button: \"Pay ₹24,000.00 to Ramesh\".", bt);
        }
        if (/\b(pay|buy|subscribe|send)\b/i.test(bt) && /\b(later|emi|bnpl|credit)\b/i.test(bt) && /primary/i.test(node.name || "")) {
          add("flows-9", "medium", node, "Credit is styled as the primary way to pay.", "Offer pay-later as an option, not the default; show APR and total repayable on the offer.", bt);
        }
        var minSide = Math.min(node.w, node.h);
        if (minSide < 24) add("core-12", "high", node, "Tap target is " + Math.round(node.w) + "×" + Math.round(node.h) + " px, below the 24 px minimum.", "Make it at least 44×44 pt (24 px is the WCAG 2.2 floor).", "", "core-12-target");
        else if (minSide < 44) add("core-12", "low", node, "Tap target is " + Math.round(node.w) + "×" + Math.round(node.h) + " px, under the recommended 44 pt.", "Increase to 44×44 pt for stressed or older users.", "", "core-12-target");
      }

      // toggles, checkboxes, radios
      if (node.type !== "TEXT" && (RX.toggleName.test(node.name || "") || Object.keys(node.props || {}).some(function (k) { return /check|toggle|select|switch|radio/i.test(k); }))) {
        if (propsOn(node) && parent) {
          var ctx = clean(collectText(parent).join(" "));
          if (RX.creditWords.test(ctx)) add("flows-9", "high", node, "A credit or pay-later option is pre-selected.", "Leave credit unselected; the person chooses it, with APR and total repayable shown.", ctx.slice(0, 80));
          else if (RX.consentWords.test(ctx)) add("flows-8", "high", node, "A consent or add-on is pre-ticked.", "Untick it by default. Pre-ticked add-ons are basket sneaking (CCPA 2023, EU, UK).", ctx.slice(0, 80));
        }
      }

      if (node.type === "TEXT" && node.text) {
        var t = clean(node.text);
        if (RX.areYouSure.test(t)) add("core-4", "high", node, "\"" + t.slice(0, 40) + "\" asks for confirmation without naming the object or consequence.", "Restate it: \"Send ₹2,400 to J. Smith, account ending 4421. You can't cancel this.\"", t);
        if (RX.bareNumber.test(t) && !RX.hasCurrency.test(t)) {
          var sib = parent ? textsDirect(parent).filter(function (s) { return s !== node; }).map(function (s) { return clean(s.text); }) : [];
          var sibCur = sib.some(function (s) { return RX.currencyToken.test(s) || /^[₹$£€¥]/.test(s) || /[₹$£€¥]$/.test(s); });
          if (!sibCur && money) add("data-2", "medium", node, "\"" + t + "\" has no currency.", "Show the currency with every amount (₹24,000.00 or INR 24,000.00).", t);
        }
        if (RX.compact.test(t) && (RX.actionableName.test(node.name || "") || (parent && (isButtonish(parent) || RX.actionableName.test(parent.name || ""))))) {
          add("data-4", "high", node, "Compact notation (\"" + t + "\") on an amount the person acts on.", "Show the full amount: ₹2,40,000.00, not ₹2.4L.", t);
        }
        if (RX.status.test(t) && parent && parent.fill && !hasVector(parent)) {
          add("data-chip", "low", node, "Status \"" + t + "\" relies on colour and a word, with no icon.", "Pair every status with an icon, a plain word and colour.", t);
        }
        if (RX.errorCode.test(t)) add("core-10", "medium", node, "\"" + t.slice(0, 48) + "\" doesn't say what happened or what to do.", "Say what happened to the money and the next step: \"₹2,500 was not debited. Try again or pay another way.\"", t);
        if (RX.fraud.test(t) && RX.declineCtx.test(joined)) add("flows-6", "high", node, "Decline copy mentions fraud or a lost or stolen card.", "Show a generic decline with a next step; never reveal fraud flags to the payer.", t);
        if (RX.doseTrailing.test(t)) add("dom-5", "high", node, "Trailing zero in \"" + t + "\" (1.0 mg can be misread as 10 mg).", "Drop trailing zeros: 1 mg.", t);
        if (RX.doseLeading.test(t)) add("dom-5", "high", node, "Missing leading zero in \"" + t + "\" (.5 mg can be misread as 5 mg).", "Always use a leading zero: 0.5 mg.", t);
        if (RX.doseAbbrev.test(t) && RX.clinical.test(joined)) add("dom-5", "high", node, "Error-prone abbreviation in \"" + t + "\" (U, IU or µg).", "Spell out units: \"units\", \"international units\", \"mcg\".", t);
        if (RX.asterisk.test(t) && t.length < 40 && RX.formCtx.test(joined)) add("dom-9", "low", node, "Required field marked with an asterisk.", "Mark the optional fields with \"(optional)\" instead.", t);
        if (RX.celebrate.test(t) && RX.riskyMoney.test(joined)) add("core-11", "medium", node, "Celebration around investing, borrowing or spending.", "Keep it calm. Celebrate only the person's own wins, such as a savings goal reached.", t);
        if (RX.urgency.test(t)) add("flows-dark", "medium", node, "False-urgency or social-proof pressure: \"" + t.slice(0, 40) + "\".", "Remove it unless it is true and verifiable; false urgency is a banned dark pattern (CCPA 2023).", t);
        var digits = t.match(RX.longDigits);
        if (digits && !/[•*x×X]/.test(t) && !RX.refWords.test(t) && !(parent && RX.refWords.test(clean(collectText(parent).join(" "))))) {
          var isAadhaar = RX.aadhaar.test(joined) && digits[0].replace(/\D/g, "").length === 12;
          add(isAadhaar ? "dom-11" : "data-14", "high", node, (isAadhaar ? "Aadhaar number" : "A long identifier") + " is shown unmasked.", "Mask by default (•••• 4421) and reveal only on demand, after re-authentication.", digits[0]);
        }
        if (node.fontSize && node.fontSize < 12) add("core-12", "low", node, "Text is " + node.fontSize + " px.", "Use at least 12 px (16 px for body text); amounts and key facts larger.", t.slice(0, 30), "core-12-text");
        if (node.fill && myBg && node.fill.a > 0.1) {
          var fg = blend({ r: node.fill.r, g: node.fill.g, b: node.fill.b, a: node.fill.a * (node.opacity == null ? 1 : node.opacity) }, myBg);
          var ratio = contrast(fg, myBg);
          var large = (node.fontSize || 0) >= 24 || ((node.fontSize || 0) >= 18.66 && (node.fontWeight || 400) >= 700);
          var need = large ? 3 : 4.5;
          if (ratio < need) add("core-12", ratio < 3 ? "high" : "medium", node, "Contrast " + ratio.toFixed(2) + ":1 (" + hex(fg) + " on " + hex(myBg) + "), needs " + need + ":1.", "Darken the text or lighten the background to reach " + need + ":1.", t.slice(0, 30), "core-12-contrast");
        }
      }

      var kids = node.children || [];
      for (var i = 0; i < kids.length; i++) walk(kids[i], parents.concat([node]), myBg);
    }
  }

  findings.sort(function (a, b) { return SEV_ORDER[a.severity] - SEV_ORDER[b.severity]; });
  return findings;
}

if (typeof module !== "undefined") module.exports = { audit: audit, contrast: contrast };
