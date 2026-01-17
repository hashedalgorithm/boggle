## First part

### Word List Score Function:

```typescript
// game-controller-context.tsx

const calculateScore = (words: string[]) =>
  words.reduce((total, currentValue) => {
    if (currentValue.length <= 4 && currentValue.length >= 3) return total + 1;
    if (currentValue.length <= 5) return total + 2;
    if (currentValue.length <= 6) return total + 3;
    if (currentValue.length <= 7) return total + 5;
    if (currentValue.length >= 8) return total + 11;
    else return total;
  }, 0);
```

### Multiplayer Score Function:

```typescript
// game-controller-context.tsx

const addWordToPlayerInventory = async (playerId: string, word: string) => {
    if (word.length < 3) {
      toast.warning("Word length should be minimum 3!");
      return;
    }

    if (Object.keys(state.players).length > 1) {
      const wordsFoundSoFar = getAllWordsFoundedSoFar();

      if (wordsFoundSoFar.includes(word)) {
        toast.warning("Found already! Try again!");
        return;
      }
    }

    // The traced word will be sent to the server and checked against the given word list.
    const resp = await validateWord(state.language, word);
    ...
  };
```

There is this edge case on deciding to whom the score should be rewarded in case of multiple occurrences. For eg. Player 1, 2 and 3 traces same word, then the score should be given to the player who found it first. So I made a logic where whenever a word is traced (in multiple player setup), the word will be cross checked with the words that are found so far by other players. 

## Second Part

Technology: Nextjs 16 with typescript.
Design system: Shadcn UI - https://ui.shadcn.com/

I have implemented almost all features except for features that are mentioned below.

- Computer opponent

Source Code : https://github.com/hashedalgorithm/boggle
Drive: https://drive.google.com/file/d/17mlQI04LrugY3cIrbiaPp8vd-5grtYAf/view?usp=drive_link
