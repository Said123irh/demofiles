# Ashenmoor: handoff for a new chat

Paste this to start a new chat:

> Continue my YouTube series "The Lamplighter of Ashenmoor". Read `ashenmoor/HANDOFF.md`, `ashenmoor/ashenmoor-master-project-file.md` and `ashenmoor/ashenmoor-lore-and-easter-eggs.md` on branch `claude/dreamy-brown-1pd2wv` of `Said123irh/demofiles` first. Episodes 1 to 3 are finished. Build Episode 4 from the script I paste, reusing the Episode 3 page, sprites and export tools. Episode 3 vote winner: [A or B].

## Where things are

Repo `Said123irh/demofiles`, branch `claude/dreamy-brown-1pd2wv` (Episode 1 alone is also on `claude/new-session-0096cy`), folder `ashenmoor/`.

| File | What it is |
|---|---|
| `ashenmoor-master-project-file.md` | Series bible: world, characters, rules, animation cost guide, canon tracker. The single source of truth. |
| `ashenmoor-episode-1.md` | Episode 1 script, matching the finished video. |
| `ashenmoor-episode-1.html` | Episode 1 as one self-contained page: pixel animation, subtitles, synthesised sound, player. Artifact: https://claude.ai/artifact/8VYib5wGsEeVo9tznYvE9j |
| `ashenmoor-episode-1.mp4` | Episode 1 exported, 1280x720, 30 fps, H.264 + AAC, 3:49. |
| `ashenmoor-episode-2.md` | Episode 2 script, matching the finished video, plus the Episode 3 plan for both choices. |
| `ashenmoor-episode-2.html` | Episode 2 page, built on the Episode 1 page. Artifact: https://claude.ai/artifact/K3fp2YPWgkcHz72XJrPhCz |
| `ashenmoor-episode-2.mp4` | Episode 2 exported, 1280x720, 30 fps, H.264 + AAC, 3:02. |
| `ashenmoor-episode-3.md` | Episode 3 script, matching the finished video, plus the Episode 4 plan for both choices. |
| `ashenmoor-episode-3.html` | Episode 3 page, the first on the fine-grid engine with the hand-drawn sprites. Artifact: https://claude.ai/artifact/G9VpKFuybTeu7jXJZ2MzoU |
| `ashenmoor-episode-3.mp4` | Episode 3 exported, 1280x720, 30 fps, H.264 + AAC, 3:51. |
| `assets/sprites/sprites-hd.json` | The hand-drawn fine-grid cast: Wick, Bram, Gloomhound, Sentry (and heap), Sir Oswin (awake and asleep). |
| `ashenmoor-lore-and-easter-eggs.md` | Crypt lore lock and the easter egg tracker, with where each Episode 2 egg appears. |
| `wick-sprite-options.html` | The sprite options the creator chose from (option 3, big-head chibi, won). Artifact: https://claude.ai/artifact/92uYeMRbDTrBPF4wa5dtpb |
| `assets/sprites/sprites.json` | Pixel data and palette for Wick (idle, walk1, walk2), Elder Bram, the Gloomhound and the Bone-Wight Sentry (pile, idle; sword angles for raise and slam). |
| `assets/sprites/*.png` | The same sprites as PNG, at 1x and 8x. |
| `tools/export-mp4.js` | Turns an episode page into an MP4. |

## Decisions the creator has made (keep these)

- **Hand-drawn fine-grid sprites (approved look, Oct 2026).** `assets/sprites/sprites-hd.json` holds Wick (idle, walk1, walk2), Elder Bram, the Gloomhound (walk1, walk2), the Bone-Wight Sentry (idle, pile) and Sir Oswin (idle, sleep). One sprite pixel is half a world pixel, so they keep their on-screen size; draw them with a 0.5 scale. Never generate sprites automatically (upscale plus code shading looked worse); new poses are drawn by hand once and added to that file. Episodes 1 and 2 still use the old 1x sprites in `sprites.json`.

- **Keep the pace tight.** Episode 2's first cut (4:06) felt stretched; the creator asked for a faster one (now 3:02). Recap plus title about 13 seconds, short gaps between lines, quick walks, cut narration that only repeats what is on screen.
- **Subtitles never cover a character.** The subtitle box is compact and low (bottom 155 of the 180 pixel rows); frame every shot so characters stand above it (z2 shots use camera y 82 so the ground sits at row 132). Glowing (`EM`) layers such as the murals must not overlap a character, or they draw over them.

