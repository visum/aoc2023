const input = await Deno.readTextFile("./input.txt");
import {
  type Game,
  type GameSet,
  getGames,
} from "./common.ts";

// Act
const givenCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const idSum = getGames(input).reduce((acc: number, game: Game) => {
  if (gameIsPossible(givenCubes, game)) {
    return acc + game.id;
  }
  return acc;
}, 0);

console.log(idSum);

// Utils
function gameIsPossible(givenCubes: GameSet, game: Game) {
  return game.sets.every(
    (s: GameSet) =>
      s.blue <= givenCubes.blue &&
      s.green <= givenCubes.green &&
      s.red <= givenCubes.red
  );
}
