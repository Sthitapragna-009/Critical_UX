# UX laws for fintech

The well-known UX laws (Fitts, Hick, Miller, Jakob and the rest) come from psychology research, mostly on speed and ease. In money products, speed and ease aren't the goal. Getting it right is. This file says what each law actually claims, how it applies to payments, banking and investing, where criticalUX overrides it, and how people commonly misread it in audits.

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md). The laws themselves are research [RES]. Most fintech applications below are criticalUX inference [INF] unless tagged otherwise. Plain-language summaries of each law: [Laws of UX](https://lawsofux.com/).

## 1. Four rules for using UX laws on money

1. **A law is a prediction, not a verdict.** Write "Hick's law predicts slower choice with 22 tiles above the fold; we measured X; severity Y", never "Hick's law not followed". [INF]
2. **Speed laws yield to the hierarchy of controls.** If making a money action faster raises the chance of paying the wrong person or amount, safety wins (`risk-and-confirmation.md`). [INF]
3. **The same law can help or exploit.** Goal gradient, Zeigarnik, Von Restorff, anchoring and defaults all drive spending and borrowing as easily as saving. Check every use against the dark-pattern catalogue in money-flows `disclosure-and-ethics.md`. [INF]
4. **Measure, don't eyeball.** Target size in pt/dp, distance from the thumb, taps to finish, choices on screen, response time, contrast. "Buttons are clearly visible" is an opinion, not a Fitts's law finding. [INF]

## 2. Laws about acting

### Fitts's law

**Says:** the time to hit a target depends on its distance and size ([Fitts 1954](https://doi.org/10.1037/h0055392); [Laws of UX](https://lawsofux.com/fittss-law/)) [RES].

- Put the actions people use every day (scan and pay, send, pay bill) where a thumb reaches them, and make them large. Many people use phones one-handed ([Hoober 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)) [RES]. PhonePe moved its QR scanner into the thumb zone in its 2025 redesign because scanning happens under urgency ([PhonePe Design](https://design.phonepe.com/stories/behind-phonepe-redesign)) [PRAC].
- Minimum sizes: 44×44 pt on iOS ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility)) [STD]; 48×48 dp on Android ([Google](https://support.google.com/accessibility/android/answer/7101858)) [STD]; 24×24 CSS px is the WCAG 2.2 AA floor ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)) [REG]. For one-thumb use, targets of about 9–10 mm cut errors ([Parhi et al. 2006](https://doi.org/10.1145/1152215.1152260)) [RES].
- **Override:** Fitts works both ways. Make irreversible actions hard to hit *by accident*: keep "Send" and "Cancel" apart, don't place "Pay" where "Next" was on the previous screen, and keep swipe-to-pay away from scroll areas. [INF]
- **Misread as:** "The button is visible." Fitts is about size and distance, so measure both.

### Hick's law (Hick–Hyman)

**Says:** decision time grows with the number of equally likely choices, roughly logarithmically ([Hick 1952](https://doi.org/10.1080/17470215208416600); [Hyman 1953](https://doi.org/10.1037/h0056940); [Laws of UX](https://lawsofux.com/hicks-law/)) [RES].

- Keep the three to five money actions people use most at the top of home. Move occasional services (recharges, insurance, travel, games) below them or into "More".
- Banners, offers and ads count as choices too. A home screen full of promotions slows the payment people opened the app to make. [INF]
- Order payment methods by device, locale and last used (Stripe Payment Element) [PRAC].
- **Override:** never cut a choice that protects the person: pay in full next to instalments, the cheaper rail, "Cancel", "Go back". Reducing choice to steer people towards credit is interface interference. [INF]
- **Misread as:** "fewer features". Hick's law is about the choices in front of someone at a decision point, not the size of the product. Large but well-grouped menus are fine.

### Doherty threshold and response times

**Says:** people stay productive when the system responds in under about 400 ms ([Laws of UX](https://lawsofux.com/doherty-threshold/), after Doherty & Thadani, IBM 1982) [RES]. Nielsen's limits: 0.1 s feels instant, 1 s keeps the flow of thought, 10 s keeps attention ([NN/g](https://www.nngroup.com/articles/response-times-3-important-limits/)) [RES].

- Acknowledge every tap within 100 ms. Show progress for anything over 1 s. For transfers that take longer, show named stages, not a spinner (money-data `progress-and-status.md`).
- **Override:** never fake speed on money. Don't show "Paid" before the rail confirms it, and don't animate success while the status is pending. A cooling-off period or a hold on a new payee is a deliberate control, not lag. [INF]
- **Misread as:** "optimistic UI everywhere". That's fine for a like, not for a transfer.

### Tesler's law (conservation of complexity)

**Says:** every system has complexity that can't be removed; the question is who carries it ([Laws of UX](https://lawsofux.com/teslers-law/)) [PRAC].

- The product carries it: look up the bank from the account number, read amount and payee from the QR code, check the payee name, do the FX and tax maths, fill known details.
- **Override:** never "simplify" by hiding consequences. Fees, the exchange rate, interest and the repayment date stay visible. Complexity hidden at checkout comes back on the statement. [INF]
- **Misread as:** "remove features". Tesler's law is about moving the work to the system, not deleting it.

### Postel's law (robustness principle)

**Says:** be liberal in what you accept and conservative in what you send ([RFC 761](https://www.rfc-editor.org/info/rfc761/); [Laws of UX](https://lawsofux.com/postels-law/)) [STD].

- Accept amounts with commas, spaces or a currency sign; account numbers and IBANs with spaces or dashes; pasted UPI IDs with stray whitespace; phone numbers with or without the country code.
- Show it back strictly: canonical, grouped and masked on the review screen.
- **Override:** liberal input never means guessing about money. If "1.000" could mean one or one thousand in the user's locale, ask. Never auto-correct an amount or an account digit. [INF]

## 3. Laws about memory and understanding

### Miller's law, working memory and chunking

**Says:** people hold only a few items in working memory: Miller suggested about seven ([Miller 1956](https://doi.org/10.1037/h0043158)); later work suggests about four chunks ([Cowan 2001](https://doi.org/10.1017/S0140525X01003922)) ([Laws of UX](https://lawsofux.com/millers-law/); [chunking](https://lawsofux.com/chunking/)) [RES].

- Chunk identifiers: card numbers 4-4-4-4, IBANs in groups of four, OTPs 3-3 (money-data `numbers-and-identifiers.md`).
- Never make people carry a value from one screen to type into the next. Show the reference, amount and payee where they're needed.
- The review screen shows everything needed to decide at once.
- **Misread as:** "keep flows to seven steps" or "menus to seven items". Laws of UX warns against this. Counting the steps in a payment isn't a Miller's law check.

### Cognitive load

**Says:** the mental effort a task demands competes with the effort to understand the interface ([Sweller 1988](https://doi.org/10.1207/s15516709cog1202_4); [Laws of UX](https://lawsofux.com/cognitive-load/)) [RES].

- One consequential decision per screen. Plain words, not finance jargon.
- Stress shrinks capacity. Fraud, debt and dispute screens get calm surfaces, fewer elements and a single next step (`emotion-and-voice.md`). [INF]

### Jakob's law

**Says:** people spend most of their time on other products, so they expect yours to work the same way ([Nielsen 2000](https://www.nngroup.com/articles/end-of-web-design/); [Laws of UX](https://lawsofux.com/jakobs-law/)) [STD].

- Follow the conventions of the market and the platform: UPI's scan → amount → PIN in India, Pix keys in Brazil, standard card-form order, OTP autofill, the system payment sheet for Apple Pay and Google Pay, the platform's back gesture.
- **Override:** don't copy a convention that harms people. Pre-ticked add-ons and "Are you sure?" are common, and both are wrong. When you change a familiar money control, help people through the transition (PhonePe kept core money actions in place and explained changes) [PRAC]. [INF]
- **Misread as:** "the payment is slow". That's a performance finding (Doherty), not Jakob's law. Jakob's law is about familiar patterns.

### Mental models

**Says:** people act on what they believe the system does, not what it does ([Laws of UX](https://lawsofux.com/mental-model/)) [RES].

- Common gaps in money: "sent" isn't "arrived" (Wise shows them as separate stages) [PRAC]; pending versus available balance; card holds; how long refunds take; credit limit versus amount owed.
- Design to the model people have. Where the system differs, explain at the moment it matters, not in an FAQ. [INF]

### Serial position effect

**Says:** people remember the first and last items in a sequence best ([Murdock 1962](https://doi.org/10.1037/h0045106); [Laws of UX](https://lawsofux.com/serial-position-effect/)) [RES].

- On a review screen, lead with the amount and payee and end with the total and the action. Never bury the largest fee in the middle of a list.
- **Misread as:** "the home screen is cluttered". Clutter is a Hick's law and cognitive load finding. Serial position is about order in a sequence.

### Von Restorff effect (isolation)

**Says:** the item that looks different is the one people notice and remember ([Laws of UX](https://lawsofux.com/von-restorff-effect/)) [RES].

- Give the one distinct treatment to the one thing that matters: the total, the primary action, a fraud warning. Quiet when normal, so colour means attention (core rule 8).
- **Override:** highlighting the most profitable option ("Recommended" on the premium plan, a bright BNPL button next to a grey "Pay in full") is interface interference. If everything is highlighted, nothing is. [INF]

## 4. Laws about grouping

| Law | Use it for | Failure that costs money |
|---|---|---|
| **Proximity** ([Laws of UX](https://lawsofux.com/law-of-proximity/)) | Put each fee next to the amount it applies to and each label next to its value | A fee placed far from the total is missed |
| **Common region** ([Palmer 1992](https://doi.org/10.1016/0010-0285%2892%2990014-S); [Laws of UX](https://lawsofux.com/law-of-common-region/)) | One card per account or transaction; a review card split into "you pay" and "they get" | Two accounts in one container lead to paying from the wrong one |
| **Similarity** ([Laws of UX](https://lawsofux.com/law-of-similarity/)) | Same look means same function; consistent status chips | Promotions and sponsored services styled exactly like core features, so people tap ads thinking they're tools |
| **Uniform connectedness** ([Laws of UX](https://lawsofux.com/law-of-uniform-connectedness/)) | A connected stepper for transfer stages; linked rows in an FX quote | Disconnected stages make "sent" look like "done" |

Sources: the laws are research [RES]; the uses are [INF].

## 5. Laws about feeling and motivation (and where they turn into dark patterns)

### Aesthetic-usability effect

**Says:** people judge attractive interfaces as easier to use ([Kurosu & Kashimura 1995](https://doi.org/10.1145/223355.223680); [Laws of UX](https://lawsofux.com/aesthetic-usability-effect/)) [RES].

- Polish builds trust (`visual-language.md`).
- **Watch out:** beauty hides problems. People forgive and stop reporting issues, and test participants praise a screen they didn't understand. Test comprehension, not preference (`review-and-research.md` §3). [INF]

### Peak-end rule

**Says:** people judge an experience mostly by its most intense moment and its end ([Kahneman et al. 1993](https://doi.org/10.1111/j.1467-9280.1993.tb00589.x); [NN/g](https://www.nngroup.com/articles/peak-end-rule/)) [RES].

- In money, the peaks are failures: a declined card, a blocked account, a fraud alert. The end is the confirmation and receipt. Put design effort there (money-flows decline copy, money-data receipts).
- **Override:** don't stage a delightful ending to mask a bad deal. No confetti after taking a loan or making a trade (celebration policy in `emotion-and-voice.md`; Massachusetts v. Robinhood) [REG/PRAC].

### Goal-gradient effect

**Says:** effort speeds up as a goal gets closer ([Kivetz, Urminsky & Zheng 2006](https://doi.org/10.1509/jmkr.43.1.39); [Laws of UX](https://lawsofux.com/goal-gradient-effect/)) [RES].

- Good uses: KYC and onboarding progress ("Step 3 of 4"), savings goals, paying down debt.
- **Don't:** progress bars towards spending, borrowing or trading ("You're 80% of the way to unlocking credit"), or trading streaks. [INF]

### Zeigarnik effect

**Says:** people tend to remember unfinished tasks ([Laws of UX](https://lawsofux.com/zeigarnik-effect/)) [RES]. Later replications are mixed (not verified against a meta-analysis here).

- Good uses: save drafts of long applications, and remind people once to finish KYC they started.
- **Don't:** use "Profile 70% complete" to collect data you don't need, or keep reminding people about a credit offer they declined (nagging). [INF]

### Choice overload

**Says:** too many options can stall a decision or lower satisfaction ([Iyengar & Lepper 2000](https://doi.org/10.1037/0022-3514.79.6.995); [Laws of UX](https://lawsofux.com/choice-overload/)) [RES]. But meta-analyses find the effect inconsistent and often near zero; it depends on how complex the choice is and how much people already prefer one option ([Scheibehenne et al. 2010](https://doi.org/10.1086/651235); [Chernev et al. 2015](https://doi.org/10.1016/j.jcps.2014.08.002)) [RES].

- For funds, plans and cards, offer a comparison with a clear, honest default. Don't remove the option that's best for the person. [INF]

## 6. Behavioural laws that matter more with money

These aren't usually listed as "UX laws", but in finance they do more harm and more good than any layout law.

| Effect | Says | Use it for | Never |
|---|---|---|---|
| **Default effect** | People mostly keep the default. Automatic enrolment raised 401(k) participation sharply ([Madrian & Shea 2001](https://doi.org/10.1162/003355301753265543)); defaults drove organ-donor rates ([Johnson & Goldstein 2003](https://doi.org/10.1126/science.1091721)) [RES] | Default to the safe, cheap, reversible option; savings auto-enrolment with an easy opt-out | Pre-ticked insurance, add-ons, marketing consent (core rule 7) |
| **Loss aversion** | Losses weigh more than equal gains ([Kahneman & Tversky 1979](https://doi.org/10.2307/1914185)) [RES] | Honest scam warnings: "If this is a scam, you'll lose £2,400 and may not get it back" | "Don't lose your rewards!" to block cancellation (confirm shaming) |
| **Anchoring** | The first number seen pulls later judgements ([Tversky & Kahneman 1974](https://doi.org/10.1126/science.185.4157.1124)) [RES] | Show the total first; preset repayment amounts above the minimum | Showing the maximum credit limit as the first loan amount; inflated "was" prices |
| **Present bias** | People overweight now versus later ([Laibson 1997](https://doi.org/10.1162/003355397555253)) [RES] | Commit future pay rises to savings, as Save More Tomorrow did ([Thaler & Benartzi 2004](https://doi.org/10.1086/380085)) [RES] | "Pay later" framed without the total and the dates |
| **Pain of paying** | Paying feels costly, and less so when it's frictionless ([Prelec & Loewenstein 1998](https://doi.org/10.1287/mksc.17.1.4)) [RES] | Opt-in friction and spending caps for people who ask for them | Removing all friction from credit while keeping it on repayment or cancellation |

## 7. Running a UX-law audit and competitor analysis

A law-by-law "applied / not applied" checklist tells a team little. Use this method instead, together with the audit procedure in `review-and-research.md`.

1. **Pick the critical tasks and the market.** Three to five per app, for example: scan and pay at a counter, send to a new payee, check what's available to spend, recover from a failed payment, cancel a subscription.
2. **Capture each step of each task** on the same device, at real size, with a screen recording.
3. **Measure:** target size and position, taps to finish, choices at each decision point, time to first response, contrast, number of promotions above the fold.
4. **For each relevant law, write prediction → observation → evidence → severity → fix.** Skip laws that don't apply to the task. Don't force all twenty onto every screen.
5. **Add what the laws miss:** the dark-pattern sweep, the accessibility floor, error and recovery states, trust and safety (payee verification, scam warnings), and regulation in that market. In money products, these usually produce the critical findings.
6. **Compare competitors task by task,** not by look. Use the matrix below.
7. **Check with people.** Five to eight participants per user group for formative testing; ask comprehension questions ("How much will you pay in total?") and score the answers.

### Finding template

```
### [Critical | Major | Minor] Short title
App / task / step: <PhonePe / scan and pay / home>
Law: <Fitts's law> — <source link> [RES]
Predicts: <what the law says should happen here>
Measured: <40×40 dp, top-right corner, outside one-thumb reach>
Harm: <slower or missed payment at a busy counter; retries risk paying twice>
Fix: <move scan to the bottom centre, 64 dp; keep it in the same place on every tab>
```

### Competitor matrix

| Task | App A | App B | App C |
|---|---|---|---|
| Scan and pay: taps / time / worst finding | | | |
| Send to new payee: taps / payee check shown? / worst finding | | | |
| Failed payment: is the status clear? Next step offered? | | | |
| Promotions above the fold on home | | | |
| Dark patterns found (named) | | | |
| Accessibility floor met? (targets, contrast, labels) | | | |

Fill cells with measurements and the severity of the worst finding, not with opinions like "looks clean".

## 8. Common misreadings

| Law | Often written as | What it actually covers |
|---|---|---|
| Fitts | "Buttons are visible" | Target size and distance; measure both |
| Hick | "Too many features" | Choices at one decision point, including ads and banners |
| Miller | "Payment has few steps" | Working-memory load; chunking identifiers; not a step or menu limit |
| Jakob | "Payment is slow" | Matching conventions people know from other products |
| Serial position | "Home is cluttered" | What's remembered from the start and end of a sequence |
| Tesler | "Features weren't simplified" | Who carries unavoidable complexity: system or user |
| Aesthetic-usability | "Nice colours" | Attractive UIs are judged easier, which can hide real problems |

## Gaps

- Most of these laws come from lab studies with desktop pointing, Western participants and low stakes. Evidence for touch on low-end phones, low-literacy users and high-stress money decisions is thinner.
- No published experiment was found that ties a specific UX law to a fintech outcome such as wrong-payee rate or scam losses. Treat the fintech applications here as inference unless tagged otherwise.
- Not covered yet: Prägnanz, Occam's razor, the Pareto principle, Parkinson's law, the paradox of the active user and selective attention ([Laws of UX](https://lawsofux.com/) has summaries).
