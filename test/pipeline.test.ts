import { expect } from 'chai';

import { Pipeline } from '../src/pipeline';

describe('Pipeline', () => {
  let subject: Pipeline;

  context('when empty', () => {
    before(() => {
      subject = new Pipeline([]);
    });

    it('run should pass', async () => {
      expect(subject.run).to.not.throw();
    });
  });

  // TODO: add more tests
});
