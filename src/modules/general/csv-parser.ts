import * as camelCase from 'camelcase';

import { Common } from '../common';

type Obj = {
  [name: string]: string,
};

type HeaderSelectObj = {
  [name: string]: number,
}

export type ParserOptions = {
  headers: boolean | string[] | HeaderSelectObj,
  skipFirstLine?: boolean,
}

// csv delimiter
const csvDelimiter = ',';
// new line delimiter
const newlineDelimiter = '\n';

function csvToObject(headers: string[], row: string): Obj {
  const obj: Obj = {};

  row.split(csvDelimiter).forEach((c: string, i: number) => {
    obj[headers[i]] = c;
  });

  return obj;
}

function dataFromString(str: string, skipFirstLine: boolean): string {
  if (skipFirstLine) {
    return str.slice(str.indexOf(newlineDelimiter) + 1);
  }
  return str;
}

function csvToObjectWithSelectedHeaders(headers: HeaderSelectObj, row: string): Obj {
  const cells = row.split(csvDelimiter);
  const obj: Obj = {};

  Object.keys(headers).forEach((k: string) => {
    obj[k] = cells[headers[k]];
  });

  return obj;
}

function parseWithoutHeaders(str: string): Obj[] {
  // get header
  const indexOfEndOfHeader = str.indexOf(newlineDelimiter);
  const headers = str.slice(0, indexOfEndOfHeader)
    .split(csvDelimiter)
    .map((h) => camelCase(h, { pascalCase: false }));

  // get rows
  const rows = str.slice(indexOfEndOfHeader + 1).split(newlineDelimiter);

  // csv to array of objects
  return rows.map((r) => csvToObject(headers, r));
}

function parseWithHeaders(headers: string[], str: string): Obj[] {
  // get rows
  const rows = str.split(newlineDelimiter);

  // csv to array of objects
  return rows.map((r) => csvToObject(headers, r));
}

function parseWithSelectedHeaders(headers: HeaderSelectObj, str: string): Obj[] {
  // get rows
  const rows = str.split(newlineDelimiter);

  // csv to array of objects
  return rows.map((r) => csvToObjectWithSelectedHeaders(headers, r));
}

function parseAsArrayOfArrays(str: string): string[][] {
  const rows = str.split(newlineDelimiter);

  // csv to array of arrays
  return rows.map((r) => r.split(csvDelimiter));
}

export class CsvParser extends Common<string, Obj[] | string[][]> {
  options: ParserOptions;

  constructor(options: ParserOptions = { headers: true }) {
    super();

    this.options = options;
  }

  async process(str: string): Promise<Obj[] | string[][]> {
    const { headers, skipFirstLine } = this.options;

    const data = dataFromString(str, skipFirstLine || false);

    switch (headers) {
      case true:
        return parseWithoutHeaders(data);
      default:
        if (headers instanceof Array) {
          return parseWithHeaders(headers, data);
        }

        if (headers === false) {
          return parseAsArrayOfArrays(data);
        }

        return parseWithSelectedHeaders(headers, data);
    }
  }
}
