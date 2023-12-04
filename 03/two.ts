import { findNumbers, findSymbols } from "./common.ts";

type Gear = {
  n1: number;
  n2: number;
  position: [number, number];
};

const input = await Deno.readTextFile("./input.txt");

const gears = findGears(input);
console.log(gears);
console.log(gears.reduce((acc, g) => acc + g.n1 * g.n2, 0));

function findGears(input: string) {
  const asterisks = findSymbols(input).filter((s) => s.char === "*");
  const numbers = findNumbers(input);

  const gears = asterisks.reduce<Gear[]>((acc, a) => {
    const adjacents = numbers.filter((n) => {
      const left = a.position[0] - 1;
      const top = a.position[1] - 1;
      const right = a.position[0] + 1;
      const bottom = a.position[1] + 1;

      const numLeft = n.position[0];
      const numRight = n.position[0] + n.length - 1;
      const numTop = n.position[1];
      const numBottom = n.position[1];

      const rect: [number, number, number, number] = [left, top, right, bottom];

      return (
        pointInRect([numLeft, numTop], rect) ||
        pointInRect([numRight, numTop], rect) ||
        pointInRect([numLeft, numBottom], rect) ||
        pointInRect([numRight, numBottom], rect)
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

// rect: left, top, right, bottom
function pointInRect(
  point: [number, number],
  rect: [number, number, number, number]
) {
  const x = point[0] >= rect[0] && point[0] <= rect[2];
  const y = point[1] >= rect[1] && point[1] <= rect[3];

  return x && y;
}
