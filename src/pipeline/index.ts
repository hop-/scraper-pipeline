import * as Bluebird from 'bluebird';
import type { Base as BaseModule } from '../modules';

export type Pipe = BaseModule | BaseModule[];
export class Pipeline {
  pipe: Pipe[];

  constructor(pipe: Pipe[]) {
    this.pipe = pipe;
  }

  // run the pipeline
  async run() {
    let data: any;

    this.pipe.forEach(async (p) => {
      if (p instanceof Array) {
        data = await Bluebird.map(data, (obj: any) => {
          let d = obj;

          p.forEach((m: any) => {
            d = m.run(d);
          });

          return d;
        });
      } else {
        data = await p.run(data);
      }
    });
  }
}
