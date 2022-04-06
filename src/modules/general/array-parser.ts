import { Common } from '../common';

export type Pattern = string | RegExp;

type Obj = {
  [name: string]: string,
};

export type Section = {
  name?: string,
  startPattern: Pattern,
  endPattern: Pattern,
}

export type ColumnTemplate = {
  name: string,
  pattern?: Pattern,
}

export type TableTemplate = {
  section?: Section,
  columns: (ColumnTemplate | null)[],
}

export type ParsingTemplate = {
  table: TableTemplate,
  ignoreSections?: Section[],
}

function getObjectField(
  cellId: number,
  columnCount: number,
  columns: (ColumnTemplate | null)[],
  word: string,
): { cellId: number, field?: { name: string, value: string }, isLast: boolean} {
  const columnId = cellId % columnCount;
  const isLast = columnId === columnCount - 1;

  const columnTemplate = columns[columnId];

  if (!columnTemplate) {
    return { cellId, isLast };
  }

  if (columnTemplate.pattern) {
    const { name, pattern } = columnTemplate;
    if (typeof pattern === 'string' ? word === pattern : word.match(pattern)) {
      return {
        cellId,
        isLast,
        field: {
          name,
          value: word,
        },
      };
    }

    // TODO: Will work incorrect if the last column has pattern which is not matched
    if (!isLast) {
      return getObjectField(cellId + 1, columnCount, columns, word);
    }
  }

  return {
    cellId,
    isLast,
    field: {
      name: columnTemplate.name,
      value: word,
    },
  };
}

function parse(arr: string[], template: ParsingTemplate): Obj[] {
  const { table, ignoreSections } = template;
  const { columns } = table;
  const columnCount = table.columns.length;

  const objects: Obj[] = [];
  let object: Obj = {};

  const ignoreStartPatterns: Pattern[] = [];
  const ignoreEndPatterns: Pattern[] = [];

  if (ignoreSections) {
    ignoreSections.forEach((section: Section) => {
      ignoreStartPatterns.push(section.startPattern);
      ignoreEndPatterns.push(section.endPattern);
    });
  }

  let cellId: number = -1;
  let ignoreSectionId: number = -1;

  arr.forEach((word) => {
    // ignore section
    if (ignoreSectionId !== -1) {
      const pattern = ignoreEndPatterns[ignoreSectionId];
      if (!(typeof pattern === 'string' ? word === pattern : word.match(pattern))) {
        return;
      }

      ignoreSectionId = -1;
      return;
    }

    ignoreStartPatterns.every((pattern, index) => {
      if (typeof pattern === 'string' ? word === pattern : word.match(pattern)) {
        ignoreSectionId = index;
        return true;
      }

      return false;
    });
    // end ignore section

    // table
    if (ignoreSectionId !== -1) {
      return;
    }

    // TODO: implement usage of table.section

    const processed = getObjectField(++cellId, columnCount, columns, word);

    cellId = processed.cellId;

    const { field } = processed;

    if (field) {
      object[field.name] = field.value;
    }

    if (processed.isLast) {
      objects.push(object);
      object = {};
    }
  });
  return objects;
}

export class ArrayParser extends Common<string[], Obj[]> {
  template: ParsingTemplate;

  constructor(template: ParsingTemplate) {
    super();

    this.template = template;
  }

  async process(arr: string[]): Promise<Obj[]> {
    return parse(arr, this.template);
  }
}
