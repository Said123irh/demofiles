# False Awakening: handoff for a new chat

Paste this to start a new chat:

> Continue my False Awakening horror short. Read `HANDOFF.md` on branch `claude/jolly-newton-mgsn1z` of `Said123irh/demofiles` first. All five scenes are built; I want to make changes.

## Where things are

- Repo: `Said123irh/demofiles`. Latest branch: `claude/jolly-newton-mgsn1z` (has Scenes 1 to 5). Scenes 1 to 4 were built on `claude/scene-3-canvas-animation-porg9o`.
- Each scene is one self-contained HTML file with a canvas animation, synthesised sound and a play bar.
- Every scene has a long (16:9) and a short (9:16) version.

| Scene | Length | Long file | Short file | Long link | Short link |
|---|---|---|---|---|---|
| 1 | 51s | `false-awakening-scene1.html` | `false-awakening-scene1-short.html` | https://claude.ai/artifact/WPN5tS4SsYHnEnBHfd6hVk | https://claude.ai/artifact/3t8M928ghdwf22jxgVS6wv |
| 2 | 45s | `false-awakening-scene2.html` | `false-awakening-scene2-short.html` | https://claude.ai/artifact/8UQJV3EJ9saMbQFbm3oXj9 | https://claude.ai/artifact/SMasewjdiuhsScjLCuUsDK |
| 3 | 40s | `false-awakening-scene3.html` | `false-awakening-scene3-short.html` | https://claude.ai/artifact/QSAsBiU75XqWzUWVeu5aDG | https://claude.ai/artifact/NTyDbqEVTQnqwqJXH9DFDw |
| 4 | 40s | `false-awakening-scene4.html` | `false-awakening-scene4-short.html` | https://claude.ai/artifact/AHnm5G64widJe34yZuviGu | https://claude.ai/artifact/NW4fNjVMhtPWqdKiVWRfww |
| 5 | 46s | `false-awakening-scene5.html` | `false-awakening-scene5-short.html` | https://claude.ai/artifact/EQksqDyXM26fvsnJ1D3B6k | https://claude.ai/artifact/QE8US5v4KBQrUUWbHxbX3K |

Total: about 3 min 42 s. Screenshots are in `screenshots/fa/` (Scene 1) and `screenshots/fa2/`, `fa3/`, `fa4/`, `fa5/`.

Ignore these older experiments: `scene1.html`, `scene1-v2.html`, `scene1-v2-short.html`, `screenshots/v2/`, `screenshots/scene1_*.png`.

## The story (from the creator's script)

Ethan dreams about his dead dad. He wakes up and tells his mom, then realises it is still a dream. Every time he wakes, it is another dream. In dreams he always has an extra finger. He is trapped, cannot scream, cannot breathe. He wakes gasping with a dark figure on top of him and cannot move. He closes and opens his eyes and nobody is there. His fingers are normal. He drinks water, sees 3 AM, the lights go off, and two shining eyes appear under the bed. THE END.

## What each scene shows now

- **Scene 1**: made by Claude Desktop, kept as the creator likes it. Short dream hallway, porch with Dad (back to camera): "Ethan... you're late." / "Dad...?" / "Don't stay too long, buddy." Dad close-up (he holds a mug here, the creator wants it kept), whiteout, wake up (fan, 07:12), run to kitchen, kitchen lines with Mom, clock detail, Ethan close-up "...This is a dream.", Mom "Then wake up, Ethan.", lights die.
- **Scene 2**: kitchen "This is a dream. Wake up!", two face slaps "Come on... wake up!", endless hallway trip, wake at 07:12 rubbing face "It was just a dream. Just a dream.", bathroom mirror (Ethan and reflection both still, reflection grins, then lunges screaming, Ethan jolts, lights die), wake at 03:33 "Ethan! Breakfast!" (Dad), dark hallway, Mom, Dad and Ethan seated at the table with full bodies, backs to camera, Dad's head turns, sting, "...Dad?", trembling hands "Okay. I'm awake. I'm awake."
- **Scene 3**: hands calm "Okay...", counts fingers with a glowing ring on each fingertip (no pointing hand), sixth turns red "...Six.", close-up "Six fingers..." / "I'm still dreaming.", overhead in bed trying to get up three times "Get up..." / "Get up!" / "I can't move.", silent scream on the pillow (all sound cuts, subtitle "MOM! HELP ME!" loses its letters), vision closes on the ceiling fan to black.
- **Scene 4**: wakes gasping at the dark ceiling, paralysed close-up (only eyes move) "...I can't move.", POV down his chest: faceless black figure crouched on him against the moonlit window, leans in, dark fingers creep onto his forehead, eyes squeezed shut "It's not real. It's not real.", eyes open, nobody there, relief, counts five normal fingers in moonlight "One... Five." / "...Five.", fade to black.

## Scene 5 (v2 BUILT, waiting for the creator's feedback)

