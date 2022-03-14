import * as Bluebird from 'bluebird';
import type { Base as BaseModule } from '../modules';

export type Pipe = BaseModule | Pipe[];

async function process(data: any, pipe: Pipe): Promise<any> {
  if (pipe instanceof Array) {
    const dataArray = data instanceof Array ? data : [data];

    return Bluebird.map(dataArray, async (obj: any) => {
      let d = obj;
      await Bluebird.each(pipe, async (p: Pipe) => {
        d = await process(d, p);
      });

      return d;
    });
  }

  return pipe.run(data);
}
export class Pipeline {
  pipe: Pipe;

  constructor(pipe: Pipe) {
    this.pipe = pipe;
  }

  // run the pipeline
  async run(): Promise<void> {
    const emptyData = {
      current: null,
      previous: [],
    };

    await process(emptyData, this.pipe);
  }
}
