import { getLines } from "../common.ts";
import { Hand, rankHand, parsePlay } from "./common.ts";

const valueMap: Record<string, string> = {
  A: "E",
  K: "D",
  Q: "C",
  J: "B",
  T: "A",
  9: "9",
  8: "8",
  7: "7",
  6: "6",
  5: "5",
  4: "4",
  3: "3",
  2: "2",
  1: "1",
};

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
  console.log(
    `${index + 1}\t${play.cards.join("")}\t${rank}\t${numberValue}\t${play.bid}`
  );
  return acc + play.bid * (index + 1);
}, 0);

console.log(totalWinnings);


function handToNumberValue(cards: Hand) {
  const result = parseInt(cardsToHex(cards).join(""), 16);
  return result;
}

function cardsToHex(arr: string[]) {
  return arr.map((s) => valueMap[s]);
}
