---
name: money-data
description: Display money and financial data correctly and beautifully. Covers amounts, currencies, deltas, account identifiers, gain/loss colour by locale, chart choice (balances, spending, cash flow, portfolios, projections, KPIs), baselines, scrubbing and chart accessibility, progress and payment status (transfers, cards, KYC steps, disputes, goals), transaction lists, receipts, statements and B2B finance dashboards and data grids. Use whenever you design, build, critique or prototype a screen, component, chart or dashboard that shows money, balances, prices, rates, portfolio values, payment states or financial records, in any stack (HTML/CSS, React, SwiftUI, Compose, Figma), for banking, payments, investing, lending, insurance, crypto, expense or treasury products.
---

# money-data

How to show money so people read it right the first time. These rules apply to consumer apps and dense B2B tools alike. They come from typography and data-visualisation standards applied strictly to money, plus documented practice at Wise, Monzo, Stripe, Coinbase, Robinhood, Apple and IBM Carbon.

Pair this skill with **critical-core** (risk, emotion, visual language) and **money-flows** (the actions that move money).

## How to use this skill

1. **Name the job of every number.** Is it a balance, an amount to pay, a delta, a rate, a projection, a reference? The job decides format, precision, colour and position.
2. **Load the reference you need** (below) before writing code or specifying a component. Use the exact values; do not improvise formats.
3. **Write the states, not just the happy path.** Every money surface has loading, stale, pending, failed, empty and hidden states.
4. **Run the checklist** at the end before you hand anything over.

| Reference | Load it for |
|---|---|
| `references/numbers-and-identifiers.md` | Currency formatting, minor units, rounding, compact notation, negative numbers, tabular figures, masking account numbers, units and doses |
| `references/color-and-gain-loss.md` | Positive/negative colour by locale, colour-blind-safe pairs, contrast for marks, semantic tokens |
| `references/charts.md` | Chart chooser, baselines, time ranges, projections and uncertainty, sparklines, scrubbing, chart accessibility, gamification limits |
| `references/progress-and-status.md` | Loading thresholds, payment and transfer state maps, card, dispute and KYC status, savings goals and credit meters |
| `references/records-and-dashboards.md` | Transaction rows, merchant cleanup, receipts, statements, B2B dashboards, finance data grids, audit logs, reconciliation |

Original design tokens for all of the above live in `/tokens` at the repo root.

## The rules that matter most

Each rule carries a source type: **[REG]** law or standard, **[RES]** published research, **[PRAC]** documented company practice, **[INF]** criticalUX synthesis.

1. **Format with the platform, never by hand.** Use `Intl.NumberFormat` (web), `NumberFormatter`/`FormatStyle` (Apple), `NumberFormat`/`DecimalFormat` (Android). They handle symbol position, separators and each currency's minor units (JPY has none, KWD has three). [PRAC]
2. **Every amount carries its currency.** No bare numbers in multi-currency products. Use the ISO code (USD) when the symbol is ambiguous ($ alone can mean USD, CAD, AUD, MXN and others). [INF]
3. **Tabular figures for any number that changes or sits in a column** (`font-variant-numeric: tabular-nums`). Proportional figures jitter as values tick. [PRAC]
4. **Compact notation only on axes and summary tiles.** Never on a balance, payment amount, fee or anything the person will act on. [INF]
5. **Parts sum to the total,** or the screen says rounding applies. [INF]
6. **Positive and negative are semantic tokens resolved by locale or setting,** not hard-coded green and red. Red means *up* in mainland China, Japan and Taiwan markets. Always pair colour with a sign (+/−) and a glyph. [RES/PRAC]
7. **Chart marks reach 3:1 contrast** against adjacent colours (WCAG 1.4.11), and no meaning depends on colour alone (WCAG 1.4.1). [REG]
8. **Bars start at zero. Lines may not.** Truncated bars exaggerate differences. [RES]
9. **Never show a single line for an uncertain future.** Projections of savings, retirement, loan payoff or forecasts use a fan or band chart. A 2026 Bank of England study (n≈1,600) found fan charts conveyed expectation and uncertainty best and protected trust after a miss. [RES]
10. **Every chart has a table view and a one-line headline summary.** Scrubbing has a keyboard and screen-reader equivalent. [PRAC]
11. **State the baseline of every delta.** "+2.4% today (since yesterday's close)". [PRAC]
12. **Progress is honest.** Map backend states to 3–5 plain stages with timestamps. "Sent" is not "arrived". ETAs are labelled as estimates. Returned money has its own non-final state. [PRAC]
13. **Show that a tap registered immediately.** "Don't press twice" warnings fail; an instant "processing" state with the button disabled works. [RES]
14. **Mask identifiers by default** (•••• 4421), reveal on demand with re-authentication for full numbers. [PRAC]
15. **Pending is labelled and explained,** and never silently added to or removed from the available balance. [INF]
16. **No reward mechanics on investing, credit or spending charts** (confetti on trades, scratch-card reveals, popularity rankings). Robinhood paid $7.5M to Massachusetts in 2024 over these. [REG]

## Quick specs

**Amount hierarchy.** On a balance or payment screen the amount is the largest text, set in tabular figures, with the currency in the same visual weight or one step lighter. Decimal digits may be smaller but never lower contrast than 4.5:1.

**Delta label.** `+£12.40 (+0.8%) today` → sign, absolute, relative, period. Colour token + arrow glyph + sign. Zero shows as `£0.00 (0.0%)` with no sign and neutral colour (`signDisplay: "exceptZero"`).

**Status chip.** Icon + word + colour, never colour alone. Use verbs people understand: *Pending*, *Paid*, *Failed*, *Refunded*, *Returned*. Avoid internal codes (`AUTHORISED`, `SETTLED`).

## Before you hand over, check

- [ ] Every amount formatted by the platform API for the user's locale, with currency
- [ ] Tabular figures on all changing or columnar numbers
- [ ] No compact notation on actionable amounts
- [ ] Gain/loss uses semantic tokens + sign + glyph; tested with a colour-blindness simulator
- [ ] Bars from zero; projections as bands; baselines stated
- [ ] Each chart has a headline, a table view and keyboard access
- [ ] Every status has loading, pending, failed, returned and stale states with timestamps
- [ ] Identifiers masked; reveal is deliberate
- [ ] Hidden-balance (privacy) mode works on every money surface
- [ ] Text scales to 200% without truncating amounts

Read the source links inside each reference before relying on a regulatory point for a shipping product.
