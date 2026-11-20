# Operations, control rooms and fleet monitoring

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

Applies to process control (SCADA/DCS), utilities, network operations centres, dispatch, security operations, airport and facility operations, and fleet or autonomous-vehicle monitoring.

## 1. Quiet when normal

- **ISA-101 high-performance HMI**: mostly monochrome, greyscale graphics; colour used "sparingly and only where attention is needed such as alarms and abnormal equipment and/or instrument modes or states" — "Gray is Good". Write the style guide (display levels, hierarchy, navigation, symbols) before the first display; avoid gratuitous 3D, animation and colour [STD] ([Control.com](https://control.com/technical-articles/going-gray/)).
- **Airbus dark cockpit**: in normal configuration pushbuttons are lights-out, so dark means normal [PRAC] ([Airbus/ICAO](https://www2023.icao.int/ESAF/Documents/meetings/2017/AFI%20FOSAS%202017/Day%201%20Docs/Day_1_2_Airbuspihlo.pdf)).

Rules [INF]: neutral background and equipment; show values with their normal range (a small band beside the number) so deviation is visible before it is an alarm; reserve red/amber for alarms; never use alarm colours for brand or decoration.

## 2. Alarm budgets

Benchmarks from the ISA-18.2 / EEMUA 191 lineage, per operator [STD, via vendor summary] ([Emerson](https://d1-live.emerson.com/documents/automation/article-alarm-management-by-numbers-deltav-en-38292.pdf)):

| Metric | Target | Action needed |
|---|---|---|
| New alarms per 10 min | 1–2 | > 3 |
| Per hour | < 12 | > 18 |
| Per day | < 288 | > 432 |
| Flood | > 10 new alarms in 10 min | |
| Time in flood | < 1% | > 5% |
| Top 10 sources' share of load | < 1–5% | > 20% |
| Chattering (≥ 3 activations in 1 min) | 0 | |
| Stale (> 24 h) | < 5 per day | |
| Priority mix | ~80% low · 15% medium · 5% high | |

Use these as a design budget for any alerting product [INF]: if a typical shift would exceed them, the alerting design is wrong, not the operator.

## 3. Alert behaviour

- Classified by severity and priority; never conflicting; some suppressed by phase or state (Airbus inhibits alerts by flight phase) [PRAC].
- On a failure, show the analysis, required actions, resulting limitations and what's inoperative (Airbus ECAM) [PRAC].
- **Floods**: group related alarms, show first-out (the initiating alarm), suppress consequential alarms, and give a flood summary view. [INF]
- Shelving and suppression are logged and time-limited, and visible to the next shift. [INF]

## 4. Situation awareness

Endsley's three levels (not re-verified for this repo; foundational): perceive the elements, comprehend what they mean, project what happens next.

Design rules [INF]:

- Organise displays around operator **goals**, not around the system's technical structure.
- Show **comprehension directly** (integrated status: "Pump 3 failing, flow dropping") rather than raw values the operator must combine.
- Support **projection**: trends, predicted time to limit, "at this rate, tank full in 18 min".
- Keep a **global overview** always visible (Level 1 display in ISA-101 terms) while the operator drills into detail.
- Make critical cues salient; filter the rest.

## 5. Automation and the human in the loop

Bainbridge's "ironies of automation" [RES] ([The Morning Paper](https://blog.acolyer.org/2020/01/08/ironies-of-automation/); [original](https://gwern.net/doc/sociology/technology/1983-bainbridge.pdf)):

- The more capable the automation, the more crucial the human role; operators lose manual skill, and takeovers are the hardest tasks.
- Vigilance on rarely changing signals lasts about half an hour.
- **Fail obviously** rather than degrade invisibly; keep at least one source of each key information type permanently visible; don't force display switching during abnormal states; always show what the automation is handling.
- Give periodic manual practice or simulator drills.

Airbus golden rules [PRAC]: fly, navigate, communicate; use the appropriate level of automation; understand the mode annunciator at all times; take over if things don't go as expected.

## 6. Fleet and autonomous-vehicle operations consoles [INF, from the sources above]

- Grey baseline map and list; only vehicles needing attention get colour.
- A **mode/authority badge per vehicle**: autonomous, remote-assisted, manual, stopped (minimal-risk state), offline. Equivalent of the cockpit mode annunciator.
- Alerts suppressed by context (charging, depot, maintenance) as flight-phase inhibits do.
- One operator, one queue: interventions sorted by severity and age, with an alarm budget per operator.
- Each intervention shows the vehicle's camera/sensor view, what the automation intends, and the options (approve path, stop, hand to remote driver).
- Data freshness on every vehicle ("last update 3 s ago"); stale vehicles flagged, never shown as fine.
- Audit log of every remote command, who issued it and the outcome.
- Drills for rare failures, since monitoring skill decays.

## 7. Degraded and offline modes [INF]

- Design the degraded state of every display: lost data feed, lost connection, partial sensor failure.
- Show last known values with their age; never fill gaps with interpolation that looks live.
- Say what still works and what doesn't.
- Local fallbacks for safety actions (stop, isolate) that don't depend on the network.

Not verified for this repo: ISA-18.2 and ISA-101 primary text (paywalled), ISA-101 display levels 1–4 detail, Boeing "quiet dark" philosophy, Reason's Swiss cheese model.
