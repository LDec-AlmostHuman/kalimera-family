# How Kalimera Family works

State: 19 November 2026 (Android test build 0.2.1, release 2026-11-19).

## One turn

1. The person presses **Speak** (or types). Voice activation notices when they stop talking.
2. **Whisper small** turns the speech into text, on the phone. Romanian uses its own fine-tuned Whisper small, which cut Romanian word errors from 31% to 17% on our test clips.
3. The text goes through **fixed steps, in order**. The first step that knows the answer gives it:
   1. emergency phrases (fixed calm reply and a Call button with the emergency number of the person's country);
   2. care guard for harm and low mood (a warm, fixed reply; nothing is sent anywhere);
   3. commands ("louder", "slower", "repeat", "larger text");
   4. help with the app;
   5. clock and date, name days;
   6. weather (iPhone today);
   7. a guard for live values the app cannot know, which says so honestly;
   8. reference values (for example blood sugar, in the unit used in that country);
   9. knowledge cards (prepared answers);
   10. "Did I hear you right?" when the speech was unclear;
   11. facts grounded in Wikipedia, with the source named;
   12. the language model, which says so when it found no source.
4. The answer is shortened to at most three sentences, made easy to speak (numbers and abbreviations written out), shown as a large caption and read aloud.

Steps 1 to 9 use no AI model. About half of all questions are answered there, so those answers are fast and cannot be invented. Every turn is labelled with the step that answered it.

## Models

| Where | Model | Size | Used for |
|---|---|---|---|
| Phone | Whisper small q8 (OpenAI, whisper.cpp) | 264 MB | speech recognition |
| Phone | Gemma-4-E2B, 4-bit (Google) | 2.6 GB file | answers in English, German, Romanian |
| Phone | Bielik 1.5B v3, 4-bit (SpeakLeash) | 1.0 GB | answers in Polish |
| Phone (iPhone) | Pocket TTS voices (Kyutai, CC BY 4.0) | about 0.1B parameters | natural voices for Polish, English, German |
| Phone (Android) | the phone's own voice | — | reading answers aloud |
| Care-home hub (optional) | Gemma-4-26B-A4B, 4-bit | 14 GB file, about 4B active parameters | harder questions for a whole care home |

Measured peak memory: 2.5 GB on a Galaxy A37 (Whisper + Gemma-4-E2B), 2.1 GB on an iPhone 15 Pro Max. The target device is a phone or tablet with 6 GB of memory.

## The care-home hub

A care home (or a family) can run one small computer on its local network. Phones find it on their own and send it **only the text** of questions that need a larger model, over HTTPS. Audio never goes there, and nothing goes to a cloud. When the hub is busy or switched off, questions move to a smaller model or back to the phone, so the person always gets an answer.

The hub is not part of this public Android test build.

## Content updates

New scam warnings and emergency cards arrive as **signed content packs**. The phone checks the signature (Ed25519) before using a pack. A pack holds only text: it cannot run code or open links. The packs in the demo are signed with a demo key.

## Languages and countries

The person chooses a language and then a country. The country sets emergency numbers, local services, name-day calendars and scam stories:

| Language | Countries | Status |
|---|---|---|
| Polski | Poland | content reviewed by the developer |
| English | United Kingdom, Ireland | draft, native review planned |
| Deutsch | Germany, Austria, Switzerland | draft, native review planned |
| Română | Romania | draft, native review planned |
| Ελληνικά | Greece | paused on 18 Nov 2026; coming back after more work |
