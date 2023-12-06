import { readRaces, getNumOptionsOverRecord } from "./common.ts";
const input = await Deno.readTextFile("./input.txt");

const races = readRaces(input);

const result = races.reduce(
  (acc, race) => acc * getNumOptionsOverRecord(race),
  1
);

console.log(result);

