# Disclosure, credit and dark patterns

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Layer every disclosure

The FCA's March 2026 consumer-understanding review lists layered plain language, essentials first, a 100-word summary, risks with equal prominence to benefits, and comprehension testing as good practice. It calls out cosmetic rewrites, warnings in small low-contrast text at the end of long mobile journeys, and treating no complaints as proof of understanding as poor practice [REG, UK] ([FCA](https://www.fca.org.uk/publications/good-and-poor-practice/consumer-understanding-good-practice-areas-improvement)).

Pattern [INF]:

1. **Summary card** (3–5 lines, about 100 words max): what it costs in total, what it costs if things go wrong, how to get out.
2. **Expandable detail** in plain language.
3. **Full legal text**, linked.
4. **Test comprehension** with real users ("How much will you pay in total?"), not reading time.

Reading level: the European Accessibility Act caps information complexity for banking services at CEFR B2 or lower [REG, EU] (see critical-core, inclusion).

## 2. Credit and loan offers

| Market | Hard UI rule |
|---|---|
| US closed-end credit (Reg Z §1026.17) | "Finance charge" and "annual percentage rate" with their amounts must be **more conspicuous than any other disclosure** (only the creditor's name is exempt) [REG] ([LII](https://www.law.cornell.edu/cfr/text/12/1026.17)) |
| US card offers (Reg Z §1026.60) | The table must follow the Appendix G-10 model; APRs and listed fees in **bold**; purchase APR in **at least 16-point type** [REG] ([LII](https://www.law.cornell.edu/cfr/text/12/1026.60)). Do not restyle it into cards or tabs. |
| EU consumer credit (CCD2, applies from 20 Nov 2026) | Covers interest-free BNPL; "Borrowing money costs money" warning; pre-contract information; 14-day withdrawal; no pre-ticked ancillary services; right to human review of automated credit decisions [REG] ([CMS](https://cms.law/en/lux/legal-updates/adoption-of-a-new-directive-modernising-credit-for-consumers)) |
| India digital lending (RBI Directions, 8 May 2025) | Digitally signed **Key Fact Statement** before signing; cooling-off of at least 1 day; marketplaces show **all** matching offers with APR and KFS link, ranked only by an objective measure; grievance officer shown in-app [REG] ([Mondaq](https://www.mondaq.com/india/fin-tech/1636908/digital-lending-directions-2025)) |

Universal rules [INF]: show APR and total repayable on the offer screen; show the cost of each repayment choice (Apple Card shows interest in real time for each payment amount [PRAC]); never let a headline ("no late fees") outrun its footnote.

## 3. BNPL

- BIT/MaPS survey (2,500+ UK BNPL users): 38% spent more than planned, 3 in 10 had repayment problems, 40% borrowed to repay; BIT recommends BNPL not be presented as the default [RES] ([BIT](https://www.bi.team/?p=28498)).
- The US CFPB withdrew its 2024 BNPL interpretive rule on 12 May 2025 [REG, US] ([CFPB](https://www.consumerfinance.gov/compliance/compliance-resources/consumer-cards-resources/buy-now-pay-later-bnpl-products/)); state laws may still apply.
- Rules [INF]: BNPL is never pre-selected or visually favoured over paying now; show the instalment schedule, late fees and the total; say it is credit.

## 4. Subscriptions and cancellation

- US: the FTC's click-to-cancel rule was vacated on 8 Jul 2025; California and Massachusetts rules still require easy cancellation [REG, US] ([Fenwick](https://www.fenwick.com/insights/publications/eighth-circuit-vacates-ftcs-click-to-cancel-rule)).
- EU: the Digital Fairness Act proposal (11 Nov 2026) would require reminders and express agreement before a free trial converts, renewal reminders, and an online termination function; fines up to 6% of global turnover; application likely years away [REG, EU, proposed] ([A&O Shearman](https://www.aoshearman.com/en/insights/ao-shearman-on-data/digital-fairness-act-the-european-commissions-proposal)).
- India: CCPA lists "subscription trap" and "SaaS billing" (silent trial-to-paid and silent recurring debits) as dark patterns [REG, IN].
- Apple Pay sheets for subscriptions show the trial amount (including $0), the regular amount and the billing start date [PRAC] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/apple-pay)).

Rule [INF]: cancel in the same channel and in no more steps than sign-up; remind before the first charge; show the next charge date and amount on the subscription screen.

## 5. Dark-pattern catalogue (unified)

Do not ship any of these. The regulators that name each are listed.

| Pattern | What it looks like in finance | Named by |
|---|---|---|
| Drip pricing | Fees revealed late in checkout or transfer | CCPA (IN), RBI (IN), FTC fee rule (US, narrow), DFA (EU, proposed) |
| Basket sneaking / pre-ticked add-ons | Loan protection insurance pre-selected | CCPA, RBI, CCD2 (EU), DFA |
| False urgency / scarcity | "Rate ends in 10 minutes" when it doesn't | CCPA, RBI, DFA |
| Confirm shaming | "No, I don't care about my family's future" | CCPA, RBI, DFA |
| Forced action | Requiring data or an app the service doesn't need | CCPA, RBI |
| Subscription trap | Hard cancellation; card required for "free" | CCPA, DFA, state laws (US) |
| Interface interference | Bank-preferred option bright, the other grey; consent defaulted to Yes | CCPA, RBI |
| Bait and switch | Advertised rate not available at application | CCPA, RBI |
| Disguised advertisement | Sponsored products shown as neutral recommendations | CCPA |
| Nagging | Re-asking for consent already refused | CCPA, RBI, DSA Art. 25 guidance (EU) |
| Trick question | Double negatives; "Not now" as the only decline | CCPA, RBI |
| Gamified engagement | Confetti on trades, scratch reveals, popularity lists, tap games | Massachusetts v. Robinhood consent order (US) |
| Steered marketplaces | Lender offers ranked by commission | RBI Digital Lending Directions |
| Dark-pattern enrolment | Enrolling people in paid services by default | CFPB lawsuit, 2022 (US) |

India: CCPA Guidelines (30 Nov 2023) list 13 patterns; RBI Responsible Business Conduct Directions ban 11 for banks and NBFCs from **1 Jan 2027** and require user testing and audits [REG, IN]. EU: DSA Article 25 bans interfaces that deceive or manipulate on online platforms [REG, EU].

## 6. Privacy defaults

- Money activity is **private by default**; social sharing is opt-in. Venmo's public-by-default feed drew sustained criticism and it dropped the global feed in 2021 [PRAC] ([EFF](https://www.eff.org/deeplinks/2021/07/venmo-takes-another-step-toward-privacy)).
- Google Pay's Tez launch hid phone and bank details in peer payments (audio-based Cash Mode) [PRAC].
- Separate opt-in for marketing messages, with easy unsubscribe (RBI) [REG, IN].

## 7. Deposit insurance and "who holds my money"

- US FDIC Part 328 digital signage: the final rule (published 29 Jan 2026) puts the FDIC sign on the homepage or first screen of the app and the first screen of deposit account opening; requires notices on non-deposit product pages and a dismissible notice (by the user, or automatically after at least 3 seconds) when customers leave for a non-deposit platform. **Compliance is required by 1 Apr 2027**; earlier dates in older articles were superseded [REG, US] ([Davis Wright Tremaine](https://www.dwt.com/blogs/financial-services-law-advisor/2026/02/fdic-finalizes-digital-signage-advertising-rule); [Federal Register](https://www.federalregister.gov/documents/2026/01/29/2026-01806/fdic-official-signs-advertisement-of-membership-false-advertising-misrepresentation-of-insured)).
- Never redraw official signs as decorative assets; follow the regulator's specification.
- Embedded finance: say plainly which licensed bank or e-money institution holds the funds (business-models).
