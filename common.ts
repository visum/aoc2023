export function getLines(input: string) {
  return input.split("\n").filter((l) => l.length > 0);
}
