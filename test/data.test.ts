import { expect } from 'chai';

import { Data } from '../src/data';

describe('Data', () => {
  let subject: Data<any>;

  context('when current is 10 new with 11', () => {
    let result;

    before(() => {
      subject = new Data(10);
      result = subject.new(11);
    });

    it('should return Data', () => {
      expect(result).to.be.an.instanceOf(Data);
    });

    it('should contain 11 as current', () => {
      expect(result.current).to.be.equal(11);
    });

    it('should contain 10 as previous', () => {
      expect(result.previous).to.be.equal(10);
    });

    it('should contain empty array as old', () => {
      expect(result.old).to.be.eql([]);
    });
  });

  context('when current is "four" previous 3 and old ["zero", 1, "two"] new with 5', () => {
    let result;

    before(() => {
      subject = new Data('four', 3, ['zero', 1, 'two']);

      result = subject.new(5);
    });

    it('should return Data', () => {
      expect(result).to.be.an.instanceOf(Data);
    });

    it('should contain 5 as current', () => {
      expect(result.current).to.be.equal(5);
    });

    it('should contain "four" as previous', () => {
      expect(result.previous).to.be.equal('four');
    });

    it('should contain ["zero", 1, "two", 3] as old', () => {
      expect(result.old).to.be.eql(['zero', 1, 'two', 3]);
    });
  });
});
