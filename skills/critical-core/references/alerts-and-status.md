# Alerts, status and visibility

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Interruptions are scarce

- Clinicians override "the vast majority" of order warnings; ICU monitors produced 187 alerts per patient per day [RES] ([AHRQ PSNet](https://psnet.ahrq.gov/primer/alert-fatigue)).
- Attention to repeated warnings falls day by day, measured by fMRI and eye tracking [RES] (Vance et al., *MIS Quarterly* 2018).
- Text warnings lost their effect by the third exposure in a scam experiment [RES] (Akesson et al. 2023).

## 2. Tier everything

| Tier | Meaning | Presentation | Example |
|---|---|---|---|
| 1 Critical | Harm imminent; act now | Interrupts; sound/haptic; persistent until handled | Takeover request; severe drug interaction; scam in progress |
| 2 Warning | Needs attention soon | Prominent, non-blocking; in a queue | Low balance before a bill; amber tell-tale; alarm medium |
| 3 Advisory | Useful to know | Inline, badge, digest | New statement; trip summary |
| 4 None | Not worth an alert | Delete it | "Your settings were saved" push |

[INF, from AHRQ, Airbus, ISA-18.2]

## 3. Alert budgets

Use the control-room benchmark as a starting budget for any alerting product: about **1–2 new alerts per person per 10 minutes**, **more than 10 in 10 minutes is a flood**, and a priority mix of roughly **80% low / 15% medium / 5% high** [STD, via Emerson] ([Emerson](https://d1-live.emerson.com/documents/automation/article-alarm-management-by-numbers-deltav-en-38292.pdf)). For consumer notifications, set a per-day budget per category and let people tune it. [INF]

## 4. Make repeated warnings polymorphic

Warnings that vary their symbol, colour, motion or zoom slowed habituation substantially and kept adherence higher over three weeks [RES] ([Vance et al. 2018](https://misq.umn.edu/pub/skin/frontend/default/misq/pdf/V42I2/14124_RA_VanceJenkinsAbstract.pdf)). Vary the form by risk type, and make the content specific to this case (payee name, drug name, the actual reading). [INF]

## 5. Quiet when normal

- ISA-101: grey displays; colour only for alarms and abnormal states ("Gray is Good") [STD] ([Control.com](https://control.com/technical-articles/going-gray/)).
- Airbus dark cockpit: lights-out means normal; alerts classified by severity, never conflicting, inhibited by phase [PRAC] ([Airbus/ICAO](https://www2023.icao.int/ESAF/Documents/meetings/2017/AFI%20FOSAS%202017/Day%201%20Docs/Day_1_2_Airbuspihlo.pdf)).
- Translate to apps [INF]: neutral surfaces; status colour only when something needs the person; don't colour ordinary spending red; suppress alerts by context (driving, sleeping hours, depot, maintenance).

## 6. Status, mode and who is in control

- **Mode and environment always visible** (test vs live, autopilot on/off, weight-based vs fixed dosing, which entity or account). NIST cites production actions taken because production looked like test [REG]. Airbus: "Understand the FMA at all times" [PRAC].
- **Who is acting now** on every case, payment and process ("Waiting for the other bank", "Your agent is booking", "Auto-steer active").
- **Freshness**: every live value can go stale; show its age when it matters ("Updated 2 min ago").
- **Never blank a safety value**; show last known plus an explicit unknown state (Euro NCAP speed-limit finding) [STD].

## 7. Fail visibly

Bainbridge: systems should fail obviously rather than degrade invisibly; keep one source of each key information type permanently visible; don't force display switching in abnormal states; always show what automation is handling [RES] ([The Morning Paper](https://blog.acolyer.org/2020/01/08/ironies-of-automation/)).

App translation [INF]: a failed sync, payment, sensor or model says so in place, with what still works and what to do. Silent retries are logged and surfaced if they fail.

## 8. Notifications

- Content: what happened, the amount or value, the subject (payee, patient, vehicle), and one action. [INF]
- Security alerts carry "This wasn't me", which freezes or locks. [INF]
- No clickable links in security SMS or email (Singapore rule since 2022) [REG, SG].
- Lock-screen privacy respects hidden-value settings. [INF]
- "Tell us once": preferences apply across channels (FCA good practice) [REG, UK].
- Proactive insights (assistants, AI) count against the same budget.
