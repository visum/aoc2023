import { getLines } from "../common.ts";

const input = await Deno.readTextFile("./_input.txt");
const lines = getLines(input);

function getDiffs(values: number[]): number[] {
  return values.reduce<number[]>((acc, current, index) => {
    const last = values[index - 1];
    if (last == null) {
      return acc;
    }
    acc.push(current - last);
    return acc;
  }, []);
}

function getTriangle(values: number[]): number[][] {
  const allLines: number[][] = [values];
  while (allLines[allLines.length - 1].some((n) => n !== 0)) {
    allLines.push(getDiffs(allLines[allLines.length - 1]));
  }
  return allLines;
}

function getNextValue(triangle: number[][]) {
  return triangle.reduce((addend, currentLine) => {
    return currentLine[currentLine.length - 1] + addend;
  }, 0);
}

const answer = lines.reduce((acc, line) => {
  const triangle = getTriangle(line.split(" ").map(v => parseFloat(v)));
  const next = getNextValue(triangle);
  return acc + next;
}, 0);

console.log(answer);