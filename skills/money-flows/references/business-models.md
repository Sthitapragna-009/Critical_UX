# Business models: B2B, B2C, B2B2C, D2C

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

The same payment reaches different people through different products. Ask first: **who is the user, who is the customer, who holds the licence, and who takes the blame when it fails?**

## 1. B2B (spend management, AP/AR, treasury, payroll, merchant dashboards)

B2B products are permission systems first.

- **Named roles with explicit can/can't lists.** Stripe ships about 25 roles; multiple roles combine to the union of permissions; roles that can invite users are an attack vector [PRAC] ([Stripe roles](https://docs.stripe.com/get-started/account/teams/roles)).
- **Separate access administration from money movement.** Stripe's IAM Admin can manage users but cannot see balances, refund or pay out. Bulk export is its own permission. Admins also manage MCP and CLI access, so AI agents are permission subjects too [PRAC].
- **Channel-bound roles**: a Terminal Operator uses only the in-person app [PRAC].
- **Maker-checker**: exclude the payment creator from approving it; block submission when no other approver exists; policy changes need a second admin; changes apply going forward (Mercury) [PRAC] ([Mercury Help](https://support.mercury.com/hc/en-us/articles/45985054591508-Enforcing-separation-of-duties-for-per-payment-approvals)). SMB products often default this off for speed; make the trade-off explicit by segment. [INF]
- **Approvals by amount**: Ramp routes by amount (manager, then finance, then executives) and lets people request and approve in Slack, with a daily digest of large spend [PRAC] ([Ramp](https://ramp.com/blog/multistep-approvals-for-corporate-cards-reimbursements)).
- **Sandbox vs live** visibly different everywhere (money-data, dashboards).

Design rules [INF]:

- Treat the permission matrix as a design artifact; design the "You can't do this. Ask an Admin" state for every money control, naming who can.
- Approvals have three surfaces: policy, request, decision.
- Bulk payments: upload → validate every row with line-level errors → review totals by currency and payee count → approve → schedule. Never partially submit a file without saying which rows went.
- Dense dashboards for finance teams; reduced, task-focused interfaces for front-line staff and employees.
- Audit logs customers can see and export.

## 2. B2C (neobanks, wallets, investing, insurance)

- Daily-use loop: open → glance at money → act → leave. Home shows what people check most (balance, recent activity, upcoming bills) and the top actions. Revolut 10 consolidated "all your money" on one home with one-tap account switching after research asked to "make it easier to use" [PRAC] ([Revolut](https://www.revolut.com/blog/post/revolut-10/)).
- PhonePe's 2025 redesign kept core money actions at the top, moved the QR scanner into the one-handed thumb zone and used release notes and onboarding animation to ease the change, under the principle "familiarity leads to confidence" [PRAC, company-reported].
- **Assistants**: Bank of America's Erica (3B+ interactions, ~50M users) is built on a curated library of 700+ responses, delivers proactive insights and hands off to humans [PRAC] ([Financial IT](https://financialit.net/news/artificial-intelligence/decade-ai-innovation-bofas-virtual-assistant-erica-surpasses-3-billion)). Klarna's assistant took two-thirds of chats in its first month [PRAC, vendor launch snapshot]. Encode: bounded intents, visible handoff to a human, proactive insights governed like notifications. The EU PSR proposals include access to human support, not chatbot only [REG, EU, pending].

## 3. B2B2C and embedded finance

Ownership is split, so the design must be too.

- **Theme tokens, never structure.** Stripe Elements keeps layout fixed; hosts theme colours, fonts, radii and per-state rules through an allow-listed Appearance API with accessible on-colour variables; inputs at least 16 px on mobile [PRAC] ([Stripe Appearance API](https://docs.stripe.com/elements/appearance-api)).
- **The host owns the frame.** Plaid: conversion is highest when users are set up with the right expectations before Link opens. The host explains why, what the user gains, that data is secure, and what they'll need; Plaid owns the consent pane [PRAC] ([Plaid best practices](https://plaid.com/docs/link/best-practices/)).
- **Never imply the fintech is the bank.** Name the licensed bank or e-money institution that holds funds, in onboarding, account details and statements. US deposit-insurance signage rules apply to banks and their digital channels (disclosure-and-ethics) [REG].
- **Errors**: say who failed in words the user understands ("Your bank didn't respond"), and who to contact. [INF]
- **Consistency**: embedded flows match the host's type and colour, but money semantics (positive/negative, status colours, confirmation patterns) stay consistent with the provider's rules. [INF]

## 4. D2C commerce and checkout

- Baymard (Oct 2026): average cart abandonment **70.22%**. Leading causes: extra costs 40%, slow delivery 20%, didn't trust the site with card details 19%, forced account creation 18%, long or complicated checkout 17%. Average US checkout has 14.88 fields vs an ideal of 7–8; better checkout usability could lift conversion about 35% [RES] ([Baymard](https://baymard.com/lists/cart-abandonment-rate)).
- Payment methods ordered by device and locale (Stripe Payment Element) [PRAC]. Stripe reports 16% of shoppers abandoned when their preferred method was missing [PRAC, company-reported].
- Express wallets (Apple Pay, Google Pay, Shop Pay, PayPal) above the card form; the Apple Pay button must be no smaller than other payment buttons [PRAC] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/apple-pay)).
- Guest checkout by default; account creation after purchase. [RES, Baymard]
- Total with taxes and delivery shown before the payment step. [REG/RES]
- BNPL offered, never pre-selected (disclosure-and-ethics).
- Visually enclosing card fields raises perceived security (Baymard 2019, via a secondary source) [RES, secondary].

## 5. Choosing patterns by model

| Concern | B2B | B2C | B2B2C | D2C |
|---|---|---|---|---|
| Primary user | Finance staff, admins, employees | Individual | Host's customer | Shopper |
| Biggest risk | Wrong approval, insider misuse | Scams, avoidance, debt | Confused responsibility | Abandonment, surprise fees |
| Density | High, keyboard-first | Low, glanceable | Host-defined | Minimal |
| Confirmations | Four-eyes, audit | Payee checks, scam friction | Provider-owned | Payment sheet |
| Emotion | Calm, efficient | Calm, supportive | Host voice + provider clarity | Reassuring |