- **Wick is the big-head chibi sprite** (14 x 16 pixels, lantern hand at pixel 10,10).
- **Normal font**, not a pixel font: Atkinson Hyperlegible for subtitles, titles and the choice screen.
- **Call to action is "Comment A or B" only.** Never mention the Community tab.
- **Not the False Awakening style.** Ashenmoor has its own look: pixel art, warm lantern glow against dark blue night.
- Voices are **subtitles** (NARRATOR purple, WICK orange, ELDER BRAM teal, SENTRY ice blue) timed to the script, so a recorded voice track can be laid over them.
- Long form 16:9 only, no 9:16 short.
- The creator writes the scripts and sends them; do not write episodes ahead.

## Episode state

- Episode 1 winner: A (crypt). Episode 2 winner: B (talk to it).
- **Episode 3** choice: **A: Free Oswin.** / **B: Hear the Sentry first.** Winner: not known yet. Ask the creator before building Episode 4.
- Facts on screen at the end of Episode 3: Wick, the Sentry (sword sheathed, helmet slipped over one eye) and Sir Oswin are in the small round room behind the Queen's door. Oswin sits on his stone bier, awake, held by an oath chain of pale light at his ankle. Wick holds the lantern out toward the chain. The Sentry has stepped forward: there is something he has not told Wick. The white moth went into a crack in the wall. The stair is still gone.

## How an episode page is built (`ashenmoor-episode-1.html`)

Everything is drawn into a 320 x 180 pixel frame, lit, then scaled x4 to 1280 x 720. Text is drawn at full size on top. Sections in the script, in order:

1. **scene list** (`SCENES`): start time, name and blurb for the clickable list under the player.
2. **camera and pixel helpers**: `cam(x,y,zoom)` (use whole-number zoom 1, 2 or 4), `R()` draws a pixel rectangle, `light(x,y,radius,strength,cool)` adds a light, `EM.push(fn)` draws something that glows (drawn after the darkness).
3. **sprites**: palette `PAL`, Wick (`WTOP`, `WLEG`), `BRAM`, `HOUND`. Same data as `assets/sprites/sprites.json`.
4. **characters**: `wick(x, groundY, t, {flip, walk, lift, talk, shake, crouch, bright, key})`, `bram()`, `hound()`, `key()`.
5. **the village of Emberfall**: world is 480 x 180, ground at y 148, lamp x positions `LX`. `village(t, {nk, lit(i), lean(i), bramDoor})` draws sky, hills, houses, Bram's house, well, chapel, forest and lamps. `fog()`.
6. **lighting pass**: `lightPass(darkness, t)` darkens the frame, cuts holes for lights in steps (the pixel-art banding), then draws glowing things.
7. **one function per scene**: `sceneTitle`, `sceneDusk`, `sceneStrange`, `sceneForest`, `sceneChapel` (chapel interior with the stair cutaway).
8. **subtitles** (`SUBS`: start, end, speaker, line) and `talking()` which moves mouths while a line is on screen.
9. **overlays**: title card text, `choiceScreen()` with the two options.
10. **master render**: picks the scene for the time, scales up, fades (`blackAt`), screen shake.
11. **audio**: all synthesised. `EVT` one-off sounds by time, `MUSIC` one pattern per scene, wind, footsteps, crickets.
12. **UI**: player controls, plus export hooks `__drawAt` and `__renderAudio`.

The timeline is written in "story time" (0 to 240, matching the script draft). Playback skips story time 159 to 170 (`story()` / `play2()`), which makes the video 3:49. For a new episode, write timings directly and set `story=x=>x`, `play2=x=>x`, `LEN` = episode length.

### How Episode 2 is built (`ashenmoor-episode-2.html`)

Same engine as Episode 1, timings written directly (`story=x=>x`, `LEN=182`). Added on top:

