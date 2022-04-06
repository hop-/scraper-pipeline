import * as Bluebird from 'bluebird';
import type { Base as BaseModule } from '../modules';
import { Data } from '../data';

export type Pipe = BaseModule | Pipe[];

// recursive function
async function process(data: Data<any>, pipe: Pipe, concurrency: number): Promise<any> {
  if (pipe instanceof Array) {
    const { current } = data;
    const dataArray = current instanceof Array ? current : [current];

    const processedData = await Bluebird.map(dataArray, async (obj: any) => {
      let d = new Data(obj);

      await Bluebird.each(pipe, async (p: Pipe) => {
        d = await process(d, p, concurrency);
      });

      return d;
    }, { concurrency });

    // collecting all results in new array and creating hew data
    const da = processedData.reduce((a, d) => [
      a[0].concat(d.current),
      a[1].concat(d.previous),
      a[2].concat([d.old]),
    ], [[], [], data.old.concat()]);
    return new Data(da[0], da[1], da[2]);
  }

  return pipe.run(data);
}
export class Pipeline {
  pipe: Pipe;

  concurrency: number;

  constructor(pipe: Pipe, concurrency: number = 10) {
    this.pipe = pipe;
    this.concurrency = concurrency;
  }

  // run the pipeline
  async run(): Promise<void> {
    const emptyData = new Data(null);

    // recursive function call
    await process(emptyData, this.pipe, this.concurrency);
  }
}
