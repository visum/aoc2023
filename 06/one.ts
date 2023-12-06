import { readRaces } from "./common.ts";
const input = await Deno.readTextFile("./test.txt");

const races = readRaces(input);

console.log(races);
