import * as Bluebird from 'bluebird';
import type { Base as BaseModule } from '../modules';
import Data from '../data';

export type Pipe = BaseModule | Pipe[];

// recursive function
async function process(data: Data<any>, pipe: Pipe): Promise<any> {
  if (pipe instanceof Array) {
    const { current } = data;
    const dataArray = current instanceof Array ? current : [current];

    const processedData = await Bluebird.map(dataArray, async (obj: any) => {
      let d = obj;
      await Bluebird.each(pipe, async (p: Pipe) => {
        d = await process(d, p);
      });

      return d;
    });

    // collecting all results in new array and creating hew data
    return data.new(processedData.map((p) => p));
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
    const emptyData = new Data(null);

    // recursive function call
    await process(emptyData, this.pipe);
  }
}
