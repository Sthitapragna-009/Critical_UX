# Clinical and healthcare interfaces

Source types: **[REG]** · **[STD]** · **[RES]** · **[PRAC]** · **[INF]** (see SKILL.md).

## 1. Dose and unit notation

ISMP Canada's "Do Not Use" list applies to electronic displays and order sets as well as handwriting [REG/STD] ([ISMP Canada](https://www.ismp-canada.org/download/ISMPC_List_of_Dangerous_Abbreviations.pdf)):

| Never | Always | Why |
|---|---|---|
| `5.0 mg` (trailing zero) | `5 mg` | A missed decimal is a 10-fold error |
| `.5 mg` | `0.5 mg` | Leading zero prevents reading 5 mg |
| `U`, `IU` | `unit` | Misread as 0, 4, cc, IV or 10 |
| `µg` | `mcg` | Misread as mg: 1000-fold overdose |
| `cc` | `mL` | Misread as U |
| `QD`, `QOD`, `OD` | `daily`, `every other day` | Confused with each other, with qid, and with "right eye" |
| `OS`, `OD`, `OU` | `left eye`, `right eye`, `both eyes` | |
| `MS`, `MSO4`, `MgSO4` | Full drug names | Morphine vs magnesium confusion |
| `@`, `>`, `<` | `at`, `greater than`, `less than` | Misread as 2, 5, 7 or L |

UI rules [INF]: units beside every value; never truncate a dose, drug name or unit in a list, picker or column; wrap instead. Show the unit in the input field, not only in a label.

## 2. Look-alike, sound-alike drug names

Tall Man lettering (hydrOXYzine / hydrALAZINE) is widely recommended but the evidence is mixed [RES] ([ISMP Canada project report](https://www.ismp-canada.org/download/TALLman/TALLmanLettering-ProjectReport.pdf); [Springer 2023](https://link.springer.com/10.1007/s43441-023-00526-0)). Use it as a cheap secondary control, paired with barcode scanning, indication display and search that shows indications, never alone. The ISMP list now redirects to ECRI and was not fetched.

## 3. Patient identification and modes

- Persistent patient header: name, date of birth or age, identifier, photo where available, allergies, weight for weight-based dosing. NIST's use-error cases include wrong-limb surgery when patient ID wasn't visible [REG] ([NIST IR 7804](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7804.pdf)).
- Two identifiers before any irreversible act. [INF]
- Dosing modes (weight-based vs fixed), units (metric vs imperial) and environments (training vs live) are shown with distinct colour, label and layout. NIST cites a 100-fold overdose from mode confusion and orders placed in production because it looked like test [REG].

## 4. Alert fatigue

AHRQ PSNet [RES] ([PSNet primer](https://psnet.ahrq.gov/primer/alert-fatigue)):

- Clinicians override "the vast majority" of order warnings, including critical ones.
- Monitors in 66 ICU beds produced 2 million+ alerts in a month (187 per patient per day); VA primary-care clinicians received 100+ alerts a day.
- A teenager received a 38-fold antibiotic overdose partly because the prescriber was told to "just ignore the alerts".

Fixes: tier alerts by severity; make only severe ones interruptive; tailor to patient context (renal-risk alerts only for at-risk patients); apply human factors to format and content; delete inconsequential alerts to raise specificity.

## 5. FDA human factors and IEC 62366-1

- **Critical task**: a task that, if done incorrectly or not at all, would or could cause serious harm [REG] ([Innolitics, FDA 2016](https://innolitics.com/articles/fda-guidance-applying-human-factors/)).
- **Risk control order**: inherent safety by design → protective measures (interlocks, warnings, alerts) → information for safety (labelling, training). Test every control for new hazards.
- **Formative** evaluation during development; **validation** (summative) with the final UI, representative users and all critical tasks: **at least 15 participants per distinct user population**.
- **August 2026 update**: FDA's revised final guidance aligns with QMSR, ISO 13485:2016, ISO 14971:2019 and IEC 62366-1; core expectations unchanged [REG] ([Emergo by UL](https://www.emergobyul.com/news/fda-updates-landmark-human-factors-guidance-medical-devices)).
- NIST IR 7804's three-step EHR protocol: application analysis → expert review → validation testing with debriefs [REG].

## 6. Patient-facing results and risk

- More than 4 in 10 UK adults struggle with public health content; **more than 6 in 10 with numbers and statistics** [RES] ([NHS service manual](https://service-manual.nhs.uk/content/health-literacy)). Research with people with low health literacy; use readability tools only to prioritise.
- **Icon arrays** remove denominator neglect for younger and older adults equally [RES] ([Garcia-Retamero et al. 2010](https://ideas.repec.org/a/sae/medema/v30y2010i6p672-684.html)).

Pattern for a lab result or risk [INF]:

```
Cholesterol (LDL)   3.9 mmol/L
                    ├──normal──┤▲
                    Slightly above the healthy range (up to 3.0)
What it means       ...plain words...
What to do          ...next step, who to contact...
```

- Same denominator for all compared risks ("12 in 100" vs "8 in 100"), never "12%" vs "1 in 12".
- Absolute risk before relative risk.
- Plain-language label first, medical term in brackets (NHS guidance on terms, not verified for this repo).
- Results that need a clinician's explanation are not released without context or a contact route. [INF]

## 7. Clinical AI and decision support

- Raise the level of explanation as stakes rise; use categorical confidence with an action for each level; show N-best alternatives when confidence is low; show ranges to experts; don't show confidence if it changes no decision [STD] ([Google PAIR](https://pair.withgoogle.com/chapter/explainability-trust/)).
- Show past performance so reliance matches capability (Lee & See 2004) [RES] ([PubMed](https://pubmed.ncbi.nlm.nih.gov/15151155/)).
- The clinician stays the decision-maker; AI suggestions are dismissable and correctable in one step (Microsoft HAX G8, G9) [STD] ([HAX](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)).

Not verified for this repo: ONC §170.315(g)(3) safety-enhanced design, NHS design system care-card urgency levels, IEC 62366-1 full text.
