import { PartNumber, PartSymbol, findNumbers, findSymbols } from "./common.ts";

type Gear = {
  n1: number;
  n2: number;
  position: [number, number];
};

const input = await Deno.readTextFile("./test.txt");

console.log(findGears(input));

function findGears(input: string) {
  const asterisks = findSymbols(input).filter((s) => s.char === "*");
  const numbers = findNumbers(input);

  const gears = asterisks.reduce<Gear[]>((acc, a) => {
    const adjacents = numbers.filter((n) => {
      const left = a.position[0] - 1;
      const top = a.position[1] - 1;
      const right = a.position[0] + 1;
      const bottom = a.position[1] + 1;

      const numLeft = n.position[0] - 1;
      const numRight = n.position[0] + n.length;
      const numTop = n.position[1] - 1;
      const numBottom = n.position[1] + 1;

      return (
        n.position[0] >= left &&
        n.position[0] <= right &&
        n.position[1] >= top &&
        n.position[1] <= bottom
      );
    });

    if (adjacents.length === 2) {
      acc.push({
        n1: adjacents[0].value,
        n2: adjacents[1].value,
        position: a.position,
      });
    }
    return acc;
  }, []);

  return gears;
}

// top-right, bottom-left
function rectsIntersect(a:[[number, number], [number, number]], b: [[number, number], [number, number]]) {
  const leftRect = a[0][0] < b[0][0] ? a : b;
  const rightRect = a[0][0] < b[0][0] ? b : a;

  
}