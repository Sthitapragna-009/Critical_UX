// criticalUX rule library for the Figma plugin.
// Every rule is taken from the four skills in /skills. Source tags:
// REG law or standard · STD platform or industry guideline · RES published research
// PRAC documented practice · INF criticalUX synthesis.
// Keep ids stable: audit findings and Claude reviews refer to them.

var CUX_REPO = "https://github.com/Sthitapragna-009/Critical_UX/blob/main/skills/";

var CUX_SKILLS = {
  core: { name: "critical-core", label: "Core", url: CUX_REPO + "critical-core/SKILL.md" },
  data: { name: "money-data", label: "Money data", url: CUX_REPO + "money-data/SKILL.md" },
  flows: { name: "money-flows", label: "Money flows", url: CUX_REPO + "money-flows/SKILL.md" },
  domains: { name: "critical-domains", label: "Domains", url: CUX_REPO + "critical-domains/SKILL.md" }
};

var CUX_RULES = [
  // ---------------- critical-core: the twelve core rules
  { id: "core-1", skill: "core", src: "REG", title: "Design the hazard out, then guard it, then inform", body: "A confirmation dialog is the second-weakest control; help text is the weakest (FDA, ISO 14971)." },
  { id: "core-2", skill: "core", src: "REG", title: "Severity decides", body: "Rate critical tasks by the harm they can cause, not by how likely the error seems (FDA)." },
  { id: "core-3", skill: "core", src: "REG", title: "Easy to do right, hard to do wrong, easy to recover", body: "NIST SP 800-63-4." },
  { id: "core-4", skill: "core", src: "INF", title: "Confirm the specific object and consequence", body: "Never \"Are you sure?\". Restate what will happen, to what, and whether it can be undone." },
  { id: "core-5", skill: "core", src: "RES", title: "Friction only where risk is, with the safe action prominent", body: "Risk-targeted friction with safe buttons cut scam payments by 18 points; text warnings cut them by 4." },
  { id: "core-6", skill: "core", src: "RES", title: "Warnings that repeat must change form", body: "People stop seeing a warning that always looks the same." },
  { id: "core-7", skill: "core", src: "RES", title: "Interruptions are scarce", body: "Tier alerts by severity, budget them, delete the trivial ones." },
  { id: "core-8", skill: "core", src: "STD", title: "Quiet when normal, loud when not", body: "Colour and motion mean attention. A calm baseline makes the abnormal visible." },
  { id: "core-9", skill: "core", src: "REG", title: "Mode, environment and who is in control are always visible", body: "Test vs live, manual vs automated, which account or patient." },
  { id: "core-10", skill: "core", src: "RES", title: "Fail visibly", body: "Never degrade silently; show the last known value and its age. Say what happened and what to do next." },
  { id: "core-11", skill: "core", src: "REG", title: "Calm by default; celebrate only the person's own wins", body: "Never celebrate risk-taking, spending or borrowing." },
  { id: "core-12", skill: "core", src: "REG", title: "Design for the most constrained user and channel", body: "Low literacy, low vision, old phones, no data, stress. WCAG 2.2 AA is the floor: 4.5:1 text contrast, 24px minimum targets (44pt recommended)." },

  // ---------------- money-data
  { id: "data-1", skill: "data", src: "PRAC", title: "Format with the platform, never by hand", body: "Intl.NumberFormat, NumberFormatter or DecimalFormat handle symbols, separators and minor units." },
  { id: "data-2", skill: "data", src: "INF", title: "Every amount carries its currency", body: "No bare numbers. Use the ISO code when the symbol is ambiguous." },
  { id: "data-3", skill: "data", src: "PRAC", title: "Tabular figures for changing or columnar numbers", body: "font-variant-numeric: tabular-nums. Proportional figures jitter." },
  { id: "data-4", skill: "data", src: "INF", title: "Compact notation only on axes and summary tiles", body: "Never on a balance, payment amount, fee or anything the person will act on." },
  { id: "data-5", skill: "data", src: "INF", title: "Parts sum to the total", body: "Or the screen says rounding applies." },
  { id: "data-6", skill: "data", src: "RES", title: "Gain and loss are semantic, not hard-coded red and green", body: "Red means up in some markets. Always pair colour with a sign and a glyph." },
  { id: "data-7", skill: "data", src: "REG", title: "Chart marks reach 3:1; nothing depends on colour alone", body: "WCAG 1.4.11 and 1.4.1." },
  { id: "data-8", skill: "data", src: "RES", title: "Bars start at zero; lines may not", body: "Truncated bars exaggerate differences." },
  { id: "data-9", skill: "data", src: "RES", title: "Uncertain futures are bands, not single lines", body: "Projections use fan or band charts." },
  { id: "data-10", skill: "data", src: "PRAC", title: "Every chart has a table view and a headline", body: "Scrubbing has keyboard and screen-reader equivalents." },
  { id: "data-11", skill: "data", src: "PRAC", title: "State the baseline of every delta", body: "\"+2.4% today (since yesterday's close)\"." },
  { id: "data-12", skill: "data", src: "PRAC", title: "Progress is honest", body: "3–5 plain stages with timestamps. Sent is not arrived. ETAs are estimates." },
  { id: "data-13", skill: "data", src: "RES", title: "Show that a tap registered immediately", body: "An instant processing state with the button disabled beats \"don't press twice\"." },
  { id: "data-14", skill: "data", src: "PRAC", title: "Mask identifiers by default", body: "•••• 4421; reveal full numbers on demand with re-authentication." },
  { id: "data-15", skill: "data", src: "INF", title: "Pending is labelled and explained", body: "Never silently added to or removed from the available balance." },
  { id: "data-16", skill: "data", src: "REG", title: "No reward mechanics on investing, credit or spending", body: "No confetti on trades, scratch-card reveals or popularity rankings." },
  { id: "data-chip", skill: "data", src: "PRAC", title: "Status = icon + word + colour", body: "Never colour alone. Plain verbs: Pending, Paid, Failed, Refunded, Returned." },

  // ---------------- money-flows
  { id: "flows-1", skill: "flows", src: "REG", title: "The total is the most prominent number", body: "Fees are named and itemised, FX markup stated, and \"no fee\" never stands alone." },
  { id: "flows-2", skill: "flows", src: "REG", title: "Verify the payee when it is added", body: "Each verification result has its own colour, icon, copy and action. On no match, the primary button is \"Go back\"." },
  { id: "flows-3", skill: "flows", src: "INF", title: "Confirmations restate the object and the consequence", body: "\"Send £2,400 to J. Smith, account ending 4421. You can't cancel this.\"" },
  { id: "flows-4", skill: "flows", src: "RES", title: "Friction goes where risk is", body: "Do not pause every payment; target the risky ones." },
  { id: "flows-5", skill: "flows", src: "RES", title: "Safe actions are as prominent as the risky one", body: "\"Cancel\", \"Call my bank\", \"Save for later\" are real buttons, not links." },
  { id: "flows-6", skill: "flows", src: "PRAC", title: "Never tell a payer their card was flagged as fraud, lost or stolen", body: "Show a generic decline with a next step." },
  { id: "flows-7", skill: "flows", src: "INF", title: "Unknown outcome is a state", body: "\"Checking whether your payment went through. Don't pay again yet.\"" },
  { id: "flows-8", skill: "flows", src: "REG", title: "Consent is separate, specific and off by default", body: "No pre-ticked boxes, no bundled \"I agree\", no \"Not now\" as the only way to say no." },
  { id: "flows-9", skill: "flows", src: "REG", title: "Credit never looks like the default way to pay", body: "BNPL and overdrafts are offered, not pre-selected; APR and total repayable on the offer screen." },
  { id: "flows-10", skill: "flows", src: "REG", title: "Cancelling is as easy as signing up", body: "In the same channel." },
  { id: "flows-11", skill: "flows", src: "PRAC", title: "Protective actions instant; destructive ones deliberate", body: "Freeze card is one tap and reversible; close account is deliberate." },
  { id: "flows-12", skill: "flows", src: "REG", title: "Name who you are and who holds the money", body: "Embedded flows never imply the fintech is the bank." },
  { id: "flows-13", skill: "flows", src: "INF", title: "Agents act within a visible, revocable mandate", body: "Every receipt names the agent." },
  { id: "flows-14", skill: "flows", src: "PRAC", title: "Design for the weakest channel you serve", body: "Read back before money moves on USSD, voice and kiosks." },
  { id: "flows-dark", skill: "flows", src: "REG", title: "No dark patterns", body: "False urgency, basket sneaking, drip pricing and confirm-shaming are banned in the EU, US, UK and India (CCPA Dark Patterns Guidelines, 2023)." },

  // ---------------- critical-domains
  { id: "dom-1", skill: "domains", src: "REG", title: "Design the hazard out first", body: "Guards second; labels and training last (FDA, ISO 14971)." },
  { id: "dom-2", skill: "domains", src: "REG", title: "Severity, not probability", body: "Decides whether a use-related risk must be eliminated (FDA)." },
  { id: "dom-3", skill: "domains", src: "REG", title: "The subject is always identified", body: "Patient, citizen, vehicle or account on every screen that acts on them." },
  { id: "dom-4", skill: "domains", src: "REG", title: "Modes and environments are unmistakable", body: "Including test vs production (NIST)." },
  { id: "dom-5", skill: "domains", src: "REG", title: "Quantities follow dose notation", body: "No trailing zeros, always a leading zero, units spelled out (not U or IU), never truncated (ISMP)." },
  { id: "dom-6", skill: "domains", src: "RES", title: "Interrupt only for severe, specific, contextual alerts", body: "Remove the rest (AHRQ)." },
  { id: "dom-7", skill: "domains", src: "STD", title: "Quiet when normal", body: "Grey or dark baseline; colour only for abnormal states (ISA-101, Airbus)." },
  { id: "dom-8", skill: "domains", src: "STD", title: "Alarm budget", body: "About 1–2 new alarms per operator per 10 minutes; more than 10 is a flood." },
  { id: "dom-9", skill: "domains", src: "STD", title: "One question per page for anything hard", body: "\"Continue\", a back link, and \"(optional)\" instead of asterisks (GOV.UK)." },
  { id: "dom-10", skill: "domains", src: "RES", title: "Risks as icon arrays and plain words", body: "Same denominator; not percentages alone." },
  { id: "dom-11", skill: "domains", src: "REG", title: "Share the minimum identity data", body: "Say who asks for what and why; keep a disclosure log (EU wallet). Mask ID numbers." },
  { id: "dom-12", skill: "domains", src: "RES", title: "Fail visibly; show what automation is handling", body: "Bainbridge, ironies of automation." },
  { id: "dom-13", skill: "domains", src: "REG", title: "Validate with real users on critical tasks", body: "At least 15 per user group for medical devices." }
];

var CUX_RULES_BY_ID = {};
for (var _i = 0; _i < CUX_RULES.length; _i++) CUX_RULES_BY_ID[CUX_RULES[_i].id] = CUX_RULES[_i];

if (typeof module !== "undefined") module.exports = { CUX_RULES: CUX_RULES, CUX_RULES_BY_ID: CUX_RULES_BY_ID, CUX_SKILLS: CUX_SKILLS };
