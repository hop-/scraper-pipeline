import { expect } from 'chai';

import { Data } from '../../../src/data';

import { Custom } from '../../../src/modules/general';

describe('Custom Module', () => {
  describe('when perform is return 1', () => {
    describe('#run', () => {
      const cm = new Custom(async () => 1);

      it('should return Data', async () => {
        expect(await cm.run(new Data(null))).to.be.an.instanceof(Data);
      });

      it('should contain 1 as current value', async () => {
        expect(await (await cm.run(new Data(null))).current).to.be.equal(1);
      });
    });
  });
});
