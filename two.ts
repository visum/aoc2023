const input = await Deno.readTextFile("./input.txt");

import { matchers } from "./matchingTrie.ts";

export type TrieNode = {
  char: string;
  children: TrieNode[];
  value?: number;
};

const lines = (input as string)
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => {
    const lineNumbers = parseNumbers(line);
    return parseFloat(
      `${lineNumbers[0]}${lineNumbers[lineNumbers.length - 1]}`
    );
  });

function parseNumbers(input: string): number[] {
  const matches = input.split("").map((_, i) => findMatch(input, i, matchers));

  return matches.filter((m) => m != null) as number[];
}

function findMatch(
  input: string,
  index: number,
  nodes: TrieNode[]
): number | undefined {
  const char = input[index];
  const matchingNode = nodes.find((n) => n.char === char);
  if (!matchingNode) {
    return;
  }
  if (matchingNode.value != null) {
    return matchingNode.value;
  }
  return findMatch(input, index + 1, matchingNode.children);
}

const sum = lines.reduce((a, b) => a + b);
console.log(sum);
