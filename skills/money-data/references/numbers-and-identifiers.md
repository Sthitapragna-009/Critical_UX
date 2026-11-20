# Numbers, currencies and identifiers

Source types: **[REG]** law or standard · **[RES]** published research · **[PRAC]** documented practice · **[INF]** criticalUX synthesis.

## 1. Format with the platform

Never concatenate a symbol and a number by hand. Locale rules decide symbol position, spacing, grouping and decimal marks.

| Platform | API |
|---|---|
| Web / Node | `Intl.NumberFormat(locale, { style: "currency", currency })` |
| Swift | `amount.formatted(.currency(code: "EUR"))` / `NumberFormatter` |
| Kotlin / Android | `NumberFormat.getCurrencyInstance(locale)` with `currency = Currency.getInstance("EUR")` |
| Figma | Write sample values in the target locale; keep a locale switch in the prototype |

What the platform does for you [PRAC] ([MDN Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)):

- `de-DE` EUR 123456.789 → `123.456,79 €`
- `ja-JP` JPY → `￥123,457` (JPY has no minor unit; the default fraction digits come from ISO 4217)
- `en-IN` groups lakh and crore: `₹1,00,000` [INF: standard CLDR behaviour]

Useful options:

| Option | Use |
|---|---|
| `currencyDisplay: "narrowSymbol"` | `$100` inside a single-currency product |
| `currencyDisplay: "code"` | `USD 100` when several dollar currencies can appear |
| `currencySign: "accounting"` | `($3,500.00)` for negatives, **only** in accounting and B2B ledgers |
| `signDisplay: "exceptZero"` | `+55%`, `−12.40`, and plain `0` for deltas |
| `notation: "compact"` | `988M`, `9.9亿` on axes and tiles only |
| `roundingMode: "halfEven"` | banker's rounding where the ledger uses it; match the backend |
| `trailingZeroDisplay: "stripIfInteger"` | `£20` instead of `£20.00` in marketing copy only, never in a ledger |

## 2. Precision rules [INF unless marked]

- **Actionable amounts** (balances, payments, fees, refunds, repayments): full minor-unit precision, never compact, never rounded for display.
- **Rates** (FX, interest): show the precision the price is set at. FX rates usually need 4–6 significant digits; state whether a rate is mid-market or includes a markup (see money-flows).
- **Percentages**: one decimal for returns and APR changes under 10%, none for large round numbers; never more precision than the data has.
- **Crypto and fractional shares**: show enough decimals for the amount to be non-zero and to match the order; truncate visually only with a "full value" affordance.
- **Parts sum to the total.** If rounded allocations add to 99.9% or 100.1%, either fix with largest-remainder rounding or say "Figures are rounded".
- **Never show a negative zero** (`−0.00`). `signDisplay: "negative"` prevents it [PRAC].

## 3. Typography for numbers

- `font-variant-numeric: tabular-nums` on every column, list, ticker and scrubbed headline so digits align and do not jitter [PRAC] ([MDN font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)).
- Proportional figures are fine in running sentences.
- `slashed-zero` (or a font with a distinct zero) for reference codes, IBANs, card last-fours and one-time codes, where 0 and O can be confused.
- Use the true minus sign `−` (U+2212) in display text; it matches `+` in width. Keep ASCII hyphen-minus in copyable fields and exports. [INF]
- Right-align numeric columns and align decimals. Put the currency code in the column header when a column is single-currency.
- Pick a typeface whose figures are distinct at small sizes: 1/7, 3/8, 5/6 and 0/O must not blur at 12 px. Open options that ship tabular figures include **Inter**, **IBM Plex Sans**, **Source Sans 3** and **Roboto Flex** (all SIL OFL). Do not ship proprietary brand faces.

## 4. Negative numbers

| Context | Pattern |
|---|---|
| Consumer transaction list | `−£12.40` with neutral colour; spending is normal, not an error |
| Consumer delta | `−£12.40 (−0.8%)` with the negative token + down glyph |
| Accounting / B2B ledger | `(£12.40)` via `currencySign: "accounting"` if the audience expects it |
| Overdrawn balance | `−£40.00` with a label ("Overdrawn") and a next action; colour alone is not enough |

Spending shown in red teaches people that every purchase is a failure. Reserve the negative token for losses and problems. [INF]

## 5. Identifiers

- **Mask by default**: `•••• 4421` for cards and accounts, last four only. Full numbers appear only after a deliberate reveal, preferably with re-authentication, and auto-hide again. Apple Card removes the number from the physical card and keeps it in Wallet [PRAC] ([Apple Newsroom](https://www.apple.com/newsroom/2019/03/introducing-apple-card-a-new-kind-of-credit-card-created-by-apple)). Nubank moved card numbers to the back after customers posted photos of new cards [PRAC].
- **Group for reading**: IBAN in blocks of four, sort code `12-34-56`, card numbers in blocks of four. Copy actions copy the raw value without spaces.
- **Display names before numbers**: "J. Smith · •••• 4421" reads faster and helps spot a wrong payee.
- **Privacy mode**: a hide-balances toggle must blur every money surface, including widgets, notifications and the app switcher snapshot. [INF]

## 6. Quantities with units (shared with critical-domains)

Clinical notation rules are the strictest public standard for any number with a unit, and they transfer to money, energy and fuel [REG] ([ISMP Canada "Do Not Use" list](https://www.ismp-canada.org/download/ISMPC_List_of_Dangerous_Abbreviations.pdf)):

- No trailing zero: `5 mg`, never `5.0 mg` (a missed decimal is a 10-fold error).
- Always a leading zero: `0.5 mg`, never `.5 mg`.
- Spell out ambiguous units (`units`, `mcg`) rather than abbreviations that are misread (`U`, `µg`).
- Never truncate a value or unit in a list or picker. If it doesn't fit, wrap.

For money: never let a column width cut `£1,240.00` to `£1,24…`.

## 7. Time and dates attached to money

- Every balance or price that can go stale shows "as of" time when older than a few seconds in trading, or a day in banking.
- Use absolute dates for anything with a deadline ("Due 3 Dec"), relative time only for recent activity ("2 min ago").
- State the time zone for cut-offs and market hours.
