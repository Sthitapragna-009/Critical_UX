# Inclusion and accessibility

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

In high-stakes products, accessibility failures become safety failures: a person who can't read the warning, reach the button or hear the alarm is the person who gets hurt.

## 1. The floor

- **WCAG 2.2 AA** for every screen [REG in many markets]. Key checks: text contrast 4.5:1; non-text (icons, chart marks, input borders, focus) 3:1; no meaning by colour alone; target size at least 24×24 CSS px (2.2 AA); visible focus; keyboard access; text resize to 200%; reflow at 320 px; labels and names for controls; status messages announced; error identification and suggestions; no cognitive tests for login without alternatives (2.2).
- **European Accessibility Act** (applies from 28 Jun 2025) covers consumer banking, e-money, payment services, ATMs and payment terminals: perceivable, operable, understandable, robust; information complexity **at CEFR B2 or lower**; extendable time limits on terminals [REG, EU] ([Bird & Bird](https://cm.twobirds.com/en/insights/2025/european-accessibility-act-focus-on-financial-services)).
- **ADA §707** for ATMs and fare machines: repeatable, interruptible speech with volume control; tones for masked PIN entry; tactile keypad with a marked 5; tactile function symbols; privacy for all [REG, US] ([US Access Board](https://www.access-board.gov/ada/#ada-707)).
- Section 508 (US federal) and EN 301 549 (EU) reference WCAG; details not verified for this repo.

## 2. Literacy and numeracy

- More than 6 in 10 adults struggle with health content that includes numbers [RES] ([NHS service manual](https://service-manual.nhs.uk/content/health-literacy)).
- The FCA treats "capability" (financial literacy, digital skills) as a driver of vulnerability [REG, UK].

Rules [INF]:

- Words first, numbers with context: "£40 more than last month", not a bare delta.
- Frequencies and icon arrays for risk; the same denominator throughout.
- Test with low-literacy users; readability scores only to prioritise.
- One idea per sentence; one task per screen for hard steps (GOV.UK) [STD].

## 3. Devices, data and channels

- Google Pay India (Tez) designed for 1 GB RAM phones, eight languages and audio-based pairing at 80–90% accuracy because many cameras were poor, and tested with audio-only users [PRAC] ([Increment](https://increment.com/frontend/case-study-mobile-payments-in-india/)).
- USSD over 2G carries M-Pesa's $100B+ a year [PRAC].

Rules [INF]: performance budgets for low-end phones; works on slow and intermittent networks; SMS or voice fallbacks for critical flows; no feature that only works with a recent phone without an alternative.

## 4. Language and script

- Wise uses Inter for product UI because it covers 146 languages, with a custom display face for brand [PRAC] ([Wise Design](https://medium.com/transferwise-design/going-everywhere-meet-the-new-wise-design-system-863731563f71)).
- Design for text expansion (German, Finnish), right-to-left scripts (Arabic, Hebrew, Urdu), Indic scripts with tall marks, and CJK.
- Numbers in right-to-left layouts usually stay left-to-right; confirm per market (not verified) [INF].
- Every critical message is translated, not only marketing.

## 5. Age, cognition and stress

- Older adults: larger targets, slower timeouts, no gestures-only actions, clear focus, no reliance on memory. [INF]
- Stress narrows attention: under pressure people read less. Put the one action first, keep the safe action obvious, and avoid timers unless required. [INF]
- Timeouts: warn before, allow extension, keep entered data (WCAG 2.2.1) [REG].

## 6. Motor and sensory

- Every control usable by touch, keyboard, switch and voice; drag actions have single-pointer alternatives (WCAG 2.5.7) [REG].
- Tactile distinction for physical controls: Mastercard Touch Card notches (round debit, square credit, triangle prepaid) [PRAC]; car controls findable by feel [STD].
- Respect Reduce Motion, Increase Contrast, Reduce Transparency, larger text, bold text and colour filters at the OS level.

## 7. Testing

- Include disabled people, older adults, low-literacy users and non-native speakers in every round of research on critical tasks.
- Screen-reader walkthrough of every money-moving and safety flow.
- Grayscale and colour-blindness simulation of every status screen.
