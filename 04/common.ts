export function getMatchingNumbersForLine(line: string) {
  const [_, numbers] = line.split(": ");
  const [winnersString, havesString] = numbers.split(" | ");

  const winners = winnersString
    .split(" ")
    .filter((s) => s.length > 0)
    .map((w) => parseFloat(w));
  const haves = havesString
    .split(" ")
    .filter((s) => s.length > 0)
    .map((h) => parseFloat(h));

  return haves.filter((n) => winners.includes(n));
}
