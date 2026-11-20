# criticalUX — UX for interfaces where mistakes are expensive.

**Human-factors and fintech design rules, as Claude skills, for products where a slip costs money, health, safety or rights.**

criticalUX gives Claude working knowledge of how to design payments, banking, lending, checkout, B2B finance, car and two-wheeler dashboards, clinical tools, government services, identity flows and control rooms so that people get them right the first time. Every rule carries a source link and a tag saying what kind of evidence backs it.

Use it to design screens and flows, build prototypes, write the copy for bad news and warnings, pick the right chart, set up approvals, check a design against regulations in each market, and audit work before it ships.

## What's inside

| Skill | Use it for |
|---|---|
| `critical-core` | Start here. Risk-control hierarchy, confirmations that don't habituate, evidence-backed friction, undo, alert tiers and budgets, mode and status visibility, failing visibly, emotion and tone of voice, celebration and nudge ethics, vulnerability, inclusion (WCAG 2.2, European Accessibility Act), visual language, AI trust, audit procedure |
| `money-data` | Currency formatting, tabular figures, masking, gain/loss colour by market (red-up in China, Japan, Taiwan), chart chooser, honest axes, fan charts for projections, accessible scrubbing, payment and transfer status, records, statements, B2B dashboards and data grids |
| `money-flows` | Amount entry, FX and fee quotes, payee verification (UK CoP, EU VoP, Australia), review screens, scam warnings, decline copy, disputes, KYC, passkeys, SCA/3DS, consent, credit and BNPL disclosure, a unified dark-pattern catalogue, B2B/B2C/B2B2C/D2C models, POS, ATMs, QR, USSD, wallets, notifications, AI-agent payments, rules for the UK, EU, US, India, Brazil, Singapore, Australia and more, and a case-study library (Wise, Monzo, Apple Card, Google Pay/Tez, PhonePe, Stripe, Nubank, Robinhood, M-Pesa…) |
| `automotive-hmi` | Glance budgets (2 s / 12 s), lockouts, display angles, Euro NCAP 2026 physical controls, Android for Cars limits, clusters, tell-tales, HUDs, voice and LLM assistants, ADAS and automation (R171, R157, IIHS), mode display, escalation, takeover, EV, OTA, motorcycle and scooter dashboards, OEM case studies |
| `critical-domains` | Healthcare (dose notation, EHR use errors, alert fatigue, FDA/IEC 62366-1 validation, risk communication), civic services (GOV.UK, USWDS, question pages), digital identity (NIST 800-63-4, EU wallet), control rooms and fleet operations (ISA-101, alarm budgets, dark cockpit, situation awareness) |

Plus:

- `tokens/` — original, contrast-checked semantic tokens (JSON + CSS): money values, status, calm surfaces, light and dark themes, red-up and colour-blind market modes, privacy mode
- `scripts/check-contrast.mjs` — verifies every token pair against WCAG

### How the rules are tagged

| Tag | Meaning |
|---|---|
| `[REG]` | Law, regulation or formal standard |
| `[STD]` | Platform or industry guideline, rating protocol |
| `[RES]` | Published research |
| `[PRAC]` | Documented company practice |
| `[INF]` | criticalUX inference from the sources |

## Install

### Claude Code

```bash
/plugin marketplace add Sthitapragna-009/Critical_UX
```

```bash
/plugin install critical-ux@criticalux
```

Then ask: *"Design a send-money flow for a UK and EU neobank"*, *"Audit this checkout for dark patterns in India"*, *"Design the ADAS takeover UI for an L2 car"*, *"Which chart should show a retirement projection?"*, *"Write the copy for a declined card payment"*.

### Claude.ai or the desktop app

Zip any folder under `skills/` (for example `skills/money-flows`) and upload it in **Settings → Capabilities → Skills**. Upload `critical-core` too; the others lean on it.

## The rules criticalUX enforces

1. Design the hazard out, then guard it, then inform. Warnings are the second-weakest control.
2. Confirm the specific object and consequence, never "Are you sure?".
3. Friction only where risk is, with the safe action as the prominent button.
4. Interruptions are scarce: tier them, budget them, vary repeated warnings.
5. Quiet when normal; colour means attention.
6. Mode, environment and who is in control are always visible. Fail visibly.
7. The total is the most prominent number. Fees are named. Nothing is pre-ticked.
8. Calm by default; celebrate only the person's own wins.
9. Design for the most constrained user and channel you serve.
10. Every rule has a source, a tag and, where it changes, a date.

## Use the tokens

```html
<link rel="stylesheet" href="tokens/criticalux.css">
<body data-theme="dark" data-market="red-up">
  <p class="cx-amount">¥12,480</p>
  <p class="cx-num cx-delta--up">+¥320 (+2.6%) today</p>
  <span class="cx-status cx-status--pending">◐ Pending</span>
</body>
```

```bash
node scripts/check-contrast.mjs
```

## Research behind it

The skills come from two deep-research passes (November 2026) covering 30+ regulators and standards bodies, peer-reviewed studies on scam warnings, habituation, forecasts and risk communication, and the published design work of more than 25 fintech and automotive companies. Gaps are listed honestly at the end of each reference file; see [CONTRIBUTING.md](CONTRIBUTING.md) for the most wanted.

Related: [liqUI9](https://github.com/Sthitapragna-009/liqUI9), Liquid Glass and Apple HIG as Claude skills.

## Credits and licence

Created by **[KSP](https://kspportfolio-one.vercel.app)**.

- Code (`tokens/`, `scripts/`, code samples): [MIT](LICENSE)
- Written guidance (skills, references, docs): [CC BY 4.0](LICENSE-docs)

criticalUX is an independent community project and design guidance, not legal, medical or engineering advice. It summarises and links to regulations, standards and company publications in its own words. See [NOTICE.md](NOTICE.md) for trademarks and third-party systems.
