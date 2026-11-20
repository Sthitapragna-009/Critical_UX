---
name: critical-core
description: Core human-factors rules for any interface where mistakes are expensive, plus routing to the domain skills. Covers the risk-control hierarchy (design out, guard, inform), confirmations that don't habituate, friction and warnings backed by evidence, undo and reversibility, alert tiering and budgets, mode and status visibility, failing visibly, trust in automation and AI, emotion design (anxiety, tone of voice, bad news, celebration, nudges, vulnerability), inclusion and accessibility (WCAG 2.2, European Accessibility Act, low literacy, low-end devices), visual language for calm, trustworthy, beautiful products, and an audit procedure. Use first for any fintech, payments, banking, insurance, healthcare, government, identity, automotive, operations or AI-agent interface, and when reviewing one ("is this safe?", "audit this flow", "make this feel trustworthy", "how much friction is right?").
---

# critical-core

**criticalUX** is a suite of five skills for interfaces where a slip costs money, health, safety or rights. This one holds the rules every domain shares and tells you which other skill to load.

## Route first

| If the work involves… | Also load |
|---|---|
| Showing money, balances, charts, statuses, records, dashboards | **money-data** |
| Moving money, onboarding, KYC, consent, credit, checkout, B2B approvals, regulation by country, agent payments | **money-flows** |
| Cars, motorcycles, scooters, clusters, infotainment, ADAS, EV | **automotive-hmi** |
| Healthcare, government services, identity, control rooms, fleet operations | **critical-domains** |

Most real products need two or three skills together.

## How to use this skill

1. **List the critical tasks**: the ones that, done wrong, cause harm. Rate each by **severity**, not likelihood.
2. **Apply the hierarchy** in `references/risk-and-confirmation.md` to each: can the error be designed out? If not, guard it; inform last.
3. **Budget interruptions** with `references/alerts-and-status.md`.
4. **Set the emotional register** with `references/emotion-and-voice.md`.
5. **Check the inclusion floor** with `references/inclusion-and-accessibility.md`.
6. **Design the look** with `references/visual-language.md`; tokens live in `/tokens`.
7. **If automation or AI is involved,** apply `references/automation-and-ai-trust.md`.
8. **Audit and test** with `references/review-and-research.md` before calling it done.

| Reference | Load it for |
|---|---|
| `references/risk-and-confirmation.md` | Hierarchy of controls, NIST use-error causes, confirmation patterns, friction evidence, undo, delays, type-to-confirm |
| `references/alerts-and-status.md` | Alert tiers and budgets, habituation, polymorphic warnings, notifications, mode and status visibility, failing visibly |
| `references/emotion-and-voice.md` | Money anxiety, tone dial, bad news, celebration policy, nudges and their ethics, vulnerability, abuse, gambling |
| `references/inclusion-and-accessibility.md` | WCAG 2.2 AA, EAA, reading level, numeracy, older adults, low-end devices, audio-only, languages, time limits, tactile controls |
| `references/visual-language.md` | What makes high-stakes products beautiful and trusted, style archetypes, type, colour, motion, glass, illustration, open design systems |
| `references/automation-and-ai-trust.md` | Trust calibration, confidence display, AI assistants and agents, human handoff |
| `references/review-and-research.md` | Audit procedure and finding template, comprehension testing, experiments with guardrails, validation |

## The twelve core rules

Source types: **[REG]** law or standard · **[STD]** platform or industry guideline · **[RES]** published research · **[PRAC]** documented practice · **[INF]** criticalUX synthesis.

1. **Design the hazard out, then guard it, then inform.** A confirmation dialog is the second-weakest control; help text is the weakest [REG] (FDA, ISO 14971).
2. **Severity decides,** because the probability of a use error is hard to know [REG] (FDA).
3. **Easy to do right, hard to do wrong, easy to recover** [REG] (NIST SP 800-63-4).
4. **Confirm the specific object and consequence,** never "Are you sure?" [INF].
5. **Friction only where risk is,** with the safe action as the prominent button. Risk-targeted friction with safe buttons cut scam payments 18 points; text warnings cut them 4 [RES].
6. **Warnings that repeat must change form,** or people stop seeing them [RES].
7. **Interruptions are scarce.** Tier by severity; budget them; delete the trivial ones [RES/STD].
8. **Quiet when normal, loud when not.** Colour and motion mean attention [STD].
9. **Mode, environment and who is in control are always visible** [REG/PRAC].
10. **Fail visibly,** never degrade silently; show the last known value and its age [RES].
11. **Calm by default; celebrate only the person's own wins,** never risk-taking, spending or borrowing [REG/PRAC].
12. **Design for the most constrained user and channel you serve:** low literacy, low vision, old phones, no data, stress [REG/PRAC].

## Output expectations

When you design or build with criticalUX:

- Show every state (loading, empty, pending, success, failure, unknown, blocked, degraded), not just the happy path.
- Label any rule you relied on that is an inference, and any regulation you applied, with its market.
- When something important is unknown (market, rail, user group, automation level), state the assumption you made at the top.

This suite is design guidance, not legal, medical or engineering certification advice.
