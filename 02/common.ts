// Types
export type Game = {
  id: number;
  sets: GameSet[];
};
export type Colors = "red" | "green" | "blue";
export type GameSet = Record<Colors, number>;

export function getGames(input: string) {
  return input
    .split("\n")
    .filter((l: string) => l.length > 0)
    .map((l: string) => parseLine(l));
}

export function parseLine(line: string): Game {
  const [gameId, results] = line.split(": ");
  const id = parseFloat(gameId.split(" ")[1]);
  const sets = results.split("; ").map((set) => parseSet(set));
  const result = { id, sets };
  return result;
}

function parseSet(input: string): { red: number; green: number; blue: number } {
  const result = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const groups = input.split(", ");

  groups.forEach((group) => {
    const [totalStr, color] = group.split(" ");
    const total = parseFloat(totalStr);
    result[color as Colors] = total;
  });

  return result;
}
