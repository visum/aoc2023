import { Hand, HandType } from "./common.ts";

export function rankHand(cards: Hand) {
  return matchAllWild(cards);
}

function groupCards(cards: Hand) {
  const groups: Record<string, number> = {};
  for (let c of cards) {
    if (c === "J") {
      continue;
    }
    const entry = groups[c] ?? 0;
    groups[c] = entry + 1;
  }

  return Object.entries(groups).sort(([, a], [, b]) => b - a);
}

function matchAllWild(cards: Hand) {
  const group = groupCards(cards);
  if (group.length === 0) {
    // everything is wild, pretend it's high card
    return HandType.HIGH_CARD;
  }
  return matchFiveOfAKind(cards);
}

// 5x
function matchFiveOfAKind(cards: Hand) {
  const group = groupCards(cards);

  if (group[0][1] === 5) {
    return HandType.FIVE_OAK;
  }
  return matchFourOfAKind(cards);
}

// 4x
function matchFourOfAKind(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 4) {
    return HandType.FOUR_OAK;
  }
  return matchFullHouse(cards);
}

// Full house
function matchFullHouse(cards: Hand) {
  const group = groupCards(cards);
  if (group.length === 1) {
    // can't be full house, must have some wilds.
    // continue
    return matchThreeOfAKind(cards);
  }
  if (group[0][1] === 3 && group[1][1] === 2) {
    return HandType.FULL_HOUSE;
  }
  return matchThreeOfAKind(cards);
}

// 3x
function matchThreeOfAKind(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 3) {
    return HandType.THREE_OAK;
  }
  return matchTwoPair(cards);
}

// 2 pair
function matchTwoPair(cards: Hand) {
  const group = groupCards(cards);
  if (group.length === 1) {
    // only one type, can't be two pair.
    // continue
    return matchOnePair(cards);
  }
  if (group[0][1] === 2 && group[1][1] === 2) {
    return HandType.TWO_PAIR;
  }
  return matchOnePair(cards);
}

// 1 pair
function matchOnePair(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 2) {
    return HandType.ONE_PAIR;
  }
  return matchHighCard(cards);
}

// high card
function matchHighCard(cards: Hand) {
  return HandType.HIGH_CARD;
}

export function handToNumberValue(cards: Hand) {
  const result = parseInt(cardsToHex(cards).join(""), 16);
  return result;
}

function cardsToHex(arr: string[]) {
  return arr.map((s) => charMap[s]);
}

const charMap: Record<string, string> = {
  A: "E",
  K: "D",
  Q: "C",
  T: "A",
  9: "9",
  8: "8",
  7: "7",
  6: "6",
  5: "5",
  4: "4",
  3: "3",
  2: "2",
  J: "1", // now a Joker, worth less
};

export function promote(start: HandType, steps: number) {
  const sequence = promotionOrders[start];
  if (steps === 0) {
    return start;
  }
  return sequence[steps - 1];
}

const promotionOrders: Record<HandType, HandType[]> = {
  [HandType.HIGH_CARD]: [
    HandType.ONE_PAIR,
    HandType.THREE_OAK,
    HandType.FOUR_OAK,
    HandType.FIVE_OAK,
    HandType.FIVE_OAK,
  ],
  [HandType.ONE_PAIR]: [
    HandType.THREE_OAK,
    HandType.FOUR_OAK,
    HandType.FIVE_OAK,
    HandType.FIVE_OAK,
  ],
  [HandType.TWO_PAIR]: [
    HandType.FULL_HOUSE,
    HandType.FOUR_OAK,
    HandType.FIVE_OAK,
    HandType.FIVE_OAK,
  ],
  [HandType.THREE_OAK]: [HandType.FOUR_OAK, HandType.FIVE_OAK],
  [HandType.FULL_HOUSE]: [
    // no wilds in a full house
  ],
  [HandType.FOUR_OAK]: [HandType.FIVE_OAK],
  [HandType.FIVE_OAK]: [
    // no wilds in a five-of-a-kind
  ],
};
