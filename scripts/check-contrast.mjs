// Checks WCAG contrast for tokens/finance-semantic.json.
// Text-level colours need 4.5:1 on every surface; default borders need 3:1.
// Usage: node scripts/check-contrast.mjs
import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("../tokens/finance-semantic.json", import.meta.url)));

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failures = 0;
for (const [theme, c] of Object.entries(tokens.color)) {
  const surfaces = Object.entries(c.surface);
  const textish = {
    "text.primary": c.text.primary,
    "text.muted": c.text.muted,
    accent: c.accent,
    ...Object.fromEntries(Object.entries(c.value).map(([k, v]) => [`value.${k}`, v])),
    ...Object.fromEntries(Object.entries(c.status).map(([k, v]) => [`status.${k}`, v])),
  };
  for (const [name, fg] of Object.entries(textish)) {
    for (const [sName, bg] of surfaces) {
      const r = ratio(fg, bg);
      if (r < 4.5) { failures++; console.log(`FAIL ${theme} ${name} on ${sName}: ${r.toFixed(2)}`); }
    }
  }
  for (const [sName, bg] of surfaces) {
    const r = ratio(c.border.default, bg);
    if (r < 3) { failures++; console.log(`FAIL ${theme} border.default on ${sName}: ${r.toFixed(2)}`); }
  }
  const onAccent = ratio(c.text["on-accent"], c.accent);
  if (onAccent < 4.5) { failures++; console.log(`FAIL ${theme} on-accent: ${onAccent.toFixed(2)}`); }
}
console.log(failures ? `${failures} failure(s)` : "All token pairs pass.");
process.exit(failures ? 1 : 0);
