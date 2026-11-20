# Visual language: calm, honest, beautiful

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. What reads as beautiful and trustworthy

Across 2026 sources the pattern is consistent [PRAC, agency and trend sources; indicative]:

- **Restraint in the core**: calm, flat, high-contrast primary content; one main action per screen; muted colour; readable type; clear hierarchy ([Digidop](https://www.digidop.com/blog/2026-design-trends-for-finance-websites)).
- **Boldness at the edges**: confident display type, one saturated accent, illustration or 3D card renders in marketing, onboarding and milestones.
- **Honesty you can see**: total cost first, real humans and a visible route to them, regulator marks in the flow, transparent performance figures, interactive simulators.
- Named failures: glassmorphism or neumorphism as the foundation (contrast failures), gamified investing, drip pricing, chatbot-only support ([Merge Rocks](https://merge.rocks/blog/fintech-ux-anti-trends-of-2026), statistics indicative only).

No rigorous study measuring which visual cues raise trust in finance apps was found. Treat aesthetic rules as practice, not proof.

## 2. Wise as the reference case

Wise's 2024 design system [PRAC] ([Wise Design](https://medium.com/transferwise-design/going-everywhere-meet-the-new-wise-design-system-863731563f71)):

- Principles: "Stand apart", "Clarity for everyone", "Local at global scale".
- Dropped "banky blue"; one bright signature colour.
- Inter (146 languages) for product UI; a custom display face for brand.
- Hundreds of icons redrawn as universal symbols.
- Colours tested against WCAG and APCA.

Lesson: beauty comes from a few decisive choices applied consistently, and from serving every language.

## 3. Colour

- Brand colour lives in acquisition, brand moments and the primary action. **Low-saturation surfaces** for fraud, disputes, debt, collections, closure and bereavement. [INF]
- Monzo's hot coral card drove recognition and word of mouth; the brand moved toward a "grown-up" register as it entered lending [PRAC] ([The Drum](https://www.thedrum.com/news/2019/09/06/charting-monzos-journey-coral-millennial-accessory-grown-up-bank)).
- **Colour alone no longer differentiates**: Nubank's 2026 rebrand agency noted "purple is everywhere in fintech" and carried identity through a proprietary typeface, motion and illustration [PRAC] ([Fast Company](https://www.fastcompany.com/91631436/purple-is-everywhere-in-fintech-nu-bank-redesign)).
- Status and money semantics come from tokens (money-data), never from brand colours.
- Dark themes suit long-session, dense screens (trading, operations); light suits retail banking and forms (practitioner heuristic) [PRAC].

## 4. Typography

- One family for product UI, with tabular figures and wide language coverage. Open (SIL OFL) options: **Inter, IBM Plex Sans, Source Sans 3, Noto Sans** (scripts), **Roboto Flex**.
- A display face only for brand moments; never for amounts, warnings or forms.
- Body text 16 px or more on mobile; inputs at least 16 px to avoid iOS zoom (Stripe recommends 16 px inputs on mobile [PRAC]).
- Do not ship proprietary brand faces (Wise Sans, Aeonik, Söhne and others) in open work.

## 5. Glass, depth and materials

- Glass belongs on **navigation and controls**, never behind money values, doses, warnings or forms. Apple's iOS 26 Wallet changes applied Liquid Glass to UI chrome, not card art [PRAC] ([Passcreator](https://www.passcreator.com/en/blog/apple-wallet-in-ios-26-what-you-need-to-know)).
- Check contrast against the brightest and darkest content that can pass beneath; honour Reduce Transparency.
- Elevation through borders first, soft shadows second; depth means something (a sheet is above a page).

## 6. Motion

- Motion explains state change: a card freezing, money moving along a timeline, a sheet arriving.
- Monzo's "magic moments" are sparing and tied to the person's wins [PRAC].
- No motion that looks like an alert unless it is one; no autoplay celebration on risky actions; respect Reduce Motion.
- Durations short (150–300 ms for UI), with no bounce on money values. [INF]

## 7. Illustration and imagery

- Illustration for empty states, onboarding and education; never for errors involving loss or risk.
- Real people in support and trust moments (who you'll talk to).
- Never photos of real public figures; never card-network or Apple marks except from official kits.

## 8. Style archetypes

Descriptive names, never brand names [INF]:

| Archetype | Use for | Traits |
|---|---|---|
| **Calm ledger** | Retail banking, insurance, government | Light, neutral greys, one accent, generous spacing, Inter-style sans |
| **Acid-accent neobank** | Consumer fintech acquisition | Bold display type, one vivid accent, 3D card art at the edges, calm core |
| **Night desk** | Trading, operations, monitoring | Dark neutral surfaces, dense grids, tabular figures, colour only for status |
| **Clinical clear** | Health, patient portals | White, high contrast, large type, icon arrays, no decorative colour |
| **Grey-is-good console** | Control rooms, fleets | ISA-101 greys, colour only for alarms, persistent overview |
| **Premium tactile** | Wealth, premium cards | Muted dark palette, refined serif or grotesk display, restrained motion |

## 9. Open design systems you can learn from

Licences verified on GitHub (Nov 2026):

| System | Licence | Notes |
|---|---|---|
| JPMorgan **Salt** | Apache-2.0 | Themes, densities, analytical-dashboard pattern ([GitHub](https://github.com/jpmorganchase/salt-ds)) |
| Coinbase **CDS** | Apache-2.0 (per LICENSE file; GitHub label says "Other") | Charts with a documented Scrubber ([LICENSE](https://raw.githubusercontent.com/coinbase/cds/master/LICENSE)) |
| CRED **NeoPOP** | Apache-2.0 | Web, Android, iOS, Flutter ([GitHub](https://github.com/CRED-CLUB/neopop-web)) |
| Razorpay **Blade** | MIT | ([GitHub](https://github.com/razorpay/blade)) |
| IBM **Carbon** | Apache-2.0 (widely known; not re-verified) | Data-viz palettes and accessibility patterns |

Documentation-only references (cite, don't copy): Goldman Sachs design system colour tokens, Stripe Apps UI components, Wise design site. Apache-2.0 code or tokens you adapt need attribution and a NOTICE file.
