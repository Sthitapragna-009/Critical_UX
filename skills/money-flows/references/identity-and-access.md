# Identity, onboarding and access

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

NIST's identity guidance puts the goal in one line: make it easy to do the right thing, hard to do the wrong thing, and easy to recover when the wrong thing happens [REG] ([NIST SP 800-63-4](https://pages.nist.gov/800-63-4/sp800-63.html)).

## 1. Onboarding and KYC

Drop-off figures are widely quoted but mostly secondary: "up to 60%" abandonment of digital account opening is attributed to UserTesting via Markswebb [PRAC, secondary] ([Markswebb](https://markswebb.com/insights/ux-vs-kyc-why-60-abandon-onboarding/)). The named failure cases are more useful: a required address users didn't have; asking logged-in users to re-enter full credentials; forms that reset.

Pattern [INF unless marked]:

1. **"What you'll need" screen** before starting: ID type, about how long, good light, a quiet place.
2. **Step counter** ("Step 2 of 4"). GOV.UK suggests testing without a progress indicator first and using "Question X of Y" if needed [PRAC] ([GOV.UK question pages](https://design-system.service.gov.uk/patterns/question-pages/)).
3. **One thing per page** for anything hard (GOV.UK) [PRAC].
4. **Explain why** next to each sensitive field ("We're required by law to check your identity"), with the law named in a tooltip.
5. **Ask once.** Pre-fill from what you already know; never ask a logged-in user for credentials again in the same session.
6. **Autosave every step;** resume by deep link; defer non-essential data (employment, tax residency) until a feature needs it.
7. **Document capture** (industry practice): live camera with edge detection and auto-capture; check glare and blur on the spot; specific retry copy ("Move out of direct light"); never accept a blurry image to reject it hours later; keep a fallback (upload, branch, human).
8. **Outcomes**: approved, need more information (say exactly what and why), declined (say what they can do next, where the law allows).
9. **Minimum data** only: India's Digital Lending Directions require minimal data with explicit consent, granular revoke and delete, and ban storing biometrics unless law allows [REG, IN].

## 2. Signing in and stepping up

- **Passkeys first.** FIDO's Oct 2025 index: 93% passkey sign-in success vs 63% for other methods, 8.5 s average, 81% fewer login help-desk incidents [RES, industry index] ([Biometric Update](https://www.biometricupdate.com/202510/new-benchmarking-tool-shows-passkeys-boost-conversion-success-by-30)). Offer passkey enrolment right after a successful login; keep OTP as fallback.
- **NIST SP 800-63-4**: AAL3 requires a phishing-resistant, public-key authenticator [REG, US federal].
- **SCA in the EEA and UK.** Exemptions reduce challenges [REG + PRAC] ([Stripe, SCA exemptions](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions)):
  - Low value: under €30/£25, until €100/£85 cumulative or 5 transactions since the last SCA.
  - Transaction risk analysis: up to €100/€250/€500, depending on the provider's fraud rate.
  - Merchant-initiated: authenticate once when saving the card with a mandate; later off-session payments are exempt.
- **Frame 3-D Secure before it opens:** "Your bank may ask you to confirm this payment". Keep merchant and amount visible around the challenge. [INF]
- **Step-up only for risk:** new payee, large amount, changing contact details, viewing full card number.

## 3. New devices and account changes (cooling periods)

The strongest rules are Singapore's [REG, SG] ([MAS 2022](https://www.mas.gov.sg/news/media-releases/2022/mas-and-abs-announce-measures-to-bolster-the-security-of-digital-banking); [A&O Shearman on the SRF](https://www.aoshearman.com/en/insights/ao-shearman-on-fintech-and-digital-assets/combatting-payment-account-fraud-singapores-shared-responsibility-framework)):

- At least 12 hours before a new soft token works.
- A 12-hour block on high-risk actions (adding payees, changing contact details) after token activation or a new-device login.
- Notify the **old** phone number or email when contact details change.
- Real-time alerts for every outgoing payment; a 24/7 self-service kill switch.
- Holds on rapid account drains until the customer confirms (from 16 Jun 2025).

Brazil applies similar logic to Pix: reduced limits on new devices for at least 24 hours, and limit increases take 24 hours [REG, BR, secondary source].

Design rule [INF]: show the cooling period as a **countdown with the reason** ("For your security, you can add new payees from 21:40. This protects you if someone else got into your account"). Never hide it as an unexplained failure.

## 4. Sessions and timeouts

- Warn before a timeout, let people extend it, and keep form data after re-authentication. [INF]
- The European Accessibility Act requires extendable time limits on terminals [REG, EU].
- Exact PSD2 RTS inactivity limits were not verified for this repo.

## 5. Security centre

- Trusted devices with last-used time and place, "Sign out" per device. [INF]
- Card controls: freeze (instant, reversible, shown on the card art), online, contactless, ATM, gambling and region toggles; virtual and single-use cards show which merchant they're locked to. [PRAC/INF]
- "Is it really us?" signal for calls and messages: Monzo's Call Status [PRAC].
- Security messages never contain clickable links in SMS or email (Singapore rule since 2022; good practice elsewhere) [REG, SG].

## 6. Consent screens

Unified rules from India's RBI and CCPA, the EU and the Account Aggregator guidelines [REG]:

- **Separate consent per product.** No single "I agree" covering several things (RBI RBC Directions, effective 1 Jan 2027).
- **Defaults to No.** No pre-ticked boxes (RBI; EU CCD2 for ancillary services; EU DFA proposal).
- **Real yes/no choices.** India's CCPA lists "trick question" and requires a clear yes or no; "Not now" alone is not a decline.
- **Key facts before consent:** fees, interest, risks, lock-in, exit penalties.

The Account Aggregator (India) first consent screen is the most complete public spec for data-sharing consent [REG, IN] ([Sahamati CX guidelines](https://sahamati.gitbook.io/customer-experience-guidelines/consent-guidelines)). It must show purpose in plain words, which accounts and data types, date range, recipients, how long consent lasts, how long data is kept, one-time or recurring and how often, an explicit grant action, a visible exit, trust markers and a note that consent can be cancelled. After consent: success or failure, a data receipt, and where to manage consent. Use it as a template for any data-sharing consent (open banking, Plaid, Open Finance Brasil).

## 7. Selective disclosure and identity wallets

The EU Digital Identity Wallet (member states must offer one by end of 2026) sets the pattern [REG, EU] ([European Commission](https://ec.europa.eu/digital-building-blocks/sites/display/EUDIGITALIDENTITYWALLET/EU+Digital+Identity+Wallet+Home)):

- Share the minimum (prove "over 18" without the birth date).
- Store data on the device.
- A dashboard of every disclosure, with the option to ask providers to stop processing.

Design rule [INF]: every request names **who** is asking, **what** exactly, **why**, and **for how long**, and the default is the minimum.
