---
layout: article
title:  "SteMeL: a music notation file format"
date:   2018-11-04 12:34:00 +0200
categories: articles
keywords: Music, Paris, René Ghosh, live coding
---

# SteMeL: a music notation file format

_René Ghosh, Nov. 4 2018_

Does the world need another music notation format, though?

Not so long ago you chose between sheet music or guitar tablature. The latter
was tricky because it only really _alluded_ to note duration. But with the rise
of electronic music, more formats have come into being.

There's a difference between _music notation systems_ and _music notation file formats_.
You couldn't feed guitar tablature to a program and expect it to correctly interpret
it to output music. Conversely, you wouldn't expect any person to write music directly
into a MIDI file from a text editor.

However, with the emergence of live coding environments such as [Supercollider](https://supercollider.github.io/), [Sonic Pi](https://sonic-pi.net/)
and others (check out the list at [https://github.com/toplap/awesome-livecoding](https://github.com/toplap/awesome-livecoding)),
there is a need for a way of representing music both as human-readable while retaining
the capacity to be directly translated into music. This is very much analogous to the
emergence of markdown as a text format that hit the right balance between human
readability and presentation formatting.

Recently, I've been playing around in Sonic Pi, Supercollider and FoxDot. I'm not
looking to become a DJ anytime soon, but I do like representing my music as
pure-code-in-a-text-file, which allows for a whole level of richness and ease in
manipulating the sound algorithmically through the application of functions and
transforms.

Music is basically about playing lists of notes. But there's a lot of information
associated with that. When you consider any sequence of notes, you're looking at
information in various dimensions:

- **Frequency**. This is the pitch of the note. It's expressible in Hertz, or
vibrations per second. In MIDI, the note is a number representing a range of
half-tones above a base note.
- **Duration**. How long each note lasts. This is tricky, because you might want
to relate not only the length of the note, but each part of its envelope:
the attack, decay, sustain and release phases of the canonical adsr envelope. Also,
duration is often confused with sustain, though they are two different things.
- **Amplitude**. How LOUDLY each note is played.
- **Slide**. The effect where a note has no fixed start but emerges as the
_sliding_ up or down of the pitch of the note preceding it.
- **Various effects**. These can be anything. To name a few: distortion,
flanger, phaser, tremolo, vibrato, auto-wah.  
- **Shifts**. Slight variations in pitch, amplitude or time position
- …

A musical note packs a _lot_ of information. It would be great to be able to
represent all of it in a single text representation, but that might make it
either impossibly obscure or so wordy as to be unusable as a coding language.

Most livecoding environments take the safe route of separating a melody into
separate lists for pitch, duration, amplitudes, sustain and any other parameter
that might change over the course of the melody. Although this approach allows
for good separation of concerns, it makes it harder to think about a melody on a
more natural level, with pitches, durations and amplitudes all mixed together and
perhaps notions of chords or counterpoint mixed in there.

I looked around for existing formats that I might use in livecoding with a bit
of adapter code, and didn't find anything that suited my needs. One code representation
that's user-friendly to write in is [MML](https://en.wikipedia.org/wiki/Music_Macro_Language),
or Musical Macro Language. The format has undergone quite a few generational rebirths
over the years and is simple to use. It has certain drawbacks that I'd rather forego though:
notably the way note duration and sustain are blurred, supporting a formalism
to represent chords but nothing to support general polyphonies.

I wanted to be able to write something as terse as MML, while simultaneously retaining
all the freedom of polyphony I get from using step sequencers such as [Caustic](http://www.singlecellsoftware.com/caustic).

The result is the Step Sequencer Music Language, or SteMeL for short. I'm sure
the name could use some work. The language spec and reference implementation are
up at the SteMeL page: [https://github.com/reneghosh/stemel](https://github.com/reneghosh/stemel).

Here's what the canonical "Mary had a Little Lamb" looks like in SteMeL:

```
l2 4__,-12_2,-12_2,2,l1 0,2,4/-12_4,4,4_,,2/-19_2,2,2_/-19_4,,
4/-12_2,7,7_/-10_4,,l2 4__,-12_4,,2,l1 0,2,4/-12_4,4,4,4,2/-19_4,
2,4,2,0_4/-12_4,*3
```

And this is what it sounds like:

<audio controls><source src="../recordings/SC_181104_134542.mp3" type="audio/mpeg"><source src="../recordings/SC_181104_134542.ogg" type="audio/ogg"></audio>