- `sentry(x, groundY, t, {rise, sw, drop, eyes, shake, talk})` and `sword()`: the Bone-Wight Sentry. `rise` 0 is the armour heap, 1 is standing. `sw` is the sword angle.
- `wick()` gained `hop` (jump back) and `kg` (key glow); the lantern stick stretches when `lift` is above 1.
- The crypt hall: `HALL` (stone wall, floor, pillars), `MUR` (the three murals, a dim copy and a gold copy that fades in), `FIG` (the seven heroes), `door({sym, gap})`, `hall()`, and `voidDark()` (the black that ate the stair, drawn after the light).
- `beat(t)`: one double heartbeat every 1.4 s, shared by the lantern, the key, the door light and the thump on the soundtrack.
- The recap reuses `sceneForest` and `sceneChapel` from Episode 1 as short clips; `NOTALK` stops mouths moving in them.
- Overlays: `recapText` (LAST TIME and YOU CHOSE A), `nameCard` (one new character with its tag), `carvingText`, and the white impact flash in `render()`.

### How Episode 3 is built (`ashenmoor-episode-3.html`)

Same engine, but the pixel frame is 640 x 360 (`LW`, `LH`) and `cam()` doubles the zoom internally, so one world pixel is still the same size on screen while the sprites can use half pixels. Backgrounds are unchanged. New pieces:

- `HDS` is `sprites-hd.json` pasted in. `sprH()` draws a sprite at half scale, `RH()` draws a half-pixel rectangle, `PH()` draws in sprite pixels relative to a sprite (and mirrors it).
- `wick()` on the new sprite. The lantern hangs at his side or chest only: `lift` -0.8 to 1, never above his head. Also `keyUp` (key held up), `swing`, `hop`.
- `sentry()` adds `flip`, `tilt`, `slip` (helmet over one eye), `noSword`. `swordH()` draws the sword in half pixels and stops at the floor.
- `oswin(x, groundY, t, {pose: 'lie'|'sit'|'stand', eyes, shake})`: drawn after the dark, slightly see-through. `chain()` is the oath chain. `moth()` is the Pale Warden's moth.
- `openDoor()` (the Queen's door swinging in, gold light kept low) and `room()` (the round room and the bier).
- `beatOf`/`beatP`/`ringPhase`: the lantern heartbeat, and the ring that speeds up smoothly.
- The recap reuses Episode 2's scene functions, which are kept in the file.
- Exporting takes longer than before (4x the pixels per frame).

### Making the next episode cheaply

Copy the latest episode page (now `ashenmoor-episode-3.html`) to the new episode, keep the engine sections, and replace: `SCENES`, the scene functions, `SUBS`, `EVT`, `MUSIC`, the choice options, the title text, and the 10 second "Last time" recap (reuse an Episode 1 scene function as the recap image). Add only one new thing per episode (a character or a location), as the master file says.

## Export to MP4

```
npm i playwright            # once; Chromium is preinstalled in Claude cloud sessions
node ashenmoor/tools/export-mp4.js ashenmoor/ashenmoor-episode-3.html ashenmoor/ashenmoor-episode-3.mp4
```

It renders the soundtrack offline, draws every frame at 30 fps and encodes with ffmpeg. Each episode takes a few minutes. In a Claude cloud session Playwright is installed globally, so run it with `NODE_PATH=$(npm root -g)` in front.

## Thumbnails

`thumbnails/episode-1-thumbnail-A.png` ("What's down there?") and `-B.png` ("They hate light.") are new pixel scenes drawn for the thumbnail, not frames from the video. They are drawn in `tools/thumbnails.html` (bigger pixels, x16) with the Anton font in `assets/fonts/`. Edit the scenes or text there, then run `node ashenmoor/tools/render-thumbnails.js`.

Episode 2 thumbnails: `thumbnails/episode-2-thumbnail-A.png` ("NONE MAY PASS." with a "FIGHT OR TALK?" badge, the Sentry over Wick) and `-B.png` ("THAT'S MY LANTERN?!", Wick beside the Queen's portrait). They are drawn in `tools/thumbnails-ep2.html`; render with `node ashenmoor/tools/render-thumbnails.js thumbnails-ep2.html 2`. For a new episode, copy that page and pass its number.

Episode 3 thumbnails: `thumbnails/episode-3-thumbnail-A.png` ("HE'S AWAKE!" with a "100 YEARS ASLEEP" badge, Oswin sitting up on his bier) and `-B.png` ("SKELETON FRIEND?" with a "YOU VOTED: TALK" badge, the Sentry saluting with his helmet over one eye). Drawn in `tools/thumbnails-ep3.html` with the hand-drawn sprites (the renderer now also passes `sprites-hd.json` as `window.SPRITES_HD`); render with `node ashenmoor/tools/render-thumbnails.js thumbnails-ep3.html 3`.
