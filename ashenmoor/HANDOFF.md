# Ashenmoor: handoff for a new chat

Paste this to start a new chat:

> Continue my YouTube series "The Lamplighter of Ashenmoor". Read `ashenmoor/HANDOFF.md` on branch `claude/new-session-0096cy` of `Said123irh/demofiles` first. Then build Episode 2 from the script I paste, reusing the Episode 1 page and assets.

## Where things are

Repo `Said123irh/demofiles`, branch `claude/new-session-0096cy`, folder `ashenmoor/`.

| File | What it is |
|---|---|
| `ashenmoor-master-project-file.md` | Series bible: world, characters, rules, animation cost guide, canon tracker. The single source of truth. |
| `ashenmoor-episode-1.md` | Episode 1 script, matching the finished video. |
| `ashenmoor-episode-1.html` | Episode 1 as one self-contained page: pixel animation, subtitles, synthesised sound, player. Artifact: https://claude.ai/artifact/8VYib5wGsEeVo9tznYvE9j |
| `ashenmoor-episode-1.mp4` | Episode 1 exported, 1280x720, 30 fps, H.264 + AAC, 3:49. |
| `wick-sprite-options.html` | The sprite options the creator chose from (option 3, big-head chibi, won). Artifact: https://claude.ai/artifact/92uYeMRbDTrBPF4wa5dtpb |
| `assets/sprites/sprites.json` | Pixel data and palette for Wick (idle, walk1, walk2), Elder Bram and the Gloomhound. |
| `assets/sprites/*.png` | The same sprites as PNG, at 1x and 8x. |
| `tools/export-mp4.js` | Turns an episode page into an MP4. |

## Decisions the creator has made (keep these)

- **Wick is the big-head chibi sprite** (14 x 16 pixels, lantern hand at pixel 10,10).
- **Normal font**, not a pixel font: Atkinson Hyperlegible for subtitles, titles and the choice screen.
- **Call to action is "Comment A or B" only.** Never mention the Community tab.
- **Not the False Awakening style.** Ashenmoor has its own look: pixel art, warm lantern glow against dark blue night.
- Voices are **subtitles** (NARRATOR purple, WICK orange, ELDER BRAM teal) timed to the script, so a recorded voice track can be laid over them.
- Long form 16:9 only, no 9:16 short.
- The creator writes the scripts and sends them; do not write episodes ahead.

## Episode 1 state

- Choice offered: **A: Go down into the crypt** (Dangerous. But might find answers.) / **B: Wake Elder Bram and show him the key** (Safe. But Bram has been hiding something.)
- Winner: not known yet. Ask the creator which option won before building Episode 2.
- Facts on screen: Emberfall has 8 lamps (lamps 1 to 4, 6 and 7 lit by the end), Wick has the glowing crypt key, a half collapsed stair is open under the chapel floor, something breathes down there. Bram has not seen the key yet.

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

### Making Episode 2 cheaply

Copy `ashenmoor-episode-1.html` to `ashenmoor-episode-2.html`, keep sections 2 to 6, 8 to 12, and replace: `SCENES`, the scene functions, `SUBS`, `EVT`, `MUSIC`, the choice options, the title text, and the 10 second "Last time" recap (reuse an Episode 1 scene function as the recap image). Add only one new thing per episode (a character or a location), as the master file says.

## Export to MP4

```
npm i playwright            # once; Chromium is preinstalled in Claude cloud sessions
node ashenmoor/tools/export-mp4.js ashenmoor/ashenmoor-episode-2.html ashenmoor/ashenmoor-episode-2.mp4
```

It renders the soundtrack offline, draws every frame at 30 fps and encodes with ffmpeg. Episode 1 took a few minutes.

## Thumbnails

`thumbnails/episode-1-thumbnail-A.png` ("What's down there?") and `-B.png` ("They hate light.") are new pixel scenes drawn for the thumbnail, not frames from the video. They are drawn in `tools/thumbnails.html` (bigger pixels, x16) with the Anton font in `assets/fonts/`. Edit the scenes or text there, then run `node ashenmoor/tools/render-thumbnails.js`.
