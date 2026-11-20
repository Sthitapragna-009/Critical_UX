# Automation and AI: calibrated trust

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Calibrate, don't maximise

- **Lee & See (2004)**: design for appropriate reliance, so trust matches what the system can actually do. Over-trust leads to misuse; under-trust to disuse. Show how the system works and how it has performed [RES] ([PubMed](https://pubmed.ncbi.nlm.nih.gov/15151155/)).
- **Google PAIR**: calibrate trust rather than maximise it; raise the level of explanation as stakes rise; partial explanations are fine; test with diverse users [STD] ([PAIR](https://pair.withgoogle.com/chapter/explainability-trust/)).

## 2. Showing confidence

From PAIR [STD]:

- **Categorical** confidence (high / medium / low) needs meaningful cutoffs and a different action at each level.
- **Numeric percentages** risk false certainty and misreading for lay users.
- **Ranges and error bars** suit experts.
- **N-best alternatives** suit low confidence ("Did you mean…").
- **Don't show confidence** if it changes no decision.

## 3. Microsoft HAX guidelines

18 guidelines across four phases [STD] ([Microsoft HAX](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)): initially (make clear what the system can do, and how well); during interaction (time services on context, show relevant information, match social norms, mitigate bias); **when wrong** (support efficient invocation, dismissal and correction; scope services when in doubt; explain why); over time (remember recent interactions, learn cautiously, update cautiously, encourage feedback, convey consequences of actions, provide global controls, notify about changes).

## 4. Rules for high-stakes AI [INF, from the sources above and Bainbridge]

1. **Say what it can and can't do** on first use, in the domain's terms ("I can explain charges and freeze your card. I can't approve refunds").
2. **Bounded intents with a human handoff.** Bank of America's Erica runs on a curated library of 700+ responses and hands off to humans [PRAC] ([Financial IT](https://financialit.net/news/artificial-intelligence/decade-ai-innovation-bofas-virtual-assistant-erica-surpasses-3-billion)).
3. **The person decides on anything irreversible or high-severity.** AI may prepare; the person confirms with the same rules as a manual action.
4. **Show what the AI did,** with one-step undo or correction.
5. **Fail visibly**: "I'm not sure" is a valid answer and routes to a person.
6. **Visible mode**: it's always clear whether a person or an agent is acting (money-flows/agent-payments; automotive-hmi automation).
7. **Proactive suggestions are alerts** and share the alert budget.
8. **No persuasion toward the provider's interest**: AI must not steer people to credit, upgrades or products against their stated goals (dark-pattern rules apply).
9. **Record and expose** what the AI saw and did for disputes and audits.

## 5. Automation in operations and vehicles

See automotive-hmi (automation and handover) and critical-domains (operations). Shared rules: monitor the human's attention, escalate in stages, plan handovers for the slowest person, keep skills alive with practice, and never let a weak mode display hide who is in control.
