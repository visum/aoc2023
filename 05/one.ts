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

const seedLocations = seeds.map((seed) => {
  return mappings.reduce((last, current) => {
    const result = current.getMappedValue(last);
    // console.log(current.sourceType, current.targetType, last, result);
    return result;
  }, seed);
});

console.log(seedLocations.sort((a, b) => a - b)[0]);
