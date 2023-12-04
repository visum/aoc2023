export type PartNumber = {
  value: number;
  position: [number, number];
  length: number;
}

export type PartSymbol = {
  position: [number, number];
  char: string;
};

export function findNumbers(input: string) {
  const lines = input.split("\n").filter((l) => l.length !== 0);
  const numbers: PartNumber[] = [];
  lines.forEach((line, lineIndex) => {
    let match: RegExpExecArray | null;
    const numberRegexp = /(\d+)/gi;
    while ((match = numberRegexp.exec(line)) != null) {
      numbers.push({
        value: parseFloat(match[0]),
        position: [numberRegexp.lastIndex - match[0].length, lineIndex],
        length: match[0].length,
      });
    }
  });
  return numbers;
}

export function findSymbols(input: string) {
  const lines = input.split("\n").filter((l) => l.length !== 0);
  const symbols: PartSymbol[] = [];
  lines.forEach((line, lineIndex) => {
    const symbolRegexp = /([^\d\.])/g;
    let match: RegExpExecArray | null;
    while ((match = symbolRegexp.exec(line)) != null) {
      symbols.push({
        position: [symbolRegexp.lastIndex - 1, lineIndex],
        char: match[0],
      });
    }
  });
  return symbols;
}