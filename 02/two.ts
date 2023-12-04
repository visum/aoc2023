import { getGames, type Game, type GameSet } from "./common.ts";

const input = await Deno.readTextFile("./input.txt");

const games = getGames(input);

const powerSum = games.reduce((acc:number, game) => {
  return acc + getGamePower(game);
}, 0);

console.log(powerSum);

function getGamePower(game:Game) {
  const minSet = getMinSetForGame(game);
  return minSet.green * minSet.blue * minSet.red;
}

function getMinSetForGame(games:Game) {
  const minSet:GameSet = {
    red:0,
    green:0,
    blue:0
  };

  games.sets.forEach(set => {
    minSet.red = Math.max(minSet.red, set.red);
    minSet.green = Math.max(minSet.green, set.green);
    minSet.blue = Math.max(minSet.blue, set.blue);
  });

  return minSet;
}