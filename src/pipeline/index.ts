import type Base from '../modules/base';

export default class Pipeline {
  pipe: Base[];

  constructor(pipe: Base[]) {
    this.pipe = pipe;
  }

  async execute(): Promise<void> {
    let object = {};
    this.pipe.forEach(async (m) => {
      object = await m.run(object);
    });
  }
}
