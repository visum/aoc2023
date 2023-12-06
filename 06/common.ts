const numberRegex = /\d+/g;

// times, distances
export function readRaces(input: string): [number[], number[]] {
  const lines = input.split("\n");
  const timesLine = lines[0];
  const distancesLine = lines[1];

  const times = [...timesLine.matchAll(numberRegex)].map((m) =>
    parseFloat(m[0])
  );
  const distances = [...distancesLine.matchAll(numberRegex)].map((m) =>
    parseFloat(m[0])
  );
  return [times, distances];
}
