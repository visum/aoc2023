import { getLines } from "../common.ts";

type Node = {
  L: string;
  R: string;
};

const nodeMatcher = /^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/;

export class MapWalker {
  private _instructions: string;
  private _nodes: Record<string, Node> = {};
  private _currentNode: string = "AAA";
  private _instructionPointer = 0;
  private _targetNode: string = "ZZZ";
  private _stepCounter = 0;

  constructor(rawInput: string) {
    const lines = getLines(rawInput);
    this._instructions = lines.shift() as string;
    this._parseNodes(lines);
    console.log(`Going from ${this._currentNode} ${this._targetNode}`);
  }

  navigate(): number {
    while (this._currentNode != this._targetNode) {
      const instruction = this._getNextInstruction() as "L" | "R";
      this._currentNode = this._nodes[this._currentNode][instruction];
      this._stepCounter += 1;
    }

    return this._stepCounter;
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
