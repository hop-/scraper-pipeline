import type Base from './base';
import Data from '../data';

abstract class Common<InputType, OutputType> implements Base {
  abstract process(data: InputType, previous: any, old: any[]): Promise<OutputType>;

  async run(data: Data<InputType>): Promise<Data<OutputType>> {
    const { current, previous, old } = data;
    const newData = await this.process(current, previous, old);

    old.push(previous);

    // TODO: fix the logic
    // extra work when array pipe
    return data.new(newData);
  }
}

export default Common;
