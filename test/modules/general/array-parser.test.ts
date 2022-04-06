import { expect } from 'chai';

import { Data } from '../../../src/data';
import { ArrayParser } from '../../../src/modules/general';

const simpleTemplateWithoutIgnores = {
  table: {
    columns: [
      null,
      {
        name: 'c1',
      },
      {
        name: 'c2',
      },
      null,
    ],
  },
};

const simpleTemplateWithStringIgnores = {
  ...simpleTemplateWithoutIgnores,
  ignoreSections: [
    {
      startPattern: 'ignoreStart',
      endPattern: 'ignoreEnd',
    },
  ],
};

const onlyTableWithFourColumns = require('./test-data/array-containing-only-table-with-four-columns.json');
const onlyStringIgnoreSection = require('./test-data/array-containing-only-string-ignore-section.json');
const tableWithFourColumnsAndStringIgnoreSectionAtTheBeginning = require(
  './test-data/array-containing-table-with-four-columns-and-string-ignore-secion-at-the-beginning.json',
);
const tableWithFourColumnsAndStringIgnoreSectionInTheMiddle = require(
  './test-data/array-containing-table-with-four-colomns-and-string-ignore-section-in-the-middle.json',
);

const requiredResultForTableOfFourColumns = [
  {
    c1: 'val01',
    c2: 'val02',
  },
  {
    c1: 'val11',
    c2: 'val12',
  },
  {
    c1: 'val21',
    c2: 'val22',
  },
];

describe('ArrayParser Module', () => {
  let subject: ArrayParser;

  context('with data which doesn\'t contain ignore sections run', () => {
    let result;

    before(async () => {
      subject = new ArrayParser(simpleTemplateWithoutIgnores);
      result = (await subject.run(new Data(onlyTableWithFourColumns))).current;
    });

    it('should retrun array length of 3', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(3);
    });

    it('should return array of objects which keys are column names and values are table corresponding values', () => {
      expect(result).to.eql(requiredResultForTableOfFourColumns);
    });
  });

  context('with data which contains string ignore sections run', () => {
    let result;

    before(async () => {
      subject = new ArrayParser(simpleTemplateWithStringIgnores);
      result = (await subject.run(new Data(onlyStringIgnoreSection))).current;
    });

    it('should retrun array length of 0', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(0);
    });
  });

  context('with data which contains ignore section and table of 4 columns run', () => {
    let result;

    before(async () => {
      subject = new ArrayParser(simpleTemplateWithStringIgnores);
      result = (await subject.run(new Data(tableWithFourColumnsAndStringIgnoreSectionAtTheBeginning))).current;
    });

    it('should retrun array length of 3', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(3);
    });

    it('should return array of objects which keys are column names and values are table corresponding values', () => {
      expect(result).to.eql(requiredResultForTableOfFourColumns);
    });
  });

  context('with data which contains ignore section in the middle of table of 4 columns run', () => {
    let result;

    before(async () => {
      subject = new ArrayParser(simpleTemplateWithStringIgnores);
      result = (await subject.run(new Data(tableWithFourColumnsAndStringIgnoreSectionInTheMiddle))).current;
    });

    it('should retrun array length of 3', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(3);
    });

    it('should return array of objects which keys are column names and values are table corresponding values', () => {
      expect(result).to.eql(requiredResultForTableOfFourColumns);
    });
  });

  // TODO: add more tests with patterns for talbe columns and ignore sections
});
