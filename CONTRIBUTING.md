# Contributing to criticalUX

Thanks for helping designers build interfaces that don't hurt people.

## Ground rules

1. **Every rule needs a source and a tag.** Link the primary source where possible (the regulation, standard, study or company's own docs) and tag it: `[REG]` law or standard, `[STD]` platform or industry guideline, `[RES]` published research, `[PRAC]` documented company practice, `[INF]` criticalUX inference. Secondary summaries are fine when the primary isn't reachable; say so.
2. **Paraphrase, never paste.** Write rules in your own words. Keep published numbers (thresholds, dates, sizes). Quotations only where the exact wording matters, and short.
3. **Date everything that can change.** Regulations get "applies from" dates and the market they apply to. Drafts and proposals are labelled as such.
4. **Mark what you didn't verify.** If you're relying on memory or a paywalled standard you couldn't read, say "not verified". It's better than a confident wrong rule.
5. **No brand assets.** No logos, proprietary fonts, brand palettes, screenshots of apps, or card-network marks. Name styles descriptively.
6. **Accessibility is the floor.** Token changes must pass `node scripts/check-contrast.mjs`.

## Where things go

| Change | Location |
|---|---|
| Cross-domain principle (risk, alerts, emotion, inclusion, visual, AI, review) | `skills/critical-core/references/` |
| How money looks (numbers, charts, status, records, dashboards) | `skills/money-data/references/` |
| How money moves (payments, KYC, disclosure, channels, business models, agents, case studies) | `skills/money-flows/references/` |
| A country or region's rules | `skills/money-flows/references/jurisdictions/<market>.md` |
| Cars, two-wheelers, ADAS, EV | `skills/automotive-hmi/references/` |
| Healthcare, civic and identity, control rooms | `skills/critical-domains/references/` |
| Colours, type, spacing | `tokens/` |

Keep each `SKILL.md` short: the most important rules and a routing table. Detail belongs in references.

## Most wanted

The research gaps are listed at the end of each reference file. The biggest:

- Primary NPCI UPI screen rules, Aadhaar eKYC and video KYC, Pix MED and Open Finance Brasil journeys
- SGQR, PayNow, QRIS, PromptPay; right-to-left finance conventions; African mobile money beyond M-Pesa
- Studies on undo windows, slide-to-pay, balance hiding, round-ups and visual trust cues
- Two-wheeler glance research, HUDs, EV charging UX, in-car voice workload
- ISA-18.2, ISO 15005/15008/16951/2575 and SAE J3016 details from the standards themselves

## Pull requests

Describe what changed, link the sources you used, and say which claims you verified against a primary source.
