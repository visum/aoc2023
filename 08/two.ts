import { GhostMapWalker } from "./ghost_map_walker.ts";

const input = await Deno.readTextFile("./_input.txt");

const walker = new GhostMapWalker(input);

const stepss = walker.navigate();

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function lcmMultiple(...numbers: number[]): number {
  return numbers.reduce((acc, current) => lcm(acc, current));
}

console.log(lcmMultiple(...stepss));
