import { getLines } from "../common.ts";
import { getMatchingNumbersForLine } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");

const lines = getLines(input);

const copiesByCard: number[] = [0];

let numCards = 0;

lines.forEach((line, index) => {
  const matches = getMatchingNumbersForLine(line);
  copiesByCard[index] =
    (copiesByCard[index] == null ? 0 : copiesByCard[index]) + 1;

  const copies = copiesByCard[index];

  // console.log(index, copies);

  for (let i = 0; i < copies; i++) {
    numCards++;
    for (let j = 0; j < matches.length; j++) {
      const previousCopies =
        copiesByCard[index + j + 1] == null ? 0 : copiesByCard[index + j + 1];
      copiesByCard[index + j + 1] = previousCopies + 1;
    }
  }
});

console.log(numCards);
