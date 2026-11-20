# Disputes, scams and recovery

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Start from the transaction

People find a problem by looking at a payment. "I don't recognise this" and "Report a problem" live on the transaction detail, not only in help. [INF]

## 2. Give context, not a quiz

Monzo's 2025–26 disputes redesign [PRAC, company-reported with control group] ([Monzo blog](https://monzo.com/blog/more-than-money-back-reimagining-payment-disputes-at-monzo)):

- A **context panel** first: merchant history, how the payment was authenticated, and plain explanations of delayed payments and subscriptions.
- A **cool-off** step suggesting contacting the merchant first where that is faster.
- **Routing by what happened** (didn't recognise it, didn't receive it, charged twice, cancelled subscription, scam).
- **Validation** blocking claims on declined payments.
- An evidence check that flags only clearly irrelevant uploads, with user override.
- In-app requests that say **what is needed and why**; uploads attach to the case.

Results: dispute reports fell by about half; rejected disputes fell from about 70% to about 50%; back-office effort fell about 25%.

## 3. Show the clock

Where regulation sets timelines, show them [REG + INF]:

| Market | Rule | UI |
|---|---|---|
| US, electronic transfers (Reg E §1005.11) | Customer has 60 days after the statement. Institution investigates within 10 business days, reports within 3 business days after, corrects within 1 business day; may take 45 days only with provisional credit within 10 business days, notified within 2 business days; 20/90 days for new accounts, POS debit and out-of-state cases ([LII](https://www.law.cornell.edu/cfr/text/12/1005.11)) | "We'll update you by 26 Nov." If extended: show the provisional credit and its date. |
| UK, APP scams (PSR, since 7 Oct 2024) | Reimbursement up to £85,000 within 5 business days (35 if the clock is paused); optional excess up to £100 ([PSR](https://www.psr.org.uk/information-for-consumers/app-fraud-reimbursement-protections)) | Tell victims what they can expect and when. |
| Brazil, Pix (MED) | Self-service in-app dispute button for fraud, scams and coercion, mandatory from Oct 2025; receiving banks can hold a suspicious incoming Pix for up to 72 h [REG, secondary sources] | Dispute button inside the Pix transaction detail. |
| Australia (Scams Prevention Framework, from 1 Jul 2026) | Scam reports accepted 24/7 and acknowledged within 24 h ([Ashurst](https://www.ashurst.com/en/insights/operationalising-the-spf)) | Acknowledgement with case reference. |
| Nigeria (CBN draft, Nov 2025) | Acknowledge within 24 h with a case reference; investigate in 14 working days [REG, draft] | Same pattern. |

## 4. Case status

Every case shows [INF]: reference number, what was reported, the current state, **who is acting now** (you / us / the merchant / the other bank), the next date, what we need from you, and provisional credit if any. States: reported → information needed → under review → provisional credit → resolved (won, lost, partially).

## 5. Scam reporting and the first minutes

- One tap from the payment: "I've been scammed". The next screen freezes the card or account if the person wants, and offers a call. [INF]
- **Kill switch**: Singapore requires a 24/7 self-service kill switch that blocks the account [REG, SG]. Make it findable from login (without full access) and from the security centre.
- **Money lock**: Singapore banks offer locking funds so they can't be moved digitally [PRAC, SG, headline-level source].
- Tone: no blame. The UK Financial Abuse Code commits signatories to not making victims retell their story [PRAC, UK] ([UK Finance](https://www.ukfinance.org.uk/news-and-insight/press-release/90-cent-mortgage-lending-now-covered-uk-finances-financial-abuse)). Say what you'll do and when. See critical-core, emotion.

## 6. Protective actions before destructive ones

- Nubank offers a **temporary block** before cancelling a card [PRAC] ([Nubank design principles](https://building.nu.com/design-principles-at-nubank/)).
- Freeze is one tap and instantly reversible; Monzo animates frost on the card to make the state unmistakable [PRAC] ([Monzo magic moments](https://monzo.com/blog/2022/11/04/how-we-design-magic-moments-at-monzo)).
- Cancelling or replacing a card says what will stop working (subscriptions, wallets) and offers to update them. [INF]

## 7. Self-set blocks

Monzo's gambling block: users chose strong commitments when offered (average self-chosen cooldown rose from 3 to 10 months; 41% chose the 12-month maximum), and a note to "future you" reappears on attempts to switch it off; it blocked £9M in 2024 [PRAC] ([GamCare](https://gamcare.org.uk/news-and-blog/news/monzo-block-9-million-in-gambling-transactions-in-2024-alone)). Pattern: instant to turn on, delayed to turn off, with the person's own words shown at the moment of temptation.
