import { Hand, HandType, parsePlay, Play } from "./common.ts";
import { getLines } from "../common.ts";
import { rankHand, promote, handToNumberValue } from "./two_support.ts";

type RankedPlay = {
  play: Play;
  rank: number;
};

const input = await Deno.readTextFile("./input.txt");
const plays = getLines(input).map((l) => parsePlay(l));

const rankedPlays: RankedPlay[] = plays.map((p) => {
  const rankStart = rankHand(p.cards);
  const numJokers = p.cards.filter((c) => c === "J").length;
  const promoted = promote(rankStart, numJokers);
  return { play: p, rank: promoted };
});

rankedPlays.sort((a, b) => {
  if (a.rank > b.rank) {
    return 1;
  }
  if (a.rank < b.rank) {
    return -1;
  }

  return handToNumberValue(a.play.cards) - handToNumberValue(b.play.cards);
});

const totalWinnings = rankedPlays.reduce((acc, play, index) => {
  const cardsValue = handToNumberValue(play.play.cards);
  console.log(
    `${index}\t${play.play.cards.join("")}\t${play.rank}\t${cardsValue}\t${
      play.play.bid
    }`
  );
  return acc + play.play.bid * (index + 1);
}, 0);

console.log(totalWinnings);
