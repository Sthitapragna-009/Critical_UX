# Colour, gain and loss

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Semantic tokens, not colours

Define meaning, then resolve it to colour per locale, theme and user setting. The repo's `/tokens/finance-semantic.json` ships original values for these roles:

| Token | Meaning |
|---|---|
| `value.positive` | gain, credit received, goal progress |
| `value.negative` | loss, fee charged, shortfall |
| `value.negative.accessible` | colour-blind-safe alternative for loss (orange family) |
| `value.neutral` | ordinary spending, unchanged values |
| `status.pending` | in flight, awaiting settlement |
| `status.success` / `status.error` / `status.warning` / `status.info` | UI status |
| `surface.calm` | low-saturation surfaces for fraud, debt and dispute flows |

## 2. Red-up markets

Green-up/red-down is not universal. In mainland China, Japan and Taiwan market conventions, **red means rising and green means falling** [RES] ([Benzinga](https://www.benzinga.com/general/education/21/10/23258001/did-you-know-you-dont-want-to-be-in-the-green-if-youre-trading-in-china-japan-or-taiwan)). South Korea is widely reported to follow red-up too, but was not verified for this repo.

Rules [INF]:

- Resolve `value.positive`/`value.negative` from the **market** being viewed, defaulting to the user's locale, and let users override in settings.
- Never let the flip break meaning elsewhere: error states stay in the error colour whatever the market convention.
- Always pair the colour with a sign (`+`/`−`) and a glyph (▲/▼ or ↑/↓). Then the screen still reads correctly in grayscale, for colour-blind users and in either convention.

## 3. Colour-blind safety

- About 1 in 12 men and 1 in 200 women have a colour-vision deficiency, most often red–green (common clinical figure; [INF]).
- Precedent: the Goldman Sachs design system pairs its positive green and negative red with a dedicated orange **"accessible negative value"** token and a colour-blind-safe data-viz sequence [PRAC] ([GS Design System](https://design.gs.com/foundation/color-system)). Cite it as precedent; do not copy its values (no reuse licence is stated).
- IBM Carbon offers a purple–teal diverging palette "for data without temperature associations, such as performance, sales, or rates of change", tested with JND reports [PRAC] ([Carbon palettes](https://carbondesignsystem.com/data-visualization/color-palettes/)).
- Blue/orange is a common alternative pair [INF].
- Test every chart and status set with a simulator (deuteranopia, protanopia, tritanopia) before shipping.

## 4. Contrast

- Text on any surface: 4.5:1 (3:1 for 24 px+ or 18.66 px bold) — WCAG 1.4.3 [REG].
- Chart marks, icons, focus rings and input borders: **3:1** against adjacent colours — WCAG 1.4.11 [REG].
- Carbon's categorical colours meet 3:1 against the background but not against each other, so adjacent segments need separators (a 1 px background-coloured gap between donut slices, a 1 px top border on bars) [PRAC] ([Carbon on Medium](https://medium.com/carbondesign/color-palettes-and-accessibility-features-for-data-visualization-7869f4874fca)).
- Check contrast for the darkest and lightest content that can sit behind glass or gradients (see critical-core, visual language).

## 5. Non-colour encodings

Carbon's toolbox, all reusable [PRAC]:

- Textures (8 patterns; textured bars get a 1 px outline and double width).
- Shapes for points (8, outlined and filled).
- Solid vs dotted lines (annotations, projections, benchmarks).
- Direct labels instead of legends wherever space allows [INF].

## 6. Where colour should be quiet

- **Spending lists**: neutral. Red on every purchase teaches shame and stops being informative. [INF]
- **Fraud, debt, collections, disputes, bereavement**: low-saturation `surface.calm`, one clear action, no celebratory accents. [INF, supported by Monzo's tone rules; see critical-core]
- **Trading**: dark themes are common for dense, long-session screens [PRAC: practitioner taxonomy in `rgourley/financial-ui-suite`]. Keep loss red from dominating the whole screen on a down day; use it on the delta, not the background.
