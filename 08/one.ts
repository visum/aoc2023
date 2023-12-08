import { MapWalker } from "./map_walker.ts";

const input = await Deno.readTextFile("./input.txt");

const walker = new MapWalker(input);

console.log(walker.navigate());
