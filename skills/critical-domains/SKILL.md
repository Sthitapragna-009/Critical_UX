---
name: critical-domains
description: Design interfaces for healthcare, government and identity services, and safety-critical operations, where use errors harm people. Covers medication and dose notation (ISMP), EHR use-error root causes (NIST IR 7804), clinical alert fatigue and tiering, FDA/IEC 62366-1 human-factors validation, patient risk communication (icon arrays, health literacy), GOV.UK and USWDS service patterns, question pages, digital identity and selective disclosure (NIST 800-63-4, EU Digital Identity Wallet), plain language and assisted digital, control rooms and fleet monitoring (ISA-101 grey HMIs, ISA-18.2 alarm budgets, Airbus dark cockpit, situation awareness), and AI decision support in these settings. Use whenever you design, critique or prototype a clinical app, patient portal, EHR screen, medical device UI, government form or service, identity/login flow, SCADA or control-room display, dispatch or fleet dashboard, or autonomous-vehicle operations console.
---

# critical-domains

Medicine, government and operations rooms wrote down most of what high-stakes design knows, usually after people were hurt. This skill packages their rules. **critical-core** holds the shared principles (risk hierarchy, alerts, confirmations, automation); this skill holds what is specific to each domain.

## How to use this skill

1. **Name the domain and the critical tasks:** tasks that, done wrong or skipped, could cause serious harm (FDA's definition). List them before designing screens.
2. **Load the domain reference** and apply its rules to every critical task.
3. **Apply the eight use-error root causes** (below) as a review checklist; they work outside healthcare too.
4. **Validate** with representative users on realistic tasks (FDA expects at least 15 per distinct user group for medical devices).

| Reference | Load it for |
|---|---|
| `references/clinical.md` | Dose and unit notation, patient identification, EHR use errors, alert tiering, FDA/IEC 62366-1 process, patient-facing results and risk communication, Tall Man lettering |
| `references/civic-and-identity.md` | GOV.UK Service Standard and patterns, USWDS principles, question pages, plain language, assisted digital, digital identity, selective disclosure, consent |
| `references/operations-and-control-rooms.md` | ISA-101 grey HMIs, alarm budgets and floods, Airbus dark cockpit and golden rules, situation awareness, fleet and autonomous-vehicle operations, degraded modes |

## The eight root causes of use error

From NIST's EHR Usability Protocol [REG] ([NIST IR 7804](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7804.pdf)). Check every critical task against each:

| Cause | Healthcare example (NIST) | Elsewhere |
|---|---|---|
| Identification | Wrong-limb surgery; patient ID not visible | Wrong payee, wrong vehicle, wrong citizen record |
| Mode | Weight-based dosing mode picked instead of direct dosing: 100-fold overdose | Test vs live, autopilot engaged or not |
| Data accuracy | Wrong value entered or displayed | Mistyped amount, stale sensor |
| Data availability | Information not on screen when needed | Hidden fees, alarm off-screen |
| Interpretation | Paediatric calculator in metric, display in imperial | Currency, units, red-up markets |
| Recall | Relying on memory instead of recognition | Remembering a reference code |
| Feedback | No feedback about automated actions | Silent auto-retries, agent actions |
| Data integrity | Data corrupted or overwritten | Sync conflicts, duplicate records |

## The rules that matter most

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]**.

1. **Design the hazard out first;** guards second; labels and training last [REG] (FDA, ISO 14971).
2. **Severity, not probability,** decides whether a use-related risk must be eliminated [REG] (FDA).
3. **The subject is always identified** on every screen that acts on them (patient, citizen, vehicle, account) [REG/INF].
4. **Modes and environments are unmistakable,** including test vs production [REG] (NIST).
5. **Quantities follow dose notation:** no trailing zeros, always a leading zero, units spelled out, never truncated [REG] (ISMP).
6. **Interrupt only for severe, specific, contextual alerts;** remove the rest [RES] (AHRQ).
7. **Quiet when normal:** grey or dark baseline, colour only for abnormal states [STD] (ISA-101, Airbus).
8. **Alarm budget:** about 1–2 new alarms per operator per 10 minutes; more than 10 in 10 minutes is a flood [STD].
9. **One question per page** for anything hard; "Continue", a back link, "(optional)" instead of asterisks [STD] (GOV.UK).
10. **Risks as icon arrays and plain words, with the same denominator,** not percentages alone [RES].
11. **Share the minimum identity data,** say who asks for what and why, keep a disclosure log [REG] (EU wallet).
12. **Fail visibly** and always show what automation is handling [RES] (Bainbridge).
13. **Validate with real users on critical tasks;** at least 15 per user group for medical devices [REG].

## Before you hand over, check

- [ ] Critical tasks listed with the harm each could cause
- [ ] All eight use-error causes reviewed for each critical task
- [ ] Subject identity and mode/environment persistent on every relevant screen
- [ ] Quantities and units follow the notation rules; nothing truncates
- [ ] Alerts tiered by severity; only the top tier interrupts; an alert budget exists
- [ ] Normal state is quiet; colour means attention
- [ ] Forms: one thing per page where hard, error summary, check answers, confirmation
- [ ] Risk shown with words, frequencies and icon arrays; tested with low-literacy users
- [ ] Identity flows minimise disclosure and log it
- [ ] Degraded and offline states designed; failures are loud
- [ ] Validation plan with representative users per group