Creator feedback on v1: "he gets up, feels relieved, looks at the time, goes back to sleep again. As he lays down to sleep and the lights are off we see the 2 eyes under the bed."
v2 beats (now 46 s, built, screenshots taken, play test and full playthrough passed, same artifact links as v1): 0-7.5 sits on bed edge, lamp on, "...Okay." / 7.5-11.5 takes the glass / 11.5-17 drinks, relieved, "It's over. I'm awake." / 17-19 glass down / 19-22.5 clock 02:59 to 03:00 (calm) / 22.5-25.5 tired relieved face "...3 AM." / 25.5-35 wide: "Back to sleep.", he pulls the lamp off himself, lies down in the dark, closes his eyes, camera drifts to the gap under the bed, two eyes open / 35-37.5 floor-level, eyes under the bed blink (no feet) / 37.5-39.6 eyes narrow and rush in / 39.6-46 THE END. (The eyes part was cut from about 9 s to about 5.8 s because the creator said it stayed on too long.)
Removed from v1: power cut and flicker, "...Mom?", the creak, his feet in the under-bed shot.
v2 fix: in the long version the arm picking up the glass looked like a floating hand (the arm's base rose into view). Now the arm comes from the bottom-right corner, he lifts the glass back toward himself off the right edge, and the short crop pans right to follow it (`standClose`, `shortCx`).

Scene 5 code notes: helpers `lampL(D)` (lamp on from `LAMP_ON=3.75` to `LAMP_OFF=28.1`), `alarmClock` (7-segment digits via `seg7`, stays on all scene), `glassAt` (water stays level when tilted), `lampAt` (pull chain), `armIK`, `sitter` (Ethan sitting on the bed edge facing camera, full body, bare feet), `roomWide` (wide bedroom; `ethan.lying` draws him asleep with his face toward camera on the pillow, `eyes` draws the eyes in the gap under the bed), `faceSit` (chest-up shot), `sleepWide` (lamp off, dissolve to lying at `LIE=29.35`, push in to the gap, eyes open at `EYES=33.8`), `underBed`, `eyesClose`, `glowEyes`, `theEnd`. `FLIP=20.5` is when the clock shows 03:00. Short version picks the crop centre per shot with `shortCx(D)`. The glowing eyes narrow at the end; a crescent grin was dropped because it read like eyebrows. Lying sideways with a rotated face was tried and dropped; he now lies with his face toward the camera. "THE END" uses Dela Gothic One (falls back to Impact).

### Original Scene 5 notes from the script

- He drinks water.
- Clock shows 3 AM.
- Lights go off.
- Two shining eyes under the bed.
- THE END.

Scene 4 ends in his bedroom at night, so Scene 5 can start there. The Scene 4 figure has no eyes on purpose, so the shining eyes are new. Keep it about 40 to 50 seconds. Run the beat plan past the creator before building, the same way Scenes 3 and 4 were done.

## Creator's rules and preferences (all collected so far)

- Style: the Claude Desktop Scene 1 look. Flat 2D cutout, thick dark outline `#1c1e26`, grain, vignette, black bars, subtitles in the bottom bar.
- **No eyebrows** on any character.
- **No lines beside the eyes** (they read as eyelashes).
- **No voices**: dialogue is subtitles only. Other sound is synthesised (drones, heartbeat, stings, ticks, gasps).
- Subtitle colours: Ethan `#ffb05a`, Dad `#f0c987`, Mom `#e8b0b8`. Name and line same size.
- Hallways short. Plain, simple language. No em dashes in on-screen text. American characters.
- Ethan seen from behind shows his spiky hair (already fixed in all four scenes).
- When characters are seen together in a wide shot, show full bodies with legs.
- Always make both long (16:9) and short (9:16) versions.
- Show the creator screenshots after each scene and fix what they flag before moving on.

## How the code is built

- Each scene file was made by copying the previous scene and replacing the scene section. Shared parts in every file: `faceAt` (front face), `headBack` (back of head), `person` (full body rig), `hall` (pseudo 3D hallway), `bedroomWorld(tt,camY,camX,txt)`, `kitchenSet`, `withBlur`, grain, subtitles, `composeShort`, audio engine (`nz`, `swell`, `thump`, `bell`, `sting`, `EVT` timed events, `audioUpdate`).
- Scene 3 and 4 add `bigHand` (open hand with any finger count; returns fingertip points), `torsoAt`, `lids` (eyelids), `sayOpen` (mouth moves while an ETHAN subtitle is showing).
- A scene is a `render(D)` that picks a shot function by time, plus a `SUBS` list `[start, end, NAME, text, colour]` and an `EVT` sound list.
- **Short version**: the same file with `<html lang="en" data-format="short">` added at the top (or `?format=short` in the URL). It draws each frame at 16:9 then crops a vertical slice; `shortFx(D)` says where to centre the slice per shot. Make the short file from the long one with:

  ```
  sed 's/^<title>False Awakening Scene 4<\/title>/<html lang="en" data-format="short">\n<title>False Awakening Scene 4 Short<\/title>/' false-awakening-scene4.html > false-awakening-scene4-short.html
  ```
- The page exposes `window.__seek(t)` to render any moment, used for screenshots.

## Testing that worked

- Screenshots: Playwright with Chromium at `/opt/pw-browsers/chromium`, open the file, hide `#big`, call `__seek(t)`, screenshot the `#c` canvas.
- Play test: click `#big`, then set the `#sc` slider to several times so every sound cue fires, and check for page errors. This caught a bug (missing `easeOut` in Scene 4) that still frames missed, so always run it.
- Sound has never been listened to by Claude, only checked for errors. Ask the creator to listen.
