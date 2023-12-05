import { getLines } from "../common.ts";
import { ItemMap, getMapDefinitions } from "./common.ts";

const input = await Deno.readTextFile("./test.txt");
const lines = getLines(input);

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
  return mappings.reduce((last, current) => current.getMappedValue(last), seed);
});

console.log(seeds, seedLocations);
