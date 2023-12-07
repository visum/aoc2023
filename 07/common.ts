export type Play = {
  cards: Hand;
  bid: number;
};

export type Hand = [string, string, string, string, string];

export function parsePlay(line: string): Play {
  const [cardsStr, bidStr] = line.split(" ");
  const cards = cardsStr.split("") as Hand;
  const bid = parseFloat(bidStr);

  return { cards, bid };
}

export function rankHand(cards: Hand) {
  return matchFiveOfAKind(cards);
}

// 70
function matchFiveOfAKind(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 5) {
    return 70;
  }
  return matchFourOfAKind(cards);
}

// 60
function matchFourOfAKind(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 4) {
    return 60;
  }
  return matchFullHouse(cards);
}

// 50
function matchFullHouse(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 3 && group[1][1] === 2) {
    return 50;
  }
  return matchThreeOfAKind(cards);
}

// 40
function matchThreeOfAKind(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 3) {
    return 40;
  }
  return matchTwoPair(cards);
}

// 30
function matchTwoPair(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 2 && group[1][1] === 2) {
    return 30;
  }
  return matchOnePair(cards);
}

// 20
function matchOnePair(cards: Hand) {
  const group = groupCards(cards);
  if (group[0][1] === 2) {
    return 20;
  }
  return matchHighCard(cards);
}

function matchHighCard(cards: Hand) {
  return cards.map((c) => getCardValue(c)).sort((a, b) => b - a)[0];
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
