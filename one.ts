const input = await Deno.readTextFile("./input.txt");

const lineResults = input.split("\n").filter(line => line.length > 0).map((line) => {
  const numbers = line.split("").filter((char) => !isNaN(parseFloat(char)));
  return parseFloat(`${numbers[0]}${numbers[numbers.length - 1]}`);
});

const result = lineResults.reduce((a: number, c: number) => a + c, 0);

console.log(result);
