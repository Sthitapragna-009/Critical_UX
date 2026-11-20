# Agent-initiated payments

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

AI agents that buy things on someone's behalf now have payment infrastructure, but no settled confirmation UX. This file proposes one. Treat it as a reference design, not a standard.

## 1. What exists (as of Nov 2026)

- **Visa Intelligent Commerce** and **Mastercard Agent Pay** (April 2025): tokenised credentials for agents, with user-set limits and conditions [PRAC] ([Digital Commerce 360](https://www.digitalcommerce360.com/2025/05/06/visa-mastercard-ai-agentic-commerce/)). Mastercard reported its first agentic transaction in Q3 2025.
- **Stripe and OpenAI Instant Checkout** and the Agentic Commerce Protocol (29 Sep 2025): a Shared Payment Token **scoped to one merchant and one cart total** [PRAC] ([Stripe newsroom](https://stripe.com/newsroom/news/stripe-openai-instant-checkout)).
- In 2026, Google's Universal Commerce Protocol (Jan) and Stripe's extension of shared tokens to Visa, Mastercard, Affirm and Klarna (Mar) [PRAC] ([Digital Commerce 360](https://www.digitalcommerce360.com/2026/04/02/visa-mastercard-in-agentic-commerce/)).
- Delegated human payments are a useful precedent: India's **UPI Circle** lets a primary user give a secondary user full delegation with a monthly cap, or partial delegation (pay but not set up autopay), monitor activity and revoke at any time [REG, IN] ([NPCI FAQ](https://npci.org.in/what-we-do/upi-circle/faqs)). Brazil's **Pix Automático** gives a mandate-management area to set caps and cancel [REG, BR].
- B2B: Stripe lists "Manage MCP and CLI access" as an admin permission [PRAC].

None of these sources describes how the buyer confirms a purchase.

## 2. Four surfaces every agent-payment product needs [INF]

### A. Mandate setup

```
Let "Trip Planner" pay for you
Can buy        Flights, hotels
Up to          £600 per purchase · £1,500 per month
Using          Visa •••• 4421
Until          31 Dec 2026
Asks you first Anything over £300 · any new merchant
[ Allow ]   Not now
```

- Agent identity, categories, per-purchase and period caps, payment method, expiry, and when it must ask.
- Defaults are narrow; widening is deliberate.
- Say **who set each limit**: the person, the issuer/network, or the AI host. People should never wonder which layer blocked a purchase.

### B. In-flow confirmation

- Confirm exactly the scoped merchant, items and total, with the same review-screen rules as a human payment (money-movement).
- Confirmation happens on a surface the person controls (their banking app, wallet or OS sheet), not only inside the agent's chat.
- Above the "asks you first" threshold, or for a new merchant, require authentication.

### C. Receipts that name the agent

- Transaction lists, push notifications and statements say "Paid by Trip Planner for you".
- Filter by agent; total spent per agent per period.

### D. One-tap revocation and agent-aware disputes

- Revoke from the transaction, the notification and a list of active mandates. Revocation is instant.
- Dispute reasons include "My agent bought the wrong thing" and "My agent wasn't allowed to buy this", routed differently from fraud.

## 3. Principles [INF, from critical-core]

- **Mode is always visible**: a clear signal when an agent, not the person, is acting.
- **Fail visibly**: when an agent hits a limit, it tells the person what it tried and why it stopped.
- **Trust is calibrated, not maximised**: show the agent's past accuracy where meaningful (Google PAIR guidance) and let people tighten limits after mistakes [PRAC] ([PAIR](https://pair.withgoogle.com/chapter/explainability-trust/)).
