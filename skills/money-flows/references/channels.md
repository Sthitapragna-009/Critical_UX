# Channels and touchpoints

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

Design for the weakest channel you serve, and give every channel its own states. A sections marked **not yet researched** state practice only.

## 1. Point of sale and Tap to Pay

Apple's Tap to Pay on iPhone guidance [PRAC] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone)):

- Settle the final amount, **including tips**, before the tap screen.
- Show an "Authorizing" state, then a clear approved or declined result.
- On failure, offer alternatives on the same screen (cash, hardware reader, payment link).
- Only admins accept the terms; merchants get a tutorial that includes accessible PIN entry.
- Use the exact label "Tap to Pay on iPhone" (or "Tap to Pay") for payment actions; never the Apple logo.

Square designed its reader so customers tap their own card, mediating "my space and your space" with minimal symbols and lights; Square Register has a separate customer-facing display and works offline [PRAC] ([Fast Company](https://www.fastcompany.com/3057852/the-design-challenge-behind-squares-new-reader)).

Rules [INF]: design the counter for two audiences (seller and customer) with the amount always visible to the customer; tip screens show amounts as well as percentages and include "No tip" as an equal option.

## 2. Wallets and payment sheets

Apple Pay [PRAC] ([Apple HIG, Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay), updated June 2026):

- Let the system payment sheet show progress; extra spinners confuse.
- "Pay [Business]" matches the name on the bank statement; intermediaries use "Pay [Merchant] (via [Platform])".
- Unknown final amounts (rides, tips) show a subtotal marked "Amount Pending".
- If the sheet is dismissed or times out, cancel any in-progress payment.
- Minimum button sizes: 100×30 pt for the Apple Pay mark button; 140×30 pt for Buy/Check Out variants. Never smaller than other payment buttons.
- On Apple Watch, authorisation is a double-click; there are no extra app rules for watchOS.

## 3. ATMs and kiosks

US ADA 2010 Standards §707 [REG, US] ([US Access Board](https://www.access-board.gov/ada/#ada-707)):

- Every operable part distinguishable by sound or touch without activating it.
- Speech output, repeatable and interruptible, with volume control; tones instead of speech for masked PIN entry.
- Same privacy for input and output for everyone.
- 12-key telephone keypad with a tactile **5**; tactile function symbols: Enter = raised circle, Clear = raised left arrow, Cancel = raised X, Add = +, Decrease = −.
- Screen visible from 40 in (1015 mm) above the floor space; sans-serif characters; Braille instructions for starting speech mode.

EU: the European Accessibility Act applies to ATMs and payment terminals from 28 Jun 2025, including extendable time limits [REG, EU]. EN 301 549 details were not verified for this repo.

## 4. QR payments

- China: payments to **static** merchant QR codes are capped at 500 yuan per consumer per day because printed codes can be swapped [REG, CN, secondary] ([NFC Times](https://nfctimes.com/news/china-cracks-down-static-qr-codes-regulations-take-effect-limit-risk)).
- Rules [INF]: after scanning, show the **payee name** (from the rail, not the QR text) and the amount before authentication; dynamic codes pre-fill the amount and it is not editable; static codes need the amount entered with the payee name visible; offer "Report this code" for mismatches.
- India's UPI ended person-to-person "collect requests" from 1 Oct 2025 to reduce fraud; merchant collect continues [REG, IN, secondary].
- EMVCo-based national QR standards (SGQR, PayNow, QRIS, PromptPay) **not yet researched**.

## 5. USSD and SMS

- USSD runs over 2G with short session timeouts and carried M-Pesa's $100B+ in 2024 [PRAC] ([All Things Distributed](https://allthingsdistributed.com/2025/10/what-is-ussd-and-who-cares.html)).
- M-Pesa's *334# menu shows a summary the customer confirms before money moves [PRAC] ([Dignited](https://www.dignited.com/69230/safaricom-m-pesa-334-ussd)).
- MicroSave field research: frequent services first in the menu, 4–5 steps per transaction, immediate confirmation messages [RES] ([MicroSave](https://www.microsave.net/designing-user-friendly-ussd-interface-for-digital-financial-services/)).
- Google Pay India (Tez) targeted 1 GB RAM phones, 8 Indian languages and used audio-based pairing because many phones lacked a usable camera [PRAC].

Rules [INF]: read back amount, name and fee before PIN; send an SMS receipt for every transaction; keep menu labels under the screen width of the oldest phones served; never rely on colour or icons.

## 6. Physical cards

- Mastercard Touch Card notches on the short side: **rounded = debit, squared = credit, triangular = prepaid** (current coding, Canada launch May 2025); co-designed with sight-loss organisations [PRAC] ([Mastercard 2025](https://www.mastercard.com/news/press/2025/may/mastercard-introduces-touch-card-by-mastercard-in-canada-a-tactile-notch-feature-designed-to-help-empower-the-sight-loss-community)).
- Numberless fronts (Apple Card) and numbers on the back (Nubank, after customers posted photos of new cards) reduce exposure [PRAC].
- Vertical card layouts match how cards are held at terminals [INF; not researched].
- Never reproduce card-network marks in mockups except from official artwork kits.

## 7. Notifications

Rules [INF, industry practice; primary research not found]:

- Real-time spend push: merchant (the statement name), amount, and remaining or "left to spend" figure. Neutral wording.
- Security alerts (new device, password change, large payment, new payee) include "This wasn't me", which freezes the card or account.
- Singapore requires real-time alerts for every outgoing payment and default transfer-alert thresholds of S$100 or lower [REG, SG].
- Lock-screen privacy: respect the hidden-balance setting; never show full balances or account numbers on the lock screen by default.
- Never include clickable links in security SMS or email (Singapore rule; good practice elsewhere) [REG, SG].
- "Tell us once": communication preferences apply across channels (FCA good practice) [REG, UK].
- Proactive insights are notifications: same restraint, tiering and opt-out (critical-core, alerts).

## 8. Voice, wearables, cars, kiosks: open areas

**Not yet researched** with primary sources: voice payment read-back, Wear OS payments, in-car payments, statement PDF accessibility (PDF/UA). Until then apply: read back amount and payee before confirming; require a second factor on the phone for new payees; show the transaction on a screen as soon as one is available.
