// The S is a 7

const input = await Deno.readTextFile("./_input.txt");

const map = ingest(input);

type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";
type Coord = [number, number];
type PipeMap = Pipe[][];

// N: -y
// S: +y
// E: +x
// W: -x

const transforms: Record<Pipe, [Coord, Coord]> = {
  "|": [
    [0, -1], // N
    [0, 1],  // S
  ],
  "-": [
    [-1, 0], // W
    [1, 0],  // E
  ],
  L: [
    [0, -1], // N
    [1, 0],  // E
  ],
  J: [
    [0, -1], // N
    [-1, 0], // W
  ],
  "7": [
    [0, 1], // S
    [-1, 0],// W
  ],
  F: [
    [1, 0], // E
    [0, 1], // S
  ],
  S: [
    [0, 0],
    [0, 0],
  ],
  ".": [
    [0, 0],
    [0, 0],
  ],
};

const startPipe: Pipe = "7"; // Just because we know

const pipeMap = ingest(input);
const startCoord = findStart();
if (startCoord == null) {
  throw new Error("Could not find the start");
}
console.log(`Start at ${startCoord}`);
const path: Coord[] = [];
const firstMove = getOptions(startCoord, startPipe)[0];
path.push(startCoord);
path.push(firstMove);

while (!isEqual(startCoord, path[path.length - 1]) && path.length < 10000) {
  const current = path[path.length - 1];
  const prev = path[path.length - 2];
  const next = walk(current, prev);
  if (next == null) {
    console.log(`${current}, ${prev}, ${m(current[0], current[1])}`);
  }
  path.push(next);
}

console.log(path, path.length);

function ingest(input: string) {
  const lines = input.split("\n").filter((l) => l.length != 0);
  const map: PipeMap = [];

  lines.forEach((line, index) => {
    map[index] = [];
    (line.split("") as Pipe[]).forEach(
      (char, jndex) => (map[index][jndex] = char)
    );
  });

  return map;
}

function walk(pos: Coord, last: Coord): Coord {
  const pipe = m(pos[0], pos[1]);
  const candidates = getOptions(pos, pipe);
  const newPos = candidates.filter((c) => !isEqual(c, last))[0];
  return newPos;
}

function getOptions(pos: Coord, pipe: Pipe) {
  const opts = transforms[pipe].map((t) => [
    pos[0] + t[0],
    pos[1] + t[1],
  ]) as Coord[];
  return opts;
}

function isEqual(a: Coord, b: Coord) {
  return a[0] === b[0] && a[1] === b[1];
}

function findStart() {
  for (let y = 0; y < pipeMap.length; y++) {
    for (let x = 0; x < pipeMap[y].length; x++) {
      if (m(x, y) === "S") {
        return [x, y] as Coord;
      }
    }
  }
}

function m(x: number, y: number) {
  return pipeMap[y][x];
}
