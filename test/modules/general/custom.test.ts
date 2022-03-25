import { expect } from 'chai';

import { Data } from '../../../src/data';
import { Custom } from '../../../src/modules/general';

describe('Custom Module', () => {
  let subject: Custom<any, any>;

  context('when perform is return 1 run', () => {
    let result;

    before(async () => {
      subject = new Custom(async () => 1);
      result = (await subject.run(new Data(null)));
    });

    it('should return Data', () => {
      expect(result).to.be.an.instanceOf(Data);
    });

    it('should contain 1 as data current', () => {
      expect(result.current).to.be.equal(1);
    });
  });
});
