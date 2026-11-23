# criticalUX for Figma

Check a screen against the criticalUX rules without leaving Figma. Select a frame, run the audit, and see what could cost someone money, health, safety or rights, with the rule and source behind every finding.

## What it does

| Tab | What you get |
|---|---|
| **Audit** | A verdict for the selection (Safe to ship, Needs fixes, High risk), findings sorted by severity, the rule behind each one and a button that jumps to the layer. **Add markers to canvas** drops numbered markers and a notes panel next to your frame, and can also add Dev Mode annotations. |
| **Deep review** | Optional. Sends the first selected frame to Claude with every criticalUX rule, for what layer checks can't see: unclear copy, missing states, hidden consequences, unsafe defaults. Uses your own Anthropic API key. |
| **Patterns** | Ten safe components built with auto layout: payment confirmation, fee and FX quote, collect-request warning, payment failed, unknown result, consent off by default, status chips, patient banner and dose, one question per page, alarm tiers. |
| **Rules** | All 57 rules from the four skills, searchable and filterable, each linked to its skill. |

### What the built-in audit checks

Runs offline, instantly, on the layers you select:

- "Are you sure?" and vague buttons ("Yes", "OK", "Confirm") on high-stakes screens; "Pay" or "Send" without amount or payee
- Confirmations that don't say when money arrives or whether it can be cancelled
- Amounts without a currency; compact notation (₹2.4L) on amounts people act on
- Pre-ticked consent, add-ons and pay-later options (basket sneaking)
- "Not now" as the only way to decline a permission
- Safe actions shown as text links next to a warning
- Error codes instead of plain failure copy; fraud wording in declines
- "No fee" on a currency conversion without the exchange rate
- False urgency ("Only 2 left", "Offer ends in…")
- Unmasked card, account and Aadhaar numbers
- Celebrations around investing, borrowing or spending
- Status shown without an icon
- Dose notation: trailing zeros (1.0 mg), missing leading zeros (.5 mg), U or IU; medication shown without the patient identified
- Asterisks for required fields
- Text contrast below WCAG 2.2 AA, text under 12 px, tap targets under 24 px (and under the recommended 44 pt)

Checks are heuristic. They read layer names, text, fills, sizes and component properties, so they work best when buttons are named like buttons and checkboxes are components with a Checked or State property. Deep review covers the rest.

## Install (Figma desktop app)

1. Download or clone this repository.
2. In Figma desktop, open any design file.
3. **Menu → Plugins → Development → Import plugin from manifest…**
4. Choose `figma-plugin/manifest.json`.
5. Run it from **Plugins → Development → criticalUX**.

## Deep review with Claude

1. Get an API key at [console.anthropic.com](https://console.anthropic.com).
2. Open the plugin's **Settings** tab, paste the key, pick your market (India, UK, EU, US and more) and save.
3. Select a frame and press **Deep review**.

The key is stored only on your device, in Figma's plugin storage. Deep review sends a screenshot of the selected frame and its layer text to Anthropic. Built-in checks never leave Figma.

## For contributors

```
node figma-plugin/build.js           # builds code.js and ui.html from src/
node --test figma-plugin/test/*.test.js
```

- `src/rules.js`: the rule library. Rule ids are stable; findings and Claude reviews refer to them.
- `src/engine.js`: the built-in checks, pure JavaScript over a snapshot of the layers.
- `src/figma-main.js`: selection, jump to layer, markers and annotations, the ten patterns.
- `src/ui.html`: the panel.
- `test/`: engine tests on fixture screens, and a smoke test that runs the built plugin against a strict mock of the Figma API.

Edit `src/`, then run the build. Figma loads the generated `code.js` and `ui.html`.

## Publishing to Figma Community

When you publish from **Plugins → Development → criticalUX → Publish**, Figma gives the plugin a permanent id. Put that id in `manifest.json` in place of `criticalux-local`.

criticalUX is design guidance, not legal, medical or engineering certification advice.
