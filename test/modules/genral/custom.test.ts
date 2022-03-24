import { expect } from 'chai';

import { Data } from '../../../src/data';
import { Custom } from '../../../src/modules/general';

describe('Custom Module', () => {
  describe('when perform is return 1', () => {
    const cm = new Custom(async () => 1);

    let result;

    before(async () => {
      result = (await cm.run(new Data(null)));
    });

    it('should return Data', () => {
      expect(result).to.be.an.instanceOf(Data);
    });

    it('should contain 1 as current value', () => {
      expect(result.current).to.be.equal(1);
    });
  });
});
