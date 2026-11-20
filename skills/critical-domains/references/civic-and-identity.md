# Civic services and digital identity

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Service principles

**GOV.UK Service Standard** (14 points) [STD] ([GOV.UK](https://www.gov.uk/service-manual/service-standard)): understand users and their needs; solve a whole problem; joined-up experience across channels; make it simple; make sure everyone can use it; multidisciplinary team; agile; iterate; secure and private; define and publish success; right tools; open source; open standards and common patterns; operate reliably.

**USWDS principles** [STD] ([USWDS](https://designsystem.digital.gov/maturity-model/)): start with real user needs; earn trust ("every time"); embrace accessibility; promote continuity across services and devices; listen. They support the US 21st Century IDEA Act.

## 2. Question pages

GOV.UK [STD] ([question pages](https://design-system.service.gov.uk/patterns/question-pages/)):

- **One question per page** (start with one thing per page).
- The question is the page heading, via the label or legend.
- Mark optional fields "(optional)"; no asterisks.
- A back link, the heading, and a **"Continue"** button (not "Next"), left-aligned.
- Don't break browser back, except after one-time actions like payments.
- Test without a progress indicator first; if needed, "Question X of Y".
- Avoid range sliders (WCAG 2.5.1).
- Ask for information only once.

Also use (not fetched for this repo, widely documented): **error summary** at the top linking to each field; **check your answers** page before submission; **confirmation page** with a reference number and what happens next.

## 3. Plain language and inclusion

- Write for the reader's task, in short sentences, with the words they use. [INF]
- The EAA caps information complexity at CEFR B2 for EU banking services; a reasonable target for civic services too [REG by analogy].
- Assisted digital: every online service has a phone, in-person or helper route, and it is findable from the online one [INF; GOV.UK guidance not fetched].
- Accessibility mandates: Section 508 (US federal) and EN 301 549 (EU) reference WCAG; details not verified for this repo.
- Caroline Jarrett's forms work (relationship, conversation, appearance; question protocol) is foundational; not fetched for this repo.

## 4. Digital identity

- **NIST SP 800-63-4** [REG] ([NIST](https://pages.nist.gov/800-63-4/sp800-63.html)): AAL2 requires MFA with phishing-resistant options; AAL3 requires a public-key cryptographic authenticator; IAL3 needs an attended session and a biometric. Usability means effectiveness, efficiency and satisfaction tested with representative users. "Easy to do the right thing, hard to do the wrong thing, easy to recover."
- **EU Digital Identity Wallet** (Regulation 2024/1183) [REG] ([European Commission](https://ec.europa.eu/digital-building-blocks/sites/display/EUDIGITALIDENTITYWALLET/EU+Digital+Identity+Wallet+Home)): free for users; wallets by end of 2026; full control over what is disclosed; selective disclosure (age without birth date); local storage; a privacy dashboard of every transaction and requests to stop processing.
- **Consent screen spec**: India's Account Aggregator guidelines are the most complete public spec (purpose, data, recipients, durations, explicit grant, visible exit, receipt) [STD] (see money-flows/identity-and-access).

Rules [INF]:

1. Ask for the minimum attribute (a yes/no claim beats a raw value).
2. Before sharing, show who asks, what, why, and for how long.
3. Keep a log the person can read, with revoke.
4. Phishing-resistant authentication (passkeys) for high-assurance actions.
5. Offer an alternative to remote biometric proofing (in person, trusted referee) for people who can't use it.

Not verified: GOV.UK One Login and Login.gov flows; Aadhaar eKYC and masked Aadhaar patterns.
