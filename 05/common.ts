export class ItemMap {
  private _sourceType: string = "";
  private _targetType: string = "";
  private _ranges: {
    sourceStart: number;
    targetStart: number;
    length: number;
  }[] = [];

  constructor(mappingDefinition: string[]) {
    this._parseDefinition(mappingDefinition);
  }

  get ranges() {
    return this._ranges;
  }

  get sourceType() {
    return this._sourceType;
  }

  get targetType() {
    return this._targetType;
  }

  getMappedValue(input: number) {
    const matchingRange = this._ranges.find(
      (r) => r.sourceStart <= input && r.sourceStart + r.length > input
    );

    if (matchingRange == null) {
      return input;
    }

    const diff = input - matchingRange.sourceStart;
    return matchingRange.targetStart + diff;
  }

  private _parseDefinition(lines: string[]) {
    const [soureType, _, targetType] = lines[0].split(" ")[0].split("-");
    this._sourceType = soureType;
    this._targetType = targetType;
    for (let i = 1; i < lines.length; i++) {
      const [target, source, length] = lines[i]
        .split(" ")
        .map((s) => parseFloat(s));
      this._ranges.push({ sourceStart: source, targetStart: target, length });
    }
  }
}

export function getMapDefinitions(lines: string[]) {
  const definitions: string[][] = [];
  let definitionBuffer: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) {
      definitions.push(definitionBuffer);
      definitionBuffer = [];
    } else {
      definitionBuffer.push(line);
    }
  }
  definitions.push(definitionBuffer);

  return definitions;
}
