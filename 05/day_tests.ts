import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { ItemMap, getMapDefinitions } from "./common.ts";

const soilToFertInput = `soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15`;

const seedToSoilInput = `seed-to-soil map:
50 98 2
52 50 48`;

const someRawDefinitions = `seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4`;

Deno.test("parse map definition", () => {
  const map = new ItemMap(soilToFertInput.split("\n"));
  assertEquals(map.ranges.length, 3);
  assertEquals(map.sourceType, "soil");
  assertEquals(map.targetType, "fertilizer");
  assertEquals(map.ranges[2].sourceStart, 0);
});

Deno.test("map numbers", () => {
  const map = new ItemMap(seedToSoilInput.split("\n"));
  assertEquals(map.getMappedValue(0), 0);
  assertEquals(map.getMappedValue(49), 49);
  assertEquals(map.getMappedValue(50), 52);
  assertEquals(map.getMappedValue(96), 98);
  assertEquals(map.getMappedValue(98), 50);
});

Deno.test("get mapping definitions", () => {
  const definitions = getMapDefinitions(someRawDefinitions.split("\n"));
  assertEquals(definitions.length, 3);

  const fertToWaterMap = new ItemMap(definitions[2]);
  assertEquals(fertToWaterMap.ranges.length, 4);
});
