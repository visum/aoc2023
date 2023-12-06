const numberRegex = /\d+/g;

// times, distances
export function readRaces(input: string): [number, number][] {
  const lines = input.split("\n");
  const timesLine = lines[0];
  const distancesLine = lines[1];

  const times = [...timesLine.matchAll(numberRegex)].map((m) =>
    parseFloat(m[0])
  );
  const distances = [...distancesLine.matchAll(numberRegex)].map((m) =>
    parseFloat(m[0])
  );

  return times.map((t,i) => [t, distances[i]]);
}


export function getNumOptionsOverRecord([time, record]: [number, number]) {
  const middle = Math.floor(time / 2);
  let currentHoldTime = middle;
  let runTime = getRunTime(currentHoldTime, time);
  const wins: number[] = [];

  while (runTime > record && currentHoldTime > 0) {
    wins.push(runTime);
    currentHoldTime -= 1;
    runTime = getRunTime(currentHoldTime, time);
  }

  return time % 2 === 0 ? wins.length * 2 - 1 : wins.length * 2;
}

function getRunTime(timeDown: number, totalTime: number) {
  return timeDown * (totalTime - timeDown);
}
