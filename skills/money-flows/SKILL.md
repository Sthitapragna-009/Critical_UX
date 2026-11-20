---
name: money-flows
description: Design the actions that move money and the rules around them. Covers amount entry, FX quotes and fees, adding and verifying payees (Confirmation/Verification of Payee), review and confirm screens, scam warnings and positive friction, declines and unknown results, disputes and fraud recovery, KYC and onboarding, passkeys, SCA/3-D Secure and step-up, consent screens, credit/BNPL/subscription disclosures, anti-dark-pattern rules, per-jurisdiction regulation (UK, EU, US, India, Brazil, Singapore, Australia and more), business models (B2B, B2C, B2B2C/embedded, D2C checkout), channels (POS and Tap to Pay, ATMs, QR, USSD/SMS, wallets, notifications, assistants) and AI-agent payments. Use whenever you design, build, review or write copy for a payment, transfer, checkout, onboarding, lending, card, subscription, B2B approval or embedded-finance flow.
---

# money-flows

The moments where money moves are where people lose it. This skill encodes what regulators, scheme rules and the best-documented products (Wise, Monzo, Stripe, Apple, Plaid, Mercury, M-Pesa, Google Pay/Tez, PhonePe) require of those moments.

Pair it with **money-data** (how amounts, states and records look) and **critical-core** (risk hierarchy, confirmations, emotion and voice).

## How to use this skill

1. **Identify the flow and the rail.** Card, bank transfer (Faster Payments, SEPA Instant, ACH, UPI, Pix), wallet, BNPL, crypto, agent-initiated. The rail decides what is reversible and which rules apply.
2. **Identify the jurisdictions.** Where the user is, where the provider is licensed, where the money goes. Load the matching file in `references/jurisdictions/`. If the region is listed as "not researched", say so and design to the strictest researched rule.
3. **Identify the business model and channel** (`business-models.md`, `channels.md`). They change who the user is and what can fail.
4. **Design the flow with the moment rules** (`money-movement.md`, `identity-and-access.md`, `disclosure-and-ethics.md`, `disputes-and-recovery.md`, `agent-payments.md`).
5. **Write every state.** Success, failure, unknown, returned, blocked, held for review.
6. **Run the checklist** at the end.

| Reference | Load it for |
|---|---|
| `references/money-movement.md` | Amount entry, FX and fee quote, payee add and verification states, review screen, scam friction (with effect sizes), send, decline copy map, unknown results |
| `references/identity-and-access.md` | KYC and onboarding, document capture, passkeys, SCA/3DS framing, step-up, new-device cooling periods, consent screens, selective disclosure |
| `references/disclosure-and-ethics.md` | Cost and credit disclosure layering, BNPL, subscriptions and cancellation, a unified dark-pattern catalogue (EU, US, India, UK), privacy defaults |
| `references/disputes-and-recovery.md` | Dispute flows, regulatory clocks, scam reporting, card freeze, kill switches, reimbursement messaging |
| `references/business-models.md` | B2B roles, approvals and maker-checker; B2B2C/embedded finance; D2C checkout; B2C assistants |
| `references/channels.md` | Tap to Pay and POS, wallets and payment sheets, ATMs and kiosks, QR, USSD/SMS, physical cards, notifications, wearables, voice |
| `references/agent-payments.md` | AI agents paying on someone's behalf: mandates, confirmation, receipts, revocation |
| `references/jurisdictions/*.md` | UK, EU, US, India, Brazil, Singapore and Southeast Asia, Australia, other regions |
| `references/case-studies.md` | What Wise, Monzo, Apple, Google Pay/Tez, PhonePe, Cash App, Venmo, Revolut, Nubank, Klarna, Robinhood, M-Pesa, CRED, Stripe, Square, Plaid, Mercury, Ramp and others did, and the rule each teaches |

## The rules that matter most

Source types: **[REG]** law, standard or scheme rule · **[RES]** published research · **[PRAC]** documented company practice · **[INF]** criticalUX synthesis.

1. **The total is the most prominent number.** Fees are named and itemised, any FX markup is stated, and "no fee" never stands alone. [REG/PRAC]
2. **Verify the payee when it is added,** not at the end of a rushed flow, and give each verification result its own colour, icon, copy and primary action. On "no match" the primary button is "Go back". [REG/INF]
3. **Confirmations restate the object and the consequence:** "Send £2,400 to J. Smith, account ending 4421. You can't cancel this." Never "Are you sure?" [INF]
4. **Friction goes where risk is.** Risk-targeted screening plus prominent safe actions cut scam payments by 18 percentage points in a 9k-person experiment; generic text warnings cut them by 4 [RES]. Do not pause every payment.
5. **Safe actions are as prominent as the risky one.** "Cancel", "Call my bank", "Save for later" are real buttons, not links. [RES]
6. **Never tell a payer their card was flagged as fraud, lost or stolen.** Show a generic decline with a next step. [PRAC]
7. **Unknown outcome is a state:** "Checking whether your payment went through. Don't pay again yet." [INF]
8. **Consent is separate, specific and off by default.** No pre-ticked boxes, no bundled "I agree", no "Not now" as the only way to say no. [REG]
9. **Credit never looks like the default way to pay.** BNPL and overdrafts are offered, not pre-selected; APR and total repayable sit on the offer screen. [REG/RES]
10. **Cancelling is as easy as signing up,** in the same channel. [REG]
11. **Protective actions are instant and reversible** (freeze card, kill switch, money lock); destructive ones (close account, cancel card) are deliberate. [PRAC]
12. **Name who you are and who holds the money.** Embedded and B2B2C flows never imply the fintech is the bank. [REG]
13. **Agents act within a mandate the person can see and revoke in one tap,** and every receipt names the agent. [INF]
14. **Design for the weakest channel you serve.** Read back before money moves on USSD, voice and kiosks. [PRAC]

## Before you hand over, check

- [ ] Rail and jurisdictions named; the matching jurisdiction rules applied or the gap stated
- [ ] Total most prominent; fees itemised; FX rate labelled (mid-market or with markup)
- [ ] Payee verification at add time with all result states designed
- [ ] Review screen restates amount, payee, account, timing, reversibility
- [ ] Risk-based friction only; safe actions are buttons
- [ ] Decline copy grouped by user action; no fraud wording
- [ ] Double-submit protection and an "unknown result" state
- [ ] Consent separate, unticked, revocable; cancellation symmetric
- [ ] Credit offers show APR and total repayable; never pre-selected
- [ ] Dispute and scam-report entry from the transaction itself, with the clock shown
- [ ] Every channel the product uses has its own states (POS, USSD, notifications, voice)
- [ ] Regulatory claims checked against the linked primary source before shipping

This skill is design guidance, not legal advice. Confirm rules with your compliance team for each market.
