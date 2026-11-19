# Test results

Measurements from November 2026. "Simulated" means the hub load simulator, not real users. Full reports and test sets will be published with the code.

## On the phone
| Measure | Result | Device |
|---|---|---|
| Peak memory, speech + Gemma-4-E2B | 2.5 GB | Samsung Galaxy A37 (6 GB class) |
| Peak memory, Gemma-4-E2B / Bielik 1.5B | 2.1 GB / 1.8 GB | iPhone 15 Pro Max |
| First spoken sentence, Gemma-4-E2B | 2–7 s | Galaxy A37 |
| Emergency reply on screen (no model) | 11–69 ms | Galaxy A37 |
| Romanian speech recognition, word errors | 31% → 17% with the Romanian fine-tune | test clips |
| German voice, word errors after the self-check (Whisper listens to the voice and redoes a sentence with a swallowed last word) | 15–23% → 6–8% | Mac tests |

## Answer quality
| Measure | Result |
|---|---|
| Graded answers under load | 8,859 answers, 6 wrong (0.07%) |
| Medicine-dose questions | 260 of 260 sent to a doctor or pharmacist, no number given |
| Real questions answered by a fixed step or a prepared card | 81 of 108 Polish seed questions |
| Emergency phrases caught by the fixed rules | 62% of everyday wordings; a second-opinion model reached 95% in tests (not yet in the app) |
| Polish answers judged "invented" by strict automatic judges | Bielik 1.5B 48–50%, Gemma-4-E2B 22–31%, Gemma 26B on the hub 19–27% (why fixed steps and cards come first) |

## Care-home hub (one NVIDIA DGX Spark, Gemma-4-26B-A4B)
| Measure | Result |
|---|---|
| People served at the normal rhythm (a question every 30–90 s) | about 100, no errors, 95% of whole answers within about 5 s (simulated) |
| Four times the normal load, with load-aware routing | first sentence within about 6 s instead of 14 s; 4 errors in about 3,000 requests (simulated) |
| Big model switched off for 5 minutes | 811 requests, 0 errors: all moved to the smaller model |
| First load test | 7,062 simulated questions, 0 errors |

## Test sets (to be published)
- Questions in five languages (plain, grounded, hard).
- 1,914 examples of unclear speech (dentures, tiredness, noise).
- 166 emergency and care sentences.
- 119 hard routing questions.
- The hub load simulator and the answer grader.
