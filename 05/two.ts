import { ItemMap, getMapDefinitions } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const seeds = lines[0]
  .split(": ")[1]
  .split(" ")
  .map((n) => parseFloat(n));

const [, , ...definitionLines] = lines;

const mappingDefinitions = getMapDefinitions(definitionLines);

const mappings = mappingDefinitions.map(
  (mappingLines) => new ItemMap(mappingLines)
);

const seedRanges: number[][] = [];
for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push([seeds[i], seeds[i + 1]]);
}

let smallestLocation = 1000000000000;

seedRanges.forEach(([start, length]) => {
  console.log(`Range: ${start} ${length} Current Smallest: ${smallestLocation}`);
  for (let i = start; i < start + length; i++) {
    const mappedResult = mappings.reduce(
      (last, mapping) => mapping.getMappedValue(last),
      i
    );
    if (mappedResult < smallestLocation) {
      smallestLocation = mappedResult;
    }
  }
});

console.log(smallestLocation);
