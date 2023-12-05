import { getMatchingNumbersForLine } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n").filter((l) => l.length > 0);

const total = lines.reduce((acc, line) => getLineScore(line) + acc, 0);

console.log(total);

function getLineScore(line: string) {
  const matches = getMatchingNumbersForLine(line);

  return matches.length > 0 ? 2 ** (matches.length - 1) : 0;
}
