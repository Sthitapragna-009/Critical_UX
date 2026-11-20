# Money movement: from amount to "sent"

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

The canonical flow: **amount → payee → review → authenticate → send → status**. Each step has rules.

## 1. Amount entry

- **Amount first for person-to-person.** Cash App was built around "send money as easy as sending an email", with the amount leading [PRAC] ([Sequoia, Crucible Moments](https://sequoiacap.com/podcast/crucible-moments-block)).
- Numeric keypad with the locale's decimal separator; the amount renders live in the display size used on the review screen; currency code next to it. [INF]
- Show the available balance under the field and validate as people type ("You have £240.15 available"). Over-limit is shown before Continue, not after. [INF]
- Never auto-insert decimals (typing `12` must not become `0.12`). [INF]
- Paste, voice and quick-amount chips must produce the same validated value.
- For two currencies, link "You send" and "They receive"; editing either recalculates the other, and the rate source is shown between them. [PRAC]

## 2. FX and fee quote

Wise's model treats true cost as **fees plus exchange rate**, uses the mid-market rate and lists each fee separately [PRAC] ([Wise pricing](https://www.wise.com/pricing); [Wise: Radical transparency](https://wise.com/community/radical-transparency-us)). A teardown describes its quote as four lines, used identically on marketing, in-app, mid-flow and at confirmation [PRAC, secondary] ([925studios](https://www.925studios.co/blog/wise-design-breakdown-fintech-transparency)):

```
You send           1,000.00 GBP
Our fee              −4.12 GBP
Rate (mid-market)    1.1712          ← state if a markup is included
They receive       1,166.37 EUR
Should arrive      Tomorrow           ← estimate, see money-data
```

Rules:

- The rate says what it is: "mid-market" or "includes a 1.5% markup". [INF, aligned with PSR proposals that conversion charges be shown before a transaction [REG, EU, pending]]
- If the quote expires, show the timer and what happens when it lapses (re-quote, not silent change). [INF]
- Fees are named ("Transfer fee", "Card conversion fee"), never only "Service fee". [INF]
- Totals are the most prominent figure; under the US FTC fee rule (ticketing and lodging only) the all-in price must be the most prominent and fees forced by pre-checked boxes count as mandatory [REG, US, narrow scope] ([National Law Review](https://natlawreview.com/article/ftc-issues-faqs-junk-fees-rule)). India's CCPA bans drip pricing: non-optional fees belong in the shown price [REG, India].

## 3. Adding a payee and verifying the name

Name checks are now infrastructure in the UK, EU, Australia and elsewhere. Run the check when the payee is entered.

**Result states and UI** [REG + INF]:

| Result | Colour/icon | Copy pattern | Primary action |
|---|---|---|---|
| Match | success, check | "Account name confirmed" | Continue |
| Close match | warning, info | "The name on this account is **Jane Smyth**. Is this who you meant?" | "Use Jane Smyth" / "Go back" |
| No match | warning, strong | "This name doesn't match the account. Paying could send money to the wrong person, and you may not get it back." | **Go back** (continuing is secondary) |
| Account type mismatch (business vs personal) | warning | "This is a business account, not a personal one." | Go back |
| Unable to check | neutral | "We can't check these details right now. Only continue if you're sure they're right." | Go back / Continue |
| Account doesn't exist | error | "This account doesn't exist. Check the details." | Edit (hard block) |

- UK CoP returns reason codes (ANNM no match; MBAM close match with name; BANM/PANM type mismatch; BAMM/PAMM close match plus type mismatch; AC01 no account; OPTO opted out; CASS switched; ACNS/SCNS not supported). **Codes are never shown verbatim.** On close-match codes, display the returned name [REG, UK] ([Weavr CoP codes](https://docs.weavr.io/transactions/owt/cop/cop-codes/)). Lloyds publishes its customer copy per state; only a non-existent account blocks [PRAC] ([Lloyds](https://www.lloydsbank.com/help-guidance/everyday-banking/payments-and-transfers/name-checks.html)).
- EU Verification of Payee (mandatory for euro-area PSPs from 9 Oct 2025, others by 9 Jul 2027): MATCH, CLOSE MATCH, NO MATCH, verification not possible; free, no opt-in [REG, EU] ([PayTechLaw](https://paytechlaw.com/en/verification-of-payee-vop-under-the-instant-payment-regulation/)).
- Australia CoP (from July 2025, 100+ institutions): people spend about 3× longer on a "no match" result, and one institution saw 570,000+ payments abandoned after "no match" [PRAC, AU] ([AP+](https://www.auspayplus.com.au/?p=8854)). The warning works; design it to be read, not dismissed.
- India UPI shows the registered payee name before payment [PRAC, IN; NPCI screen rules unverified].
- A **new payee** in Singapore triggers a 12-hour block on high-risk actions after a new device or token [REG, SG] (see identity-and-access).

## 4. Review screen

Restate everything that can go wrong [INF]:

```
Send £2,400.00
to   Jane Smith  ✓ name confirmed
     Barclays · 20-00-00 · •••• 4421
from Everyday account (£3,112.40 available)
when Now · should arrive in 2 hours
fee  £0.00
ref  Rent March

This payment can't be cancelled once sent.
[ Send £2,400.00 ]      ← verb + amount
  Edit
```

- The button label includes the verb and amount.
- Irreversibility is stated in plain words, once, near the button.
- Edit returns to the field with values kept.
- Scheduled and recurring payments show the first date, frequency and end.

## 5. Scam friction that works

Evidence:

- **Akesson, Gathergood & Quispe-Torreblanca (2023), n=8,958** [RES] ([CeDEx DP 2023-08](https://www.nottingham.ac.uk/cedex/documents/papers/cedex-discussion-paper-2023-08.pdf)): 22% of the control group paid a simulated fraudster.
  - Text warnings: −4 percentage points, fading when the fraud came later.
  - Prominent safe-action buttons (cancel, call bank, save for later): **−12 pp**.
  - Risk-targeted screening plus those buttons: **−18 pp** (about 81% relative), at a cost of 7 pp fewer legitimate payments completed.
- **Habituation** (Vance et al., *MIS Quarterly* 2018): attention to repeated warnings drops day after day; **warnings that vary in appearance** slowed the decline, and adherence stayed higher in a 3-week field test [RES].
- **Blocking confirmations** (Bravo-Lillo et al., SOUPS 2013): designs that require an action before proceeding were 2–3× more likely to produce an informed decision; retyping a key value worked best but was slowest; swiping alone was not significant in one experiment [RES]. Slide-to-pay is not a safety measure.
- The FCA lists real-time scam warnings and short "positive friction" pauses as good practice (Mar 2026) [REG, UK] ([FCA](https://www.fca.org.uk/publications/good-and-poor-practice/consumer-understanding-good-practice-areas-improvement)). UK reimbursement for APP scams (up to £85,000 since 7 Oct 2024) gives banks a liability reason to make warnings work [REG, UK] ([PSR](https://www.psr.org.uk/information-for-consumers/app-fraud-reimbursement-protections)).

Pattern [INF, from the evidence above]:

1. **Ask the purpose** for risky payments (new payee, large amount, crypto, investment, "safe account"). Tailor the warning to the answer.
2. Show a short, specific warning **only when risk signals fire**, with the scam story in one sentence ("Banks never ask you to move money to a safe account").
3. Make **safe actions the primary buttons**: "Stop this payment", "Call us", "Wait 24 hours". Continuing is secondary.
4. **Vary the warning's appearance** by scam type so it doesn't become wallpaper.
5. For the highest risk, require an active step (retype the payee's name or amount) or a timed hold, not a swipe.
6. Show whether the bank is really calling: Monzo's Call Status banner tells customers to hang up if it says the bank isn't calling [PRAC] ([Monzo help](https://monzo.com/help/monzo-fraud-category/fraud-warnings)).

## 6. Authenticate and send

- Step-up only when needed (see identity-and-access for SCA exemptions and passkeys).
- On press: disable, show "Sending £2,400…", keep the review details visible. (money-data, progress)
- Idempotency key on the request; on timeout show the "checking" state, never "Something went wrong, try again". [PRAC/INF]
- Success: a calm checkmark with amount, payee, reference and status ("Sent · should arrive by 14:20"). No confetti. [INF]

## 7. Declines: map codes to actions

Based on Stripe's decline-code guidance [PRAC] ([Stripe decline codes](https://docs.stripe.com/declines/codes.md)):

| Group | Codes (examples) | Copy pattern |
|---|---|---|
| Fix and retry | `incorrect_cvc`, `incorrect_number`, `incorrect_zip` | "The security code doesn't match. Check the 3 digits on the back." Keep the form filled; focus the field. |
| Use another method | `insufficient_funds`, `expired_card`, `card_not_supported` | "This card was declined. Try another card or pay by bank." |
| Contact your bank | `do_not_honor`, `generic_decline`, `call_issuer`, **and** `fraudulent`, `stolen_card`, `lost_card`, `merchant_blacklist` | "Your bank declined this payment. Try another method or contact your bank." Never mention fraud, loss or theft. |
| Temporary | `processing_error`, `issuer_not_available`, `reenter_transaction` | "We couldn't reach your bank. Try again in a few minutes." |
| Possible duplicate | `duplicate_transaction` | "This looks like a payment you just made. Check your recent payments before trying again." |
| Needs authentication | `authentication_required` | Trigger 3DS in the flow; off-session, ask the customer to come back and confirm. |

Apple Pay error messages should name the field, be noun phrases without end punctuation and stay at 128 characters or fewer [PRAC] ([Apple HIG, Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay)).

## 8. After sending

- Status timeline (money-data, progress).
- "Share proof of payment" with masked identifiers.
- Cancel or recall only where the rail allows it, and say so honestly ("This payment can't be recalled. If it was a scam, report it now").
- Entry to report a problem from the payment itself (disputes-and-recovery).
