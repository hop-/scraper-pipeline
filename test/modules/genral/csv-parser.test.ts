import { expect } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import { Data } from '../../../src/data';
import { CsvParser } from '../../../src/modules/general';

const testDataPath = path.join(__dirname, 'test-data');

const csvWithHeadersPath = path.join(testDataPath, 'with-headers.csv');
const csvWithHeaders = fs.readFileSync(csvWithHeadersPath, { encoding: 'utf8' });

const csvDataOnlyPath = path.join(testDataPath, 'data-only.csv');
const csvDataOnly = fs.readFileSync(csvDataOnlyPath, { encoding: 'utf8' });

describe('CsvParser Module', () => {
  let subject: CsvParser;

  context('with options headers is true (default) run', () => {
    let result;

    before(async () => {
      subject = new CsvParser();
      result = (await subject.run(new Data(csvWithHeaders))).current;
    });

    it('should retrun array length of 4', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(4);
    });

    it('should return array of objects which keys are headers', () => {
      const requiredKeys = ['headerZero', 'headerOne', 'headerTwo'];
      const elementSample = result[0];

      expect(Object.keys(elementSample)).to.eql(requiredKeys);
    });
  });

  context('with options headers is false run', () => {
    let result;

    before(async () => {
      subject = new CsvParser({ headers: false });
      result = (await subject.run(new Data(csvDataOnly))).current;
    });

    it('should retrun array length of 5', async () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(5);
    });

    it('should returned array contain arrays as elements', () => {
      const elementSample = result[0];

      expect(elementSample).to.be.an.instanceOf(Array);
      expect(elementSample).to.have.lengthOf(4);
    });
  });

  context('with options headers is false and skip first line run', () => {
    let result;

    before(async () => {
      subject = new CsvParser({ headers: false, skipFirstLine: true });
      result = (await subject.run(new Data(csvWithHeaders))).current;
    });

    it('should retrun Array length of 4', async () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(4);
    });

    it('should returned array contain arrays as elements', () => {
      const elementSample = result[0];

      expect(elementSample).to.be.an.instanceOf(Array);
      expect(elementSample).to.have.lengthOf(3);
    });
  });

  context('with options headers is array run', () => {
    let result;
    const headers = ['header0', 'header1', 'header2'];

    before(async () => {
      subject = new CsvParser({ headers, skipFirstLine: true });
      result = (await subject.run(new Data(csvWithHeaders))).current;
    });

    it('should retrun array length of 4', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(4);
    });

    it('should return array of objects which keys are headers', () => {
      const elementSample = result[0];

      expect(Object.keys(elementSample)).to.eql(headers);
    });
  });

  context('with options headers is HeaderSelectObj and columns are exist run', () => {
    let result;
    const headers = {
      header0: 0,
      header2: 2,
    };

    before(async () => {
      subject = new CsvParser({ headers, skipFirstLine: true });
      result = (await subject.run(new Data(csvWithHeaders))).current;
    });

    it('should retrun array length of 4', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(4);
    });

    it('should return array of objects which keys are selected headers and values are from metioned columns', () => {
      const vaulesForFirstRow = ['data-0-0', 'data-0-2'];
      const elementSample = result[0];

      expect(Object.keys(elementSample).sort()).to.eql(Object.keys(headers).sort());
      expect(Object.values(elementSample)).to.eql(vaulesForFirstRow);
    });
  });

  context('with options headers is HeaderSelectObj and some columns are not exist run', () => {
    let result;
    const headers = {
      header1: 1,
      header1Clone: 1,
      header4: 4,
    };

    before(async () => {
      subject = new CsvParser({ headers, skipFirstLine: true });
      result = (await subject.run(new Data(csvWithHeaders))).current;
    });

    it('should retrun array length of 4', () => {
      expect(result).to.be.an.instanceOf(Array);
      expect(result).to.have.lengthOf(4);
    });

    it('should return array of objects which keys are selected headers and values are from metioned columns', () => {
      const vaulesForFirstRow = ['data-0-1', 'data-0-1', undefined];
      const elementSample = result[0];

      expect(Object.keys(elementSample).sort()).to.eql(Object.keys(headers).sort());
      expect(Object.values(elementSample)).to.eql(vaulesForFirstRow);
    });
  });
});
