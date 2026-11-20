# Prompts to try

Copy any of these into Claude once the skills are installed. Claude loads the right skill on its own, so you don't need to name it.

## Get better answers

Tell Claude four things up front. If you leave one out, criticalUX makes Claude state its assumption at the top of the answer.

| Say | Why it matters | Example |
|---|---|---|
| **Market** | Rules, payee checks and even gain/loss colours change by country | "UK and EU", "India", "Japan market data" |
| **Who uses it** | The most constrained user sets the floor | "first-time users on low-end Android", "nurses on a night shift" |
| **What can go wrong** | Severity decides how much friction is right | "sending to the wrong account", "a 10× dose" |
| **What you want back** | Screens, copy, a spec or an audit | "a screen-by-screen flow with copy for every state" |

Paste a screenshot, a Figma frame export or your copy deck for audits. Claude reviews what it can see.

## Fintech: design

- Design a send-money flow for a UK and EU neobank. Include payee name checks, the review screen and every failure state.
- Design the amount entry and FX quote screen for an international transfer. Show how fees and the rate are itemised.
- Design an approval flow for B2B payouts over $10,000 with separation of duties.
- Design a BNPL checkout option for India that would pass a dark-pattern review.
- Design the onboarding and KYC flow for a savings app aimed at first-time bank users with low literacy.
- An AI agent will pay invoices on a user's behalf. Design the permission, limit and review screens.

## Fintech: data and charts

- Which chart should show a 30-year retirement projection, and how do I show uncertainty honestly?
- Design a portfolio screen for Japanese users. What changes about colour and number formatting?
- Design the transaction list and statement view for a business account with 5,000 transactions a month.
- Give me every status a card payment can be in, with the label, icon and colour for each.

## Copy for hard moments

- Write the copy for a declined card payment at checkout. Cover insufficient funds, suspected fraud and a bank outage.
- Write the scam warning for a first payment to a new payee who says they're from the user's bank.
- Write the message telling a customer their loan application was refused.
- Rewrite this confirmation dialog so people stop clicking through it: "Are you sure you want to continue?"

## Automotive

- Design the ADAS takeover request for an L2 car, from first cue to escalation.
- Audit this infotainment screen against the 2-second glance rule and Euro NCAP 2026 physical-control requirements.
- Design a scooter dashboard for an EV two-wheeler that's readable in direct sunlight.
- How should an in-car voice assistant confirm an action that changes driving behaviour?

## Healthcare, civic and operations

- Design a medication order screen that prevents dose-notation errors.
- Redesign this alert list for an ICU so nurses see the critical ones first.
- Design a benefits application in the GOV.UK style: one question per page, plain language.
- Design the alarm view for a control room operator with an alarm budget.

## Audits

- Audit this checkout for dark patterns in India. List each finding with the rule it breaks and a fix.
- Is this payment flow safe? Rate each risky step by severity and tell me what to design out, guard or explain.
- Check this dashboard against WCAG 2.2 AA and the European Accessibility Act.
- We're launching in Brazil and Singapore next quarter. What in this flow needs to change?

## Build it

- Build a clickable HTML prototype of the review-and-send screen using the criticalUX tokens, in light and dark mode.
- Turn this flow into a design spec for engineers: states, copy, errors and accessibility notes.

---

Got a prompt that worked well? Open a pull request and add it here.
