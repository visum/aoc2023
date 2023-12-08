export type Play = {
  cards: Hand;
  bid: number;
};

export type Hand = [string, string, string, string, string];

export enum HandType {
  HIGH_CARD = 10,
  ONE_PAIR = 20,
  TWO_PAIR = 30,
  THREE_OAK = 40,
  FULL_HOUSE = 50,
  FOUR_OAK = 60,
  FIVE_OAK = 70,
}

export function parsePlay(line: string): Play {
  const [cardsStr, bidStr] = line.split(" ");
  const cards = cardsStr.split("") as Hand;
  const bid = parseFloat(bidStr);

  return { cards, bid };
}

export function rankHand(cards: Hand) {
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

export function groupCards(cards: Hand) {
  const groups: Record<string, number> = {};
  for (let c of cards) {
    const entry = groups[c] ?? 0;
    groups[c] = entry + 1;
  }

  return Object.entries(groups).sort(([, a], [, b]) => b - a);
}

export function getCardValue(card: string) {
  return cardValueMap[card];
}

const cardValueMap: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  1: 1,
};
