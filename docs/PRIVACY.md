# Privacy in Kalimera Family

State: 19 November 2026, Android test build 0.2.1. The terms text in the app is a draft for legal review.

## In short
- **The voice never leaves the phone.** Speech recognition runs on the device.
- **No account.** No name, e-mail, phone number or card is asked for. The app uses only a random device ID.
- **Nothing is remembered until the person agrees** on the first screen.
- **Nothing is used to train AI models.**
- **No advertising, no data sold.**

## What stays on the phone
- Audio, always.
- The conversation memory, if the person agrees:
  - a log of the last 7 days;
  - daily summaries made of the person's own questions, word for word (not written by a model), kept for one year, or 90 days for health talks;
  - facts the person asks to keep ("Remember that my daughter is called Anna").
- Settings (language, text size, voice, theme).

## How the person controls it
- "What do you remember about me?" reads the kept facts aloud.
- "Forget everything" deletes the log, the summaries and the facts.
- **Settings → What I remember** lists every item and deletes it one by one, with a second press to confirm.
- Uninstalling the app deletes everything.

## What leaves the phone
| What | Where to | When |
|---|---|---|
| Model files (download only) | huggingface.co, over HTTPS | once, after the person taps Download |
| The search words of a factual question | the Wikipedia of that language, over HTTPS | only for factual questions that no fixed step answered |
| Weather location (iPhone only) | Apple WeatherKit | when the person asks about the weather |
| Text of a hard question (optional) | the care-home hub on the local network, over HTTPS | only where a hub exists; never to a cloud |

The app's technical log holds counts and timings only, never question text, and it stays on the phone.

## Rules for the future features
These rules are agreed but most of the features are not built yet:
- One profile per person. Memories are never shared between people in one home.
- Family members help with setup only with the person's consent.
- Care-home staff see reminders and alerts, never private conversations.
- A resident who leaves takes their memories with them or deletes them.
- Whoever pays for a hub never sees conversations. A payment is never used as a sign that someone is alive or well, and a lapsed payment never switches off safety features.
- Any warning to a carer (for example after a fall) would need the person's explicit consent at setup, would send only a flag and a time, never the conversation, and needs legal, clinical and ethical review first.
