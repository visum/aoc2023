import { getLines } from "../common.ts";

type Node = {
  L: string;
  R: string;
};

const nodeMatcher = /^([A-Z1-9]{3}) = \(([A-Z1-9]{3}), ([A-Z1-9]{3})\)/;

export class GhostMapWalker {
  private _instructions: string;
  private _nodes: Record<string, Node> = {};
  private _instructionPointer = 0;
  private _stepCounter = 0;

  private _nodeStarts: string[] = [];
  private _destinationLengths: number[] = [];

  constructor(input: string) {
    const lines = getLines(input);
    this._instructions = lines.shift() as string;
    this._parseNodes(lines);
  }

  navigate() {
    // get starting nodes
    this._nodeStarts = Object.keys(this._nodes).filter((k) => k.endsWith("A"));
    console.log(`Starting with: ${this._nodeStarts.join(" ")}`);

    this._nodeStarts.forEach((start, index) => {
      let key = start;
      console.log(key);
      this._instructionPointer = 0;
      let instruction = this._getNextInstruction() as "R" | "L";
      this._destinationLengths[index] = 0;

      while (!this._isFinishNode(key)) {
        key = this._nodes[key][instruction];
        this._destinationLengths[index] += 1;
        instruction = this._getNextInstruction() as "R" | "L";
      }
    });

    return this._destinationLengths;
  }

  private _isFinishNode(key: string) {
    return key.endsWith("Z");
  }

  private _parseNodes(lines: string[]) {
    lines.forEach((line) => {
      const parts = this._parseLine(line);
      if (this._nodes[parts[0]] != null) {
        console.error(
          `Repeat! ${parts[0]} -> ${
            this._nodes[parts[0]]
          } to be overwritten with L:${parts[1]} R:${parts[2]}`
        );
      }
      this._nodes[parts[0]] = { L: parts[1], R: parts[2] };
    });
    console.log(`Parsed ${Object.keys(this._nodes).length} nodes`);
  }

  private _parseLine(line: string) {
    const groups = nodeMatcher.exec(line);
    if (!groups) {
      throw new Error("bad line: " + line);
    }
    return [groups[1], groups[2], groups[3]];
  }

  private _getNextInstruction() {
    const currentInstruction = this._instructions[this._instructionPointer];

    this._instructionPointer += 1;
    if (this._instructionPointer === this._instructions.length) {
      this._instructionPointer = 0;
    }
    return currentInstruction;
  }
}
