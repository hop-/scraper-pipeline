import type Base from './base';
import type Data from '../data';

abstract class Common<InputType, OutputType> implements Base {
  abstract process(data: InputType): Promise<OutputType>;

  async run(data: Data<InputType>): Promise<Data<OutputType>> {
    const { current, previous } = data;
    const newData = await this.process(current);

    previous.push(current);

    return {
      current: newData,
      previous,
    };
  }
}

export default Common;
