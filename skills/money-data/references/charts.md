# Charts for money

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. First question: does it need a chart?

Apple's guidance: not every dataset needs a chart; if people only need the values, give a list or table they can scroll, search and sort [PRAC] ([Apple HIG, Charting data](https://developer.apple.com/design/human-interface-guidelines/charting-data.md)). Prefer common chart types people already read (line, bar) and reveal detail progressively.

## 2. Chart chooser

| Job | Chart | Notes |
|---|---|---|
| Balance or net worth over time | Line or area | Non-zero baseline allowed for lines; label the range [RES] |
| Portfolio value | Line; candlestick as an opt-in | Robinhood makes candles a chart setting; the default line shows closing prices [PRAC] |
| Spending by category (one period) | Horizontal bar, sorted | Bars from zero; direct labels; avoid >6 donut slices [INF] |
| Spending by category over time | Small multiples or stacked bars | Stacked only when the total matters more than each part [INF] |
| Budget vs actual | Bullet bar or bar with target marker | Show remaining as an amount, not just a bar [INF] |
| Cash flow in/out | Diverging bars (in above, out below the axis) | Net line optional [INF] |
| Allocation | Single stacked bar or treemap; donut for ≤5 parts | No primary research compared these for finance; choose for label space [INF] |
| Projection (savings, retirement, loan payoff, forecast) | **Fan or band chart** | Never a single line. Bank of England 2026, n≈1,600: fan charts conveyed expectation and uncertainty together best, and limited loss of trust after a miss [RES] ([BoE working paper](https://www.bankofengland.co.uk/working-paper/2026/anchors-aweigh-the-effect-of-communicating-forecast-uncertainty)) |
| KPI tile (MRR, GMV, payouts, approvals) | Number + delta + period + optional sparkline | Expanding the sparkline keeps the same marks and colours [PRAC] |
| Risk to a person ("1 in 50 chance") | Icon array | Removes denominator neglect in younger and older adults [RES] ([Garcia-Retamero et al. 2010](https://ideas.repec.org/a/sae/medema/v30y2010i6p672-684.html)) |
| Distribution of outcomes | Histogram or dot plot | Show the median and the bad case, not just the mean [INF] |

## 3. Honest axes and baselines

- **Bars and columns start at zero.** In Pandey et al. (2015), readers of truncated bar charts took away the exaggerated message [RES] ([Datawrapper Academy](https://www.datawrapper.de/academy/why-our-column-and-bar-charts-start-at-zero)).
- **Lines, dots and ranges may start above zero** because no filled area implies a baseline; show axis labels or a range label so a 1% move filling the full height is not read as a crash [RES/INF].
- **State the baseline of every delta in words.** Robinhood measures portfolio returns from the previous 4 PM ET close for securities and 12 AM local time for crypto [PRAC] ([Robinhood support](https://robinhood.com/us/en/support/articles/using-candlestick-charts)). Write "Today, since yesterday's close".
- **Time ranges**: offer the ranges the data supports (1D, 1W, 1M, 3M, 1Y, 5Y, All for markets; This month, 3M, 12M for spending). Remember the last choice. Never default to the range that flatters. [INF]
- **Percent vs absolute**: show both on the headline (`+£120 (+2.4%)`); let charts toggle if both matter. [INF]
- **Log scale** only for long-horizon growth comparisons, labelled "Log scale". [INF]

## 4. Projections and uncertainty

- Show the central estimate **and** a band (for example the 10th–90th percentile), labelled in words: "Likely range".
- Label projected segments with a different line style (dashed) and the word "Projected"; never let projected and actual look the same. [INF]
- Put the assumptions next to the chart (return rate, contributions, inflation) and let people change them; simulators are a 2026 finance-website trend [PRAC] ([Digidop](https://www.digidop.com/blog/2026-design-trends-for-finance-websites)).
- People underestimate uncertainty consistently, so do not narrow the band for aesthetics [RES, BoE].

## 5. Small charts and sparklines

- A sparkline previews; it doesn't decide. Pair it with the number and delta it summarises.
- When a small chart expands, keep chart type, colours, marks and annotations identical [PRAC] (Apple HIG).
- Start and end points can carry dots; omit axes but keep the period in text ("30 days").

## 6. Scrubbing, crosshairs and tooltips

The Coinbase Design System Scrubber is the most complete public fintech spec [PRAC] ([CDS Scrubber](https://cds.coinbase.com/components/charts/Scrubber/)):

- a vertical scrubber line (dotted by default) with a beacon on each series
- a value label above the line that can change with the data index
- an overlay that de-emphasises data to the right of the scrubbed point
- space between the scrubber and the x-axis, and about 92 px reserved at the right edge for labels

criticalUX additions [INF]:

- While scrubbing, the headline value and delta update to the scrubbed point ("£4,210 · 12 Mar · +£80 since 1 Mar"); they restore on release.
- Haptic tick on each data point on touch devices, off when Reduce Motion or haptics are off.
- **Keyboard and screen-reader equivalent** (CDS does not document one): a focusable chart; arrow keys move point by point; Home/End jump to ends; each point announces date, value and change. Carbon's "Enter chart" pattern is a reference [PRAC] ([Carbon on Medium](https://medium.com/carbondesign/color-palettes-and-accessibility-features-for-data-visualization-7869f4874fca)).
- Tooltips never cover the point being read; flip sides at edges.

## 7. Chart accessibility checklist

- [ ] Headline summary above the chart ("Spending is £120 lower than last month"). A summary does not replace labels [PRAC] (Apple HIG).
- [ ] "View as table" in every chart; Carbon calls tables "the most accessible and least biased" form [PRAC].
- [ ] Accessibility labels for series, axes and points; Swift Charts and Android have APIs for this.
- [ ] Marks at 3:1, no meaning by colour alone, textures or shapes available [REG].
- [ ] Respect Reduce Motion: no animated drawing of lines when it is on.
- [ ] Charts survive 200% text zoom without labels overlapping.

## 8. What not to do

- **No celebrations on trades, credit or spending.** The Massachusetts consent order against Robinhood (Jan 2024, $7.5M) cited confetti after a first trade, scratch-off stock reveals, popularity lists, emoji push notifications and a tapping waitlist [REG] ([Vinson & Elkins](https://velaw.com/insights/game-over-robinhood-pays-7-5-million-to-resolve-gamification-securities-violations)). The SEC's 2023 predictive-analytics proposal was withdrawn on 12 June 2025, so the limit now comes from state enforcement, the FCA Consumer Duty and reputation.
- **No "most popular" rankings** on an investing home screen without context.
- **No 3D charts, no gradients that encode values** (Carbon: never use gradients to show meaningful progression) [PRAC].
- **No dual y-axes** for unrelated measures; use two charts. [INF]
