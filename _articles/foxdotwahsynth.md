---
layout: article
title:  "A wah synth in FoxDot"
date:   2018-12-20 15:49:00 +0200
categories: articles, music
keywords: Music, Paris, René Ghosh, live coding
---


# Making a "wah" synth in FoxDot

_René Ghosh, 20/12/2018_

Possibly from growing up in the seventies, I have a deep affection for the wah
sound. Anyways, I was trying out various synths and effects in [FoxDot](http://foxdot.org/)
and couldn't find anything that approximated this awesome sound. The beauty of using
FoxDot is that, is you're not happy with any of the out-of-box synths, you can easily
make your own.

## Making warpy

As a starting point, I used the arpy synth, which looks like this:

```

arpy = SynthDef("arpy")
arpy.freq = arpy.freq / 2
arpy.amp  = arpy.amp * 2
arpy.freq = arpy.freq + [0,0.5]
arpy.osc  = LPF.ar(Impulse.ar(arpy.freq), 3000)
arpy.env  = Env.perc(sus=arpy.sus * 0.25)
arpy.add()

```
Basically, it takes a pitch, adds another one at half-frequency, converts
it into an impulse oscillator and pushes it out with a percussive enveloppe.
This is perfect to add a wah to.

Here's my version of arpy + wah, which I've tentatively named "warpy".
Starting from the same code base, I stretched the envelope to the full
sustain length, then modulated the oscillator with a low-pass filter that
shifts in time from two functions:
- LFNoise1, to add some randomness to each note played
- XLine, to make the filter's frequency threshold move up exponentially as the note is played.
This is what produces the characteristic "wah" sound.

I added some distortion to the signal to dirty it up a little.

```
with SynthDef("warpy") as warpy:
  warpy.freq = warpy.freq / 2
  warpy.amp  = warpy.amp * 2
  warpy.freq = warpy.freq + [0,0.5]
  warpy.osc  = LPF.ar(Impulse.ar(warpy.freq), 3000)
  warpy.env  = Env.perc(sus=warpy.sus * 1.00)
  warpy.osc = RLPF.ar(warpy.osc,
    LFNoise1.kr(warpy.sus,warpy.freq*3,warpy.freq*3)
    +XLine.kr(30,warpy.freq*3, warpy.sus), 0.07, 10).distort*1.25
```

## So what does it sound like?

To demonstrate the effect, here is a short recording of a riff done
with both arpy and warpy:

```
Scale.default = "chromatic"

b1 >> arpy([12,7,12,7,10,10,7,10,7], dur=[1,1,1,1,0.5,.5,1,1,1], oct=4)

b1.stop() #listen to the arpy version, then warpy

b1 >> warpy([12,7,12,7,10,10,7,10,7], dur=[1,1,1,1,0.5,.5,1,1,1], oct=4)
```

Played with arpy, it sounds like this:

<audio controls><source src="../recordings/arpy.mp3" type="audio/mpeg"><source src="../recordings/arpy.ogg" type="audio/ogg"></audio>

This is what the same riff sounds like in warpy:

<audio controls><source src="../recordings/warpy.mp3" type="audio/mpeg"><source src="../recordings/warpy.ogg" type="audio/ogg"></audio>

## Conclusion

Anyone making music in FoxDot will want to customize the instruments to
their own liking and make a characteristic sound. Beyond changing the
effects stack to achieve this, it's relatively easy to make one's own
library of custom synths. It just takes a little experimentation.

Happy FoxDoting!
