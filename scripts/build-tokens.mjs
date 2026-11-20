// Builds Figma-ready design tokens from tokens/finance-semantic.json and checks
// that tokens/criticalux.css still matches the JSON.
//
// Output: tokens/figma/light.tokens.json and tokens/figma/dark.tokens.json in the
// W3C Design Tokens (DTCG) format, one file per mode. Import them into Figma with
// Tokens Studio (or any DTCG-compatible variables importer) as a Light and a Dark mode.
//
// Usage:
//   node scripts/build-tokens.mjs           write the Figma files, then check the CSS
//   node scripts/build-tokens.mjs --check   only check; fail if anything is out of date
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
const src = JSON.parse(readFileSync(new URL("tokens/finance-semantic.json", root)));
const css = readFileSync(new URL("tokens/criticalux.css", root), "utf8");
const checkOnly = process.argv.includes("--check");
let problems = 0;
const fail = (msg) => { problems++; console.log(`FAIL ${msg}`); };

// ---- DTCG export -----------------------------------------------------------

const leaf = (type, value) => ({ $type: type, $value: value });
const mapLeaves = (obj, type) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) =>
    [k, typeof v === "object" ? mapLeaves(v, type) : leaf(type, v)]));

const shared = {
  font: {
    family: mapLeaves(src.font.family, "fontFamily"),
    size: mapLeaves(src.font.size, "dimension"),
  },
  space: mapLeaves(src.space, "dimension"),
  radius: mapLeaves(src.radius, "dimension"),
  motion: {
    duration: mapLeaves({ fast: src.motion.fast, base: src.motion.base, slow: src.motion.slow }, "duration"),
    ease: leaf("cubicBezier", src.motion.ease.match(/[\d.]+/g).map(Number)),
  },
};

const resolve = (theme, path) => path.split(".").reduce((o, k) => o?.[k], src.color[theme])
  ?? src.color[theme].status?.[path];

const files = {};
for (const theme of Object.keys(src.color)) {
  const c = src.color[theme];
  const market = Object.fromEntries(
    Object.entries(src.market).filter(([k]) => !k.startsWith("$")).map(([name, m]) => [name, {
      up: leaf("color", resolve(theme, m.up)),
      down: leaf("color", resolve(theme, m.down)),
    }]));
  files[theme] = {
    $description: `criticalUX tokens, ${theme} mode. Generated from tokens/finance-semantic.json by scripts/build-tokens.mjs; do not edit by hand.`,
    color: { ...mapLeaves(c, "color"), market },
    ...shared,
  };
}

const figmaDir = new URL("tokens/figma/", root);
for (const [theme, data] of Object.entries(files)) {
  const target = new URL(`${theme}.tokens.json`, figmaDir);
  const text = JSON.stringify(data, null, 2) + "\n";
  if (checkOnly) {
    let current = "";
    try { current = readFileSync(target, "utf8"); } catch {}
    if (current.replace(/\r\n/g, "\n") !== text) fail(`tokens/figma/${theme}.tokens.json is out of date; run node scripts/build-tokens.mjs`);
  } else {
    mkdirSync(figmaDir, { recursive: true });
    writeFileSync(target, text);
    console.log(`wrote tokens/figma/${theme}.tokens.json`);
  }
}

// ---- CSS parity --------------------------------------------------------------

const cssToJson = {
  "--cx-page": "surface.page", "--cx-card": "surface.card", "--cx-calm": "surface.calm",
  "--cx-text": "text.primary", "--cx-text-muted": "text.muted", "--cx-on-accent": "text.on-accent",
  "--cx-border": "border.default", "--cx-border-subtle": "border.subtle", "--cx-accent": "accent",
  "--cx-positive": "value.positive", "--cx-negative": "value.negative",
  "--cx-negative-accessible": "value.negative-accessible",
  "--cx-pending": "status.pending", "--cx-warning": "status.warning", "--cx-info": "status.info",
};

const vars = (chunk) => Object.fromEntries([...chunk.matchAll(/(--cx-[\w-]+):\s*(#[0-9A-Fa-f]{6})\s*;/g)].map((m) => [m[1], m[2]]));
const iMedia = css.indexOf("@media (prefers-color-scheme: dark)");
const iDark = css.indexOf('[data-theme="dark"] {');
const iEnd = css.indexOf("[data-market=", iDark);
if (iMedia < 0 || iDark < 0 || iEnd < 0) fail("could not find the light, system-dark and dark blocks in criticalux.css");
const blocks = {
  "light (:root)": ["light", vars(css.slice(0, iMedia))],
  "dark (prefers-color-scheme)": ["dark", vars(css.slice(iMedia, iDark))],
  'dark ([data-theme="dark"])': ["dark", vars(css.slice(iDark, iEnd))],
};
for (const [label, [theme, found]] of Object.entries(blocks)) {
  for (const [cssVar, path] of Object.entries(cssToJson)) {
    const want = resolve(theme, path)?.toUpperCase();
    const got = found[cssVar]?.toUpperCase();
    if (!got) fail(`${label}: ${cssVar} missing (JSON ${path} = ${want})`);
    else if (got !== want) fail(`${label}: ${cssVar} is ${got}, JSON ${path} is ${want}`);
  }
}

console.log(problems ? `${problems} problem(s)` : "Figma tokens up to date; CSS matches JSON.");
process.exit(problems ? 1 : 0);
