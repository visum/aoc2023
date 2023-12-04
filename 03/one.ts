import { PartNumber, PartSymbol, findNumbers, findSymbols } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");

const partNumbers = findPartNumbers(input);
console.log(partNumbers.reduce((acc, num) => acc + num.value, 0));

function findPartNumbers(input: string) {
  const numbers = findNumbers(input);
  const symbols = findSymbols(input);

  const partNumbers = numbers.filter((num) => {
    const left = num.position[0] - 1;
    const right = num.position[0] + num.length;
    const top = num.position[1] - 1;
    const bottom = num.position[1] + 1;
    const isPartNumber = symbols.some((sym) => {
      const match =
        sym.position[0] >= left &&
        sym.position[0] <= right &&
        sym.position[1] >= top &&
        sym.position[1] <= bottom;
      return match;
    });
    return isPartNumber;
  });
  return partNumbers;
}
