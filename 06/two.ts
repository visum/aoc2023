import { getNumOptionsOverRecord } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");

const [timeLine, distanceLine] = input.split("\n");
const numberMatcher = /\d+/g;
const timeMatches = [...timeLine.matchAll(numberMatcher)].map(m => m[0]);
const totalTime = parseFloat(timeMatches.join(""));

const distanceMatches = [...distanceLine.matchAll(numberMatcher)].map(m => m[0]);
const totalDistance = parseFloat(distanceMatches.join(""));

const result = getNumOptionsOverRecord([totalTime, totalDistance]);

console.log(result);