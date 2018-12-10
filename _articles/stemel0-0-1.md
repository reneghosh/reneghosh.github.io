---
layout: article
title:  "on way to releasing alpha version of stemel"
date:   2018-12-10 14:27:00 +0200
categories: articles
keywords: Music, Paris, René Ghosh, live coding
---

# Stemel 0-0-1

_René Ghosh, Dec. 10 2018_

I'm on my way to releasing an alpha version of stemel: 0-0-1.

When I first started coding the stemel parser (note: it's very much cobbled together with regular expressions, but aren't we all?), I was beset by doubts. Beset I tell you! But once I got the first version working and started playing around with it in FoxDot, I realized how much easier it made it to work with polyphonies. Most existing livecoding environments represent note pitch, duration and sustain as separate arrays, which makes it hard not only to think about a polyphony, but also time-consuming to code it.

So, I'm happy with it. Happy enough to want to release it.

The first version is very much simplified from the spec I initially had in mind. No more representation of note amplitudes or slide parameters: leave that to the user/programmer. This version supports a much honed, minimal list of operators:

-  `(number)` inputs a note's midi frequency, and by default this note sounds over one step
- `-` carries the previous note's duration over another step
- `*` represents a rest
- `>` shifts the following notes' pitches up an octave
- `<` shifts them down an octavle
- `/` starts a new voice.

Whitespace is optional, except after a note pitch, because that's a number and you have to keep numbers separate. Any operator can be repeated multiple times.

The upcoming version is written in both python, for use in FoxDot, and ruby, for use in Sonic Pi. I might end up dropping the ruby version because Sonic Pi doesn't work well with ruby libraries (it's pitched as a learning tool users unfamiliar with programming so boxes itself away from  complexity).

I wrote the following composition to spotlight what you can do with stemel:

https://youtu.be/K8xmn9BYRTI

Next up on the roadmap:

- Add filter functions to work with an input buffer: randomization, shuffling, duplicating
- Add support for variable definitions and references, so notes can be grouped into a name and used by reference in other buffers
