# Risk, confirmation and friction

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. The hierarchy of controls

FDA human-factors guidance, aligned with ISO 14971 and (from Aug 2026) IEC 62366-1 [REG] ([Innolitics, FDA 2016](https://innolitics.com/articles/fda-guidance-applying-human-factors/); [Emergo by UL, 2026 update](https://www.emergobyul.com/news/fda-updates-landmark-human-factors-guidance-medical-devices)):

1. **Inherent safety by design.** Remove the error-prone option; make wrong connections impossible.
2. **Protective measures.** Interlocks, warnings, alerts, confirmations.
3. **Information for safety.** Labels, help text, training. Least effective: people may not recall or reach it.

Severity, not likelihood, decides whether a use-related risk must be eliminated. Test every control for new hazards.

Translations [INF]:

| Domain | Design out | Guard | Inform |
|---|---|---|---|
| Payments | Verify payee at entry; pre-fill from verified sources; block impossible amounts | Risk-based review and warnings | FAQ on scams |
| Healthcare | No trailing-zero formats; unit-locked inputs; barcode match | Interruptive alert for severe interactions | Training |
| Cars | Physical hazard switch; lock typing while moving | Escalating attention alerts | Owner's manual |
| B2B | Separate roles for access and money; creator can't approve own payment | Four-eyes approval | Policy docs |
| AI agents | Scoped mandates and caps | Confirmation above a threshold | Agent description |

## 2. Use-error root causes

NIST's eight categories (identification, mode, data accuracy, data availability, interpretation, recall, feedback, data integrity) work as a checklist in any domain [REG] ([NIST IR 7804](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7804.pdf)). See critical-domains for the full table with examples.

## 3. Confirmations that work

Rules [INF, built from the evidence below]:

- **Restate object and consequence**: "Delete 'Q3 payroll' (48 payments, £212,400)? This can't be undone." Never "Are you sure?".
- **Verb + object buttons**: "Delete payroll", "Send £2,400". Not "OK" / "Yes".
- **The safe choice is equally or more prominent** when risk is high.
- **Confirm only irreversible or high-severity actions.** Everything else gets undo.
- **Highest severity, rarest actions: type-to-confirm** (retype the amount, payee or name). In Bravo-Lillo et al. (SOUPS 2013), designs that required an action before proceeding made informed decisions 2–3× more likely; retyping was strongest (uninformed installs 51% → 8%) but slowest [RES] ([SOUPS 2013](https://microsoft.com/en-us/research/wp-content/uploads/2016/02/a6_Bravo-Lillo.pdf)).
- **Slide-to-confirm and hold-to-confirm are interaction style, not safety.** Swiping alone was not significant in one experiment; no controlled study of slide-to-pay was found [RES/INF].

## 4. Friction: how much, where

Akesson, Gathergood & Quispe-Torreblanca (2023), 8,958 UK adults, mobile-banking mock-up, baseline 22% paid a fraudster [RES] ([CeDEx DP 2023-08](https://www.nottingham.ac.uk/cedex/documents/papers/cedex-discussion-paper-2023-08.pdf)):

| Intervention | Fraud paid | Legitimate completed |
|---|---|---|
| Text warning | −4 pp (faded by third exposure) | −6 pp |
| Prominent safe-action buttons | −12 pp | −14 pp |
| Risk screening + safe buttons | **−18 pp (~81%)** | −7 pp |

**A warning is a layout of actions, not a paragraph.** Gate it on risk signals.

Positive friction is endorsed by regulators: the FCA lists short pauses and real-time warnings as good practice (Mar 2026) [REG, UK]. Regulated delays exist: 12 h after a new device in Singapore, 24 h on Pix limit increases and Saudi international transfers, at least 1 day cooling-off on Indian digital loans [REG]. Bravo-Lillo found a 10 s delay cut suspicious approvals (51% → 19%) but also blocked benign ones [RES].

Rules [INF]:

- Use delays only for high-risk events, show the end time and the reason, and let people do safe things meanwhile.
- Monzo deliberately slows borrowing and large payments ("good friction") while keeping everyday actions fast [PRAC] ([Monzo](https://monzo.com/blog/2022/11/04/how-we-design-magic-moments-at-monzo)).
- Measure friction's cost on legitimate users (the −7 pp above) as a guardrail metric.
- Less friction isn't free either: Monzo's simplified sign-up raised card activation but reduced feature and overdraft uptake [PRAC].

## 5. Undo and reversibility

- **Prefer undo to confirmation** for anything the system can actually reverse (archive, move, schedule, label). [INF]
- **Be honest about irreversibility**: say plainly when something can't be undone, once, near the action.
- **Offer reversible protective actions before destructive ones**: freeze before cancel, pause before delete, temporary block before closing (Nubank, Monzo) [PRAC].
- No published research on undo windows for payments was found; if you add a delayed-send window, state its length and show a countdown. [INF]

## 6. Recovery

- Errors say what happened, why (if known and safe to say), and what to do next, in the person's words.
- Keep everything the person entered.
- One path to a human for anything high-stakes. The EU PSR proposals include a right to human support, not chatbot only [REG, EU, pending].
