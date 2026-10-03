#!/bin/bash
# Builds False-Awakening-long-16x9.mp4 and False-Awakening-short-9x16.mp4 from the five scene files.
# Run from the repo root: render/build.sh   (work files go to render/work, which is not committed)
# Delete render/work/aN.webm, vlN.mp4, vsN.mp4 for any scene you changed, or the whole folder, before rebuilding.
set -e
D=$(pwd); R=$D/render; W=$R/work; mkdir -p $W
export NODE_PATH=$(npm root -g)
cd $W
for i in 1 2 3 4 5; do
  [ -s a$i.webm ] || node $R/audio.js $D/false-awakening-scene$i.html $W/a$i.webm   # plays in real time
done
for i in 1 2 3 4 5; do
  [ -s vl$i.mp4 ] || node $R/frames.js $D/false-awakening-scene$i.html $W/vl$i.mp4 30
  [ -s vs$i.mp4 ] || node $R/frames.js $D/false-awakening-scene$i-short.html $W/vs$i.mp4 30
done
for k in l s; do
  rm -f list$k.txt
  for i in 1 2 3 4 5; do
    len=$(ffprobe -v error -show_entries format=duration -of csv=p=0 v$k$i.mp4)
    ffmpeg -y -hide_banner -loglevel error -i v$k$i.mp4 -i a$i.webm -map 0:v -map 1:a -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
      -af "apad,alimiter=limit=0.89:level=false" -t $len -c:a aac -b:a 192k -ar 48000 -ac 2 m$k$i.mp4
    echo "file 'm$k$i.mp4'" >> list$k.txt
  done
done
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i listl.txt -c copy -movflags +faststart "$D/False-Awakening-long-16x9.mp4"
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i lists.txt -c copy -movflags +faststart "$D/False-Awakening-short-9x16.mp4"
echo BUILD DONE
