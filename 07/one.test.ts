import {
  assertEquals,
  assertGreater,
} from "https://deno.land/std@0.208.0/assert/mod.ts";

import {
  Hand,
  groupCards,
  rankHand,
  handToNumberValue,
  parsePlay,
} from "./common.ts";

Deno.test("groupCards - full house", () => {
  const hand = "KKAAA".split("") as Hand;
  const groups = groupCards(hand);

  assertEquals(groups[0][1], 3);
  assertEquals(groups[1][1], 2);
});

Deno.test("groupCards - fourOfAKind", () => {
  const hand = "11113".split("") as Hand;
  const groups = groupCards(hand);

  assertEquals(groups[0][1], 4);
  assertEquals(groups[1][1], 1);
});

Deno.test("groupCards - twoPair", () => {
  const hand = "33445".split("") as Hand;
  const groups = groupCards(hand);

  assertEquals(groups[0][1], 2);
  assertEquals(groups[1][1], 2);
});

Deno.test("rank: high card", () => {
  const hand = "12934".split("") as Hand;
  const rank = rankHand(hand);

  assertEquals(rank, 9);
});

Deno.test("rank: full house", () => {
  const hand = "KK111".split("") as Hand;
  const rank = rankHand(hand);

  assertEquals(rank, 50);
});

Deno.test("rank: fourofakind", () => {
  const hand = "45444".split("") as Hand;
  const rank = rankHand(hand);

  assertEquals(rank, 60);
});

Deno.test("handToNumberValue", () => {
  const hand1 = handToNumberValue("11111".split("") as Hand);
  const hand2 = handToNumberValue("AAAAA".split("") as Hand);
  const hand3 = handToNumberValue("1KKKK".split("") as Hand);
  const hand4 = handToNumberValue("2KKKK".split("") as Hand);
  const hand5 = handToNumberValue("J1111".split("") as Hand);
  const hand6 = handToNumberValue("QAAAA".split("") as Hand);

  assertGreater(hand2, hand1);
  assertGreater(hand4, hand3);
  assertGreater(hand6, hand5);
});

Deno.test("parsePlay", () => {
  const play = "32T3K 765";
  const parsed = parsePlay(play);

  assertEquals(parsed.bid, 765);
  assertEquals(parsed.cards.join(""), "32T3K");
});
