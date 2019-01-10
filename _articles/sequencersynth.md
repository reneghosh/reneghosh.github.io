---
layout: article
title:  "A sequencer synth in FoxDot"
date:   2019-01-10 00:33:00 +0200
categories: articles, music
keywords: Music, René Ghosh, live coding
---

# A sequencer synth in FoxDot

_René Ghosh, 10/01/2019_

One of the difficulties I find in live coding music is to make a melody
come together while having to think separately about note pitch and duration in
distinct lists. I've written about the [stemel](https://github.com/satelliteray/stemel)
library for generating musical patterns from a score format in a step sequencer formalism.
Here I'm going to present a simplified version of it, focusing more on a more FoxDot-y
player function.

What I want to do is to have a multi-voice sequencer that takes a score as a string,
a list of synths on which to play each voice, a list of players to pipe them to, and
the duration of each sequencer step.

So, what I want is to be able to write:

```python
play_sequencer("00000---/77*A5577/AA>>00<AA>00", [bass,sitar,feel], [b1,b2,b3], step=0.5)
```

In the function call, there's the bass playing `00000---`, or 4 short notes and one long one,
the sitar playing `77*A5577` and the feel playing `00<AA>00`. The players used to
channel the sound will be players `b1`,`b2` and `b3`.

In the score interpreter, I'll use the following conventions:
- `0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`A`,`B` are notes 0 to 11,
- `>` and `<` mean up-octave and down-octave for all following notes,
- `*` is a rest,
- `-` prolongs the preceding note by one step,
- `/` ends the score for the current voice and starts a new voice.

I need to translate the score into lists of pitch and duration. Here's the
function to do so:

```python
def generate_sequencer(stream, step):
    notes = ['0','1','2','3','4','5','6','7','8','9','A','B'] #basic notes
    octave = 0 #starting octave
    score = [[]] #empty score, no voices
    voice_cursor=0
    note_cursor=-1
    seq_length = 0
    for c in stream:
        if c=='/':
            score.append([]) # add a new voice to the sequencer
            voice_cursor += 1
            note_cursor=-1
        elif c=='*':
            score[voice_cursor].append([-1,rest(step)]) #add a rest
        elif c=='-':
            score[voice_cursor][note_cursor][1]+=step #increment previous note's length
        elif c=='>':
            octave += 1 # up octave
        elif c=='<':
            octave = octave - 1 if octave >0 else 0 # down octave
        elif c in notes:
            score[voice_cursor].append([notes.index(c)+12*octave,step]) #add note
            note_cursor+=1
        if len(score[voice_cursor])>seq_length:
            seq_length=len(score[voice_cursor])
    transposed_score = []
    for voice in score: #group pitch with pitch, duration with  duration
        transposed_voice = []
        transposed_score.append(transposed_voice)
        for i in range(0,2):
            transposed_voice.append(list(map(lambda x: x[i],voice)))
    return transposed_score
```

So, for example, if I run this function on `"00-->7*"`, it gives me `[[[0, 0, 19, -1], [1, 3, 1, <rest: 1>]]]`.

The next step is to send these musical patterns to synths. This is simply
a question of taking the synths and players as parameters to a function that
will apply a synth to each voice, on one player:

```python
def play_sequencer(input, synths, players, step=1):
    patterns = generate_sequencer(input, step)
    for index, [pitches, durations] in enumerate(patterns):
        players[index % len(players)] >> synths[index % len(synths)](pitches, dur=durations)
```
This is the sequencer player.

It wouldn't be interesting if I couldn't tweak the sound of each synth.
In FoxDot, synths are functions, so to apply distinct effects to each synth,
I have to partially evaluate it with the desired effects. In functional programming terms,
this is known as currying. To do this I'll import the python library that enables partial evaluation:

```python
from functools import partial
msitar = partial(sitar, mix=0.3, room=0.4, echo=0.5)
mbass = partial(bass, mix=0.1, room=0.4)
mfeel = partial(feel, tremolo=4)
```
And now I can use my pythonic step sequencer:

```python
Scale.default="chromatic"
play_sequencer("00000---/77*A5577/AA>>00<AA>00", [mbass, msitar,mfeel], [b1,b2,b3], 0.5)
```

Happy FoxDoting!
