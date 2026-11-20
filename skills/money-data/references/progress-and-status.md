# Progress and status

Source types: **[REG]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. How long is the wait?

NN/g thresholds [RES] ([NN/g, Progress indicators](https://www.nngroup.com/articles/progress-indicators/)):

| Wait | Show |
|---|---|
| < ~1 s | Nothing (an indicator would flash) |
| ~1–2 s | Subtle inline indicator |
| 2–10 s | Indeterminate (looping) indicator **plus text saying what is happening** |
| ≥ 10 s | Determinate percent-done, a time estimate and a way to stop or leave |
| A series of steps | "Step 2 of 4" or "Item X of Y" |

Users shown a looping indicator waited about 3× longer and were more satisfied than users shown nothing. Avoid static "Loading…". Determinate bars should start slower and speed up; racing then stalling frustrates [RES].

## 2. Immediate acknowledgement

"Don't click again" warnings don't work; showing at once that the first press was accepted does [RES] (NN/g). For any money-moving button:

1. On press: disable the button, change its label ("Sending…"), show progress in place.
2. Backend uses an idempotency key so a retry cannot pay twice [PRAC: Stripe API practice].
3. If the result is unknown (timeout, app killed), show **"Checking whether your payment went through. Don't pay again yet."** and resolve it automatically. This is common industry practice, not a sourced finding [INF].

## 3. Money in flight

Wise is the best public model of honest payment progress [PRAC] ([Wise API, tracking transfers](https://docs.wise.com/guides/send-money/tracking)):

- 5+ internal states map to plain user stages: *On its way to Wise → Processing → Sent*, with problem states *Bounced back*, *Charged back*, *Cancelled*, *Refunded*.
- Wise's docs state that "sent" **does not mean the money has arrived**.
- *Bounced back* is not final; most bounces take 2–3 business days, some take weeks.
- Delivery estimates are live and **not guaranteed**.

The criticalUX transfer pattern [INF]:

```
●  Payment set up            12 Mar, 10:02
●  Money received from you   12 Mar, 10:04
●  Checks and conversion     12 Mar, 10:05
◐  Sent to their bank        12 Mar, 10:20   ← "Their bank may take up to 1 working day to show it"
○  Should arrive by 13 Mar  (estimate)
```

Rules:

- 3–5 user stages, each with a timestamp once reached.
- The ETA is labelled "estimate" or "should arrive by", never "will arrive".
- "Sent" copy explains that the recipient's bank controls the last step.
- A returned payment gets its own state, its own colour (warning, not error) and says where the money is now.
- Offer a shareable tracking link or proof of payment where the rail supports it.
- Notify on state changes people care about (arrived, returned), not every internal hop.

## 4. Card payments: authorised vs settled

| What the bank sees | What people see |
|---|---|
| Authorisation / hold | **Pending** · "This may change. Shops sometimes take a hold before the final amount" |
| Capture / settlement | Posted amount, with the original pending amount if it changed |
| Reversal of a hold | The pending item disappears **with an explanation**, not silently |
| Refund | A separate credit linked to the original purchase |

Pending is never silently added to or removed from the available balance; show "available" and "pending" separately when they differ [INF].

## 5. Other state maps to define for every product

Write these as tables before designing screens [INF]:

- **Cards**: ordered → printed → shipped → delivered → activated; frozen ↔ active; lost/stolen → replaced. Freezing should be instant and reversible; Monzo animates frost for it, Nubank offers a temporary block before cancellation [PRAC].
- **Disputes**: reported → information needed → under review → provisional credit (where the rules give one) → resolved (won / lost / partially). Each state names who is acting now and the next date.
- **KYC / onboarding**: started → documents → verification → approved / more information needed / declined. Autosave between steps; resume links.
- **Loan or BNPL**: offered → accepted → active → instalment due → paid / missed → closed.
- **B2B payments and payouts**: draft → pending approval → approved → scheduled → sent → paid / failed / returned.

## 6. Goals, limits and meters

- Pair every meter with absolute amounts: "£400 of £1,000 saved", "£2,300 of £5,000 limit used". [INF]
- Credit utilisation, spending caps and data plans are determinate meters; colour can shift as thresholds approach, but the number carries the meaning.
- Goal completion is a legitimate moment to celebrate (see critical-core, emotion). Reaching a credit limit is not.
- Savings goals work: a randomised trial found in-app goal setting raised savings without pulling money from elsewhere [RES] (Gargano & Rossi, *Journal of Finance* 2024; effect size not in the abstract).

## 7. Stale and offline

- Show the "as of" time whenever data may be old; grey stale values only if they remain legible.
- Offline: keep the last known balance visible and labelled, queue actions that are safe to queue, block those that are not, and say which is which. Square Register treats offline mode as a feature [PRAC].
