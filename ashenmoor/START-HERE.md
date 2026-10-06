# The Lamplighter of Ashenmoor: start here

Everything for the series is in this folder. Nothing needs the Claude cloud.

## What is where

| Folder / file | What it is |
|---|---|
| `ashenmoor-master-project-file.md` | Series bible and canon tracker. Read this first. |
| `ashenmoor-lore-and-easter-eggs.md` | Crypt lore lock and the easter egg tracker. |
| `HANDOFF.md` | How the episode pages are built, every decision you have made, and a prompt to start a new chat. |
| `ashenmoor-episode-1/2/3.md` | The scripts, matching the finished videos. Episode 3's file also has the Episode 4 plan. |
| `ashenmoor-episode-1/2/3.html` | The episodes as pages. Double-click to watch in a browser. |
| `ashenmoor-episode-1/2/3.mp4` | The finished videos. |
| `thumbnails/` | Two thumbnails per episode. |
| `assets/sprites/sprites-hd.json` | **The official hand-drawn cast** (Wick, Bram, Gloomhound, Sentry, Sir Oswin). Episode 3 onward uses these. |
| `assets/sprites/sprites.json` | The old 1x sprites (Episodes 1 and 2 only). |
| `assets/fonts/anton.woff2` | The thumbnail font. |
| `tools/` | `export-mp4.js` (page to MP4), `render-thumbnails.js` and the thumbnail pages. |
| `sprites-hd-preview.png`, `sprites-hd-lineup.gif` | Reference pictures of the cast. |

## Keep the look consistent

- Build each new episode by copying the latest page (`ashenmoor-episode-3.html`) and changing only the scenes, subtitles, sounds and choice. That keeps the engine, colours, sprites, subtitle style and pacing identical.
- Use only the hand-drawn sprites in `sprites-hd.json`. Never auto-generate or upscale sprites. A new pose is drawn by hand once and added to that file.
- The rules you set are listed in `HANDOFF.md` under "Decisions the creator has made" (tight pace, subtitles never cover a character, lantern at his side or chest, "Comment A or B" only, Atkinson Hyperlegible font, no em dashes, and so on).

## Continuing with another Claude chat

Start the chat by attaching `HANDOFF.md`, `ashenmoor-master-project-file.md`, `ashenmoor-lore-and-easter-eggs.md` and `ashenmoor-episode-3.html` (plus `assets/sprites/sprites-hd.json`), then paste the prompt at the top of `HANDOFF.md` with your next script. If you use Claude Code on your own computer, open this folder in it instead.

## Making the MP4 and thumbnails on your own computer

You need three free tools, once:

1. Node.js (from nodejs.org).
2. ffmpeg (from ffmpeg.org; it must work when you type `ffmpeg` in a terminal).
3. In a terminal, inside the folder that contains this `ashenmoor` folder:
   ```
   npm i playwright
   npx playwright install chromium
   ```

Then, from that same folder:

```
node ashenmoor/tools/export-mp4.js ashenmoor/ashenmoor-episode-4.html ashenmoor/ashenmoor-episode-4.mp4
node ashenmoor/tools/render-thumbnails.js thumbnails-ep4.html 4
```

(For thumbnails, copy `tools/thumbnails-ep3.html` to `thumbnails-ep4.html` and change the scenes and text.)

An episode export takes several minutes. The pages load their font from Google Fonts, so stay online while exporting.

## Backup

The same files are on GitHub: repository `Said123irh/demofiles`, branch `claude/dreamy-brown-1pd2wv`, folder `ashenmoor/`. On GitHub you can switch to that branch and use **Code > Download ZIP** to get them again at any time.
