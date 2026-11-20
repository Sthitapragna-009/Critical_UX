# Emotion, voice and behaviour

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

High-stakes interfaces meet people when they are anxious, ashamed, rushed or grieving. Calm and clear beats clever.

## 1. Avoidance is real

- **Ostrich effect**: across 1.1 million investors and 852 million observations, account logins fell 9.5% after a market down day [RES] ([CMU](https://www.cmu.edu/news/stories/archives/2015/december/ostrich-effect.html)).
- Implication [INF]: bad news should reach people through calm, actionable messages, and opening the app should lead with "what you can do", not just the damage.
- Reframing raw totals into purpose-labelled amounts helps: YNAB's method asks "What's it for?" and spreads big bills into monthly set-asides to avoid "the emotional drama of one big bill" [PRAC] ([YNAB](https://www.ynab.com/ynab-four-rules-less-stress/)). Monzo's Get Paid Early opens with "Got too much month for your money?" [PRAC].
- "Left to spend" or "safe to spend" views and balance-hiding toggles are common; no controlled evidence on them was found [INF].

## 2. Tone is a dial set by stakes and channel

Monzo's public tone guide is the most usable model [PRAC] ([Monzo Tone of Voice](https://monzo.com/tone-of-voice/)):

- Kindness everywhere.
- **Wit at zero** in operational communications and customer service, because getting it wrong outweighs the benefit; medium in marketing; high in campaigns.
- Bad news: **impact first, then the reason.**
- Apologise sincerely and **once**; don't apologise for things that aren't your fault.
- **Never joke about failure, shame or mental health.**

Monzo published its writing system as a Figma file in Feb 2025 (short sentences, active voice: "we blocked the payment") [PRAC] ([Monzo blog](https://monzo.com/blog/weve-made-our-writing-system-available-to-all)).

The criticalUX dial [INF]:

| Context | Humour | Warmth | Detail |
|---|---|---|---|
| Errors, declines, failures | None | Some | Specific next step |
| Fraud, scams, security | None | Steady, reassuring | Exact actions, no blame |
| Debt, collections, missed payments | None | High | Options, not threats |
| Bereavement, illness, abuse, vulnerability | None | High | Minimal asks, tell us once |
| Clinical results, safety alerts | None | Neutral to warm | Plain meaning + action |
| Onboarding, empty states | Light | High | Short |
| Milestones the person achieved | Light | High | Celebrate the person |
| Marketing | Brand-dependent | | |

Humour as a product can work only when the person opts in (Cleo's "Roast Mode") [PRAC].

## 3. Bad news pattern [INF, from Monzo's guide]

1. What happened and what it means for you (impact).
2. Why, briefly, if known and safe to say.
3. What we've done.
4. What you can do now (one primary action).
5. How to reach a person.

"Your card payment of £84.20 to Ryanair was declined. Your bank didn't approve it. You haven't been charged. Try another card, or contact your bank."

## 4. Celebration policy

- **Celebrate outcomes good for the person**: savings goal reached, debt cleared, paid early, a safe streak.
- **No celebration for trades, borrowing, BNPL or spending**: a calm checkmark with amount, recipient and reference.
- Precedent: Robinhood removed first-trade confetti in March 2021; Massachusetts cited confetti, scratch-off reveals, popularity lists, emoji pushes and a tapping waitlist in a $7.5M consent order (Jan 2024) [REG] ([Vinson & Elkins](https://velaw.com/insights/game-over-robinhood-pays-7-5-million-to-resolve-gamification-securities-violations)). Chance-based rewards (scratch cards) on spending raise the same concern [INF].
- Monzo's contrast: playful drag-and-confetti for getting paid early, a frost animation for freezing a card, deliberate friction for borrowing [PRAC].
- Celebration respects Reduce Motion and never blocks the next action.

## 5. Nudges: allowed when they serve the person's own goal

- Defaults are powerful: auto-enrolment keeps about 90% enrolled; Save More Tomorrow raised savings from 3.5% to 13.6% in under four years; low defaults can anchor savings low [RES] ([Chicago Booth Review](https://www.chicagobooth.edu/review/2013/september/retirement-savings)).
- In-app goal setting raised savings without crowding out saving elsewhere, most for the lowest savers (randomised, *Journal of Finance* 2024) [RES] ([Gargano & Rossi](https://econpapers.repec.org/RePEc:bla:jfinan:v:79:y:2024:i:3:p:1931-1976)).
- Self-chosen commitment devices work: Monzo gambling-block users chose long cooldowns (average 3 → 10 months; 41% picked the maximum 12) [PRAC].
- BNPL at checkout changes behaviour (38% spent more than planned); BIT recommends it not appear as the default [RES] ([BIT](https://www.bi.team/?p=28498)).

Nudge ethics checklist [INF]:

- [ ] Serves a goal the person set or would endorse
- [ ] As easy to reverse as to accept
- [ ] Transparent: the person can see why they're being nudged
- [ ] Not exploiting urgency, scarcity, shame or chance
- [ ] Measured with a guardrail for harm (debt, complaints, opt-outs)

## 6. Vulnerability

- The FCA estimated 46–53% of UK adults show characteristics of vulnerability; FG21/1 names four drivers: health, life events, financial resilience and capability [REG, UK] ([Mishcon de Reya](https://www.mishcon.com/news/the-fcas-new-approach-to-vulnerable-customers-the-guidance)).
- Expectations: design for it from the start, several contact channels, encourage disclosure, record it once and use it across teams.
- Monzo and the Money and Mental Health Policy Institute proposed next-day confirmation of late-night purchases, trusted-person alerts, and non-accusatory prompts when income stops [PRAC] ([Monzo](https://monzo.com/blog/2017/01/27/designing-product-mental-health-mind/)).
- Financial abuse: don't make victims retell their story; help them regain control (UK Finance code) [PRAC].
- Self-set blocks: instant to turn on, delayed to turn off, with the person's own note shown at the moment of temptation (Monzo gambling block) [PRAC].
- Bereavement: one place to tell us, no marketing, no automatic "Dear [deceased]" letters, a named contact. [INF]

## 7. Words

- Plain, specific, active. "We blocked the payment", not "The transaction could not be processed".
- Verb-first buttons naming the object and amount.
- No double negatives; "No" is a real option (India's CCPA lists trick questions) [REG].
- Name the person's money as theirs ("your money"), and your responsibility as yours ("we").
