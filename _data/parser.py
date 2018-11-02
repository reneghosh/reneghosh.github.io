import re

note_lines = [
    "g50 l4 5-- 7-- 0 0 0 0",
    "g62 l4 0-- 4- l3 9 9 9"
]
for note_line in note_lines:
    words = re.split('\s', note_line.strip())
    base_frequency = 0
    base_length = 1
    for word in words:
        #moving up to a frequency
        if re.match("^g\d+$", word):
            base_frequency = float(word[1:])
        # setting note length
        elif re.match("^l\d+$", word):
            base_length = 1/float(word[1:])
        # setting a note or a rest
        elif re.match("^[\d|\.]", word):
            note_length = base_length
            if re.match(".+?-", word):
                lengths = re.split("-", word)
                for length in lengths:
                    if len(length) == 0:
                        note_length += base_length
                    else:
                        if re.match("^\d", length):
                            note = float(length)
                        else:
                            note = -1
            else:
                if re.match("^\d", word):
                    note = float(word)
                else:
                    note = -1
            if note > -0.5:
                note += base_frequency
            print("%f over %f"% (note, note_length))
