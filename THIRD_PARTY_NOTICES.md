# Third-party notices

Kalimera Family is built on the open work of others. This list covers the Android test build 0.2.1 (19 November 2026) and the model files it downloads. The same credits are in the app under **Settings → About and licences**. The full licence texts are in [LICENSES/](LICENSES/): MIT, Apache-2.0, BSD-2-Clause, OFL-1.1, CC BY 4.0 and CC BY-SA 4.0.

## Inside the app (APK)

| Component | Used for | Licence | Notice |
|---|---|---|---|
| whisper.cpp / ggml (Georgi Gerganov and contributors) | Running speech recognition | MIT | Copyright (c) the ggml authors. |
| llama.cpp (ggml-org and contributors) | Running the language models | MIT | Copyright (c) the ggml authors. |
| Capacitor (Ionic) | App shell | MIT | Copyright (c) Drifty Co. and contributors. |
| Svelte | Screens | MIT | Copyright (c) Svelte contributors. |
| Nunito (The Nunito Project Authors) | Typeface | SIL Open Font License 1.1 | Copyright 2014 The Nunito Project Authors (github.com/googlefonts/nunito). |
| PoliMorf (IPI PAN, SGJP and Morfologik) | Polish word check, changed into a compact word filter | BSD 2-Clause | Portions copyright (c) 2011 Marek Futrega, Piotr Gackiewicz, Miroslaw Prywata, Wlodzimierz Macewicz, Marcin Milkowski. Portions copyright (c) 2007-2018 Zygmunt Saloni, Wlodzimierz Gruszczynski, Marcin Wolinski, Robert Wolosz, Danuta Skowronska. Portions copyright (c) 2011-2018 Institute of Computer Science, Polish Academy of Sciences. All rights reserved. Redistribution and use in source and binary forms, with or without modification, are permitted provided that the copyright notice, this list of conditions and the following disclaimer are kept. THIS DATA IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. The names of the authors are not used to endorse this product. |
| SJP Polish dictionary pl_PL (Marek Futrega, sjp.pl) | Polish word check (word forms extracted into a filter) | Apache License 2.0 | Used under the Apache License 2.0. Changed: word forms extracted into a filter. |
| Wikipedia contributors | Name-day calendars for Polish, German and English (Western and Orthodox saints) | CC BY-SA 4.0 | From the Polish and German Wikipedia name-day pages, the English Wikipedia General Roman Calendar and the calendars of England, Wales, Scotland and Ireland, the English Wikipedia date pages and the Eastern Orthodox liturgics pages. Changed: reordered, shortened and merged. The name-day data files are shared under the same licence. |
| trends.ro (github.com/rlucian/romanian-name-days) | Romanian name days | CC BY 4.0 | Changed: converted to the app format. |
| alexstyl/Greek-namedays and Wikidata | Greek name days (Greek is paused in the app) | Public domain / CC0 as stated by the sources | — |
| Rust crates (serde, jni, llama-cpp-2 and others) | Core of the app | MIT / Apache-2.0 | The full generated list will be published with the source code. |

## Downloaded once, after the person taps Download

| Model | Used for | Licence | Source |
|---|---|---|---|
| Whisper small, ggml q8_0 (OpenAI; conversion by whisper.cpp) | Speech recognition (English, Polish, German) | MIT | huggingface.co/ggerganov/whisper.cpp |
| Whisper small Romanian fine-tune, ggml q8_0 (YarosTN, based on IonGrozea/whisper-small_ro-80mel) | Romanian speech recognition | Apache-2.0 | huggingface.co/YarosTN/whisper-small-ro-ggml |
| Gemma-4-E2B instruct, QAT 4-bit GGUF (Google; quantised by unsloth) | Answers in English, German and Romanian | Apache-2.0 | huggingface.co/google/gemma-4-E2B-it |
| Bielik 1.5B v3 instruct, 4-bit GGUF (SpeakLeash, ACK Cyfronet AGH) | Answers in Polish | Apache-2.0 | huggingface.co/speakleash |

Each file is pinned to a fixed revision and checked against its SHA-256 before use.

## iPhone version only (not in this APK)
- Pocket TTS (Kyutai) and Pocket TTS Polish (shefowl), CC BY 4.0. Converted to ONNX and quantised by Kalimera Family. The Polish reference recording is from CML-TTS (CC BY 4.0). The English and German voice is derived from a recording of the Voice Cloning Toolkit (VCTK), University of Edinburgh, CC BY 4.0. These voices are synthetic and must not be presented as real recordings.
- Apple Weather (WeatherKit terms): weather data.
