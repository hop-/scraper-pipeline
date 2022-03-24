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
  describe('with options headers = true (default)', () => {
    const cpc = new CsvParser();

    let result;

    before(async () => {
      result = (await cpc.run(new Data(csvWithHeaders))).current;
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

  describe('with options headers = false', () => {
    const cpc = new CsvParser({ headers: false });

    let result;

    before(async () => {
      result = (await cpc.run(new Data(csvDataOnly))).current;
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

  describe('with options headers = false and skip first line', () => {
    const cpc = new CsvParser({ headers: false, skipFirstLine: true });

    let result;

    before(async () => {
      result = (await cpc.run(new Data(csvWithHeaders))).current;
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
});
