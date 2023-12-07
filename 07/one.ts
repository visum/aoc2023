import { getLines } from "../common.ts";
import { Hand, rankHand, parsePlay, handToNumberValue } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");

const lines = getLines(input);

const plays = lines.map((l) => parsePlay(l));

plays.sort((a, b) => {
  const rA = rankHand(a.cards);
  const rB = rankHand(b.cards);

  if (rA > rB) {
    return 1;
  }
  if (rA < rB) {
    return -1;
  }
  return handToNumberValue(a.cards) - handToNumberValue(b.cards);
});

const totalWinnings = plays.reduce((acc, play, index) => {
  const rank = rankHand(play.cards);
  const numberValue = handToNumberValue(play.cards);
  console.log(`${index}\t${play.cards.join("")}\t${rank}\t${numberValue}`);
  return acc + play.bid * (index + 1);
}, 0);

console.log(totalWinnings);
