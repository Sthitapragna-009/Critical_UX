# Records, statements and B2B dashboards

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. The transaction row

Anatomy, left to right on mobile [INF, built from Apple Card and Monzo practice]:

```
[logo/category icon]  Merchant name (cleaned)           −£12.40
                      Category · 14:02 · Pending        (tabular, right-aligned)
```

- **Clean the merchant name** and keep the raw descriptor one tap away. Apple Card used machine learning and Maps to turn raw descriptors into merchant names, locations and colour-coded categories [PRAC] ([Apple Newsroom](https://www.apple.com/newsroom/2019/03/introducing-apple-card-a-new-kind-of-credit-card-created-by-apple)).
- **The same name everywhere.** The name people see at authorisation, in the push notification, in the app and on the statement should match. Apple Pay requires the "Pay [Business]" name to match the statement descriptor, with "(via …)" for intermediaries [PRAC] ([Apple HIG, Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay)).
- **Pending** labelled in words, not just italics or grey.
- **Logos** only from a licensed enrichment provider or the merchant; never scrape or redraw brand marks.
- **Group by day** with daily totals in multi-transaction views; sticky date headers on scroll.
- **Search and filter** by merchant, amount (exact and range), category, date, card and status. Amount search should accept "12.4", "12.40" and "£12.40". [INF]

## 2. Transaction detail

Show, in order [INF, supported by Monzo's disputes work]:

1. Amount (largest), merchant, date and time, status.
2. Where and how: location or website, card or account used, **how it was authenticated** (chip, contactless, Apple Pay, online with 3-D Secure, recurring).
3. Context: other payments to this merchant, whether it is a subscription, why a payment may be delayed.
4. Actions: split, add receipt or note, recategorise, "I don't recognise this", get help.

Monzo's 2025–26 disputes redesign added exactly this context before the claim form, plus a cool-off suggestion to contact the merchant and routing by what happened. Dispute reports fell by about half, rejected claims fell from about 70% to about 50% and back-office effort fell about 25% against a control group [PRAC, company-reported] ([Monzo blog](https://monzo.com/blog/more-than-money-back-reimagining-payment-disputes-at-monzo)). Principle: **give context, not a quiz.** The dispute flow itself lives in money-flows.

## 3. Receipts and confirmations

A receipt is evidence. It includes [INF]:

- amount and currency, fees itemised, exchange rate if any
- payer and payee names with masked identifiers
- date, time and time zone; reference and transaction ID (copyable, slashed-zero font)
- status at the time of issue, with "this receipt shows the status on [date]" when it can still change
- how to get help or dispute
- a shareable PDF or image that never exposes full account numbers

## 4. Statements

- Statements are records people keep, print and send to landlords, lenders and tax offices. Design them for print and PDF first.
- Opening balance, money in, money out, closing balance at the top, then the list. Parts sum to totals exactly.
- Running balance column in tabular figures.
- Accessible PDF: tagged structure, reading order, real text (not images), table headers. (PDF/UA is the standard; not verified in this research pass [INF].)
- Offer CSV and accounting formats in B2B; keep the same transaction IDs across formats.

## 5. B2B dashboards

JPMorgan's Salt analytical-dashboard pattern [PRAC] ([Salt: Analytical dashboard](https://www.saltdesignsystem.com/salt/patterns/analytical-dashboard)):

- For "data-intensive environments, performance tracking, risk assessment, investment analysis, and client reporting".
- Limit key metrics to about **3–6**, grouped.
- Hierarchy: header → key metrics → charts → data grid.
- Grids support sort, search and pagination, in several densities.

criticalUX dashboard rules [INF]:

- Each KPI tile: label, value, delta with comparison period, data freshness ("Updated 2 min ago"), optional sparkline.
- **Mode and environment always visible.** Test vs live, entity, currency and date range sit in the header, not in a settings page. NIST found test and production screens that looked identical after login among EHR use-error root causes [REG] ([NIST IR 7804](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7804.pdf)); Stripe isolates Sandboxes from live data [PRAC].
- **Multi-entity**: entity switcher in the header with the entity name repeated on every money action confirmation.
- **Front-line vs back-office**: give operators a reduced interface (Stripe's Terminal Operator role cannot see the Dashboard or refund) [PRAC] ([Stripe roles](https://docs.stripe.com/get-started/account/teams/roles)).

## 6. Finance data grids

- Right-aligned tabular numbers, currency in header when uniform, totals row pinned.
- Density settings (compact, default, comfortable, touch) remembered per user [PRAC: Salt offers densities].
- Frozen first column (entity, counterparty or date) on horizontal scroll.
- Keyboard: arrow navigation between cells, Enter to open, Space to select, Shift-click and Shift-arrow for ranges, `/` or Ctrl/Cmd-F to search the grid. [INF]
- Bulk actions show a count and a total ("Approve 12 payments · £48,210.00") and go through the same confirmation rules as single actions.
- Column-level filters with visible "filters active" state; never hide rows silently.
- Exports are a permission (Stripe treats bulk export as separate) and say what is included.

## 7. Approvals and audit trails

- **Maker-checker.** Mercury's separation-of-duties toggle excludes a payment's creator from approving it and blocks submission when no other approver exists; changing the policy needs a second admin when dual approval is on, and applies only to new payments [PRAC] ([Mercury Help](https://support.mercury.com/hc/en-us/articles/45985054591508-Enforcing-separation-of-duties-for-per-payment-approvals)). Encode: exclude the initiator by default in high-stakes contexts; block rather than silently auto-approve; policy changes are themselves four-eyes actions; state that changes apply going forward.
- **Approvals as three surfaces** [INF]: policy (who approves what, by amount), request (what is asked, why, evidence), decision (approve/reject with reason, visible to requester). Ramp routes by amount and lets people request and approve in Slack [PRAC].
- **Audit log** [INF]: who, what, when, from where (device/IP), before → after values, and the approval chain. Read-only, filterable, exportable. Show it to customers where they are accountable for their team's actions.
- **Reconciliation**: matched, suggested match, unmatched, and exceptions as distinct states; suggestions are never auto-accepted above a set amount. [INF]
