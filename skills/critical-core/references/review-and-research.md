# Review and research

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Audit procedure

1. **Context.** Domain, market(s), users and their constraints, channels, automation level, critical tasks. If unknown, infer and state the assumption.
2. **Look at the real thing**: screenshots at real size, a running build, or the code. For automotive, at viewing distance; for kiosks, standing.
3. **Walk the checklists** in each loaded skill (critical-core and the domain skills).
4. **Run the dark-pattern sweep**: the union of India's CCPA 13 and RBI 11, the EU DFA blacklist and DSA Art. 25, US enforcement precedents (money-flows/disclosure-and-ethics). RBI requires banks to user-test interfaces and audit them regularly [REG, IN].
5. **Write findings** with the template below.
6. **Prioritise**:
   - **Critical**: could cause financial loss, injury, legal breach, or locks out a group of users (accessibility floor).
   - **Major**: wrong pattern, missing state, misleading hierarchy, habituating friction.
   - **Minor**: polish, tone, spacing.
7. **Close** with what to keep and the three fixes that matter most.

## 2. Finding template

```
### [Critical | Major | Minor] Short title
Where: <screen / element / file:line>
Rule: <one line> — <source link> [REG|STD|RES|PRAC|INF]
Harm: <what could go wrong, for whom>
Fix: <specific change, with values or copy>
```

No finding without evidence. No generic advice.

## 3. Comprehension testing

- The FCA calls out treating no complaints as proof of understanding as poor practice; test comprehension directly [REG, UK].
- Ask people to answer the question the screen exists for ("How much will you pay in total?", "When will the money arrive?", "Is this safe to send?") without hints. Score correct answers, not preference.
- Include low-literacy users, older adults, non-native speakers and disabled people.

## 4. Experiments with guardrails

Monzo's practice [PRAC] ([Monzo experiments](https://monzo.com/blog/2022/05/24/pellets-not-cannonballs-how-we-experiment-at-monzo)):

- Small, frequent tests ("pellets, not cannonballs"); mostly 50/50 A/B with a long-term holdout.
- A hypothesis template; each experiment names a **primary, a secondary and a guardrail metric**.

For high-stakes changes, guardrails include: fraud and scam losses, legitimate completion rate (the Akesson study's −7 pp shows friction costs), complaints, errors and reversals, debt or missed payments, accessibility regressions, and support contacts. A win on conversion that worsens a guardrail is not a win.

## 5. Validation for safety-critical UI

- FDA: formative evaluations during development; validation with the final UI, representative users and all critical tasks, **at least 15 participants per distinct user population**; debrief to find root causes [REG].
- NIST EHR protocol: application analysis → expert review → validation testing [REG].
- Automotive: occlusion and eye-tracking against glance budgets, and a physical-control baseline (automotive-hmi).

## 6. Research methods worth borrowing

- **Co-creation and physical prototyping**: Nubank designed its card with customers, physical prototypes and interviews; its principles include "Start early" and "Co-create" [PRAC] ([Nubank](https://building.nu.com/design-principles-at-nubank/)).
- **Everyone does research**: Monzo trains non-researchers and runs research clinics [PRAC].
- **Observe real use**: VW uses in-car cameras and customer clinics to see what drivers actually do [PRAC].
- **Context visits** for low-connectivity and low-literacy users (Google Pay India tested with audio-only users) [PRAC].
- **Transition scaffolding** after redesigns: PhonePe kept core money actions in place and used release notes, interstitials and onboarding animation [PRAC] ([PhonePe Design](https://design.phonepe.com/stories/behind-phonepe-redesign)).
