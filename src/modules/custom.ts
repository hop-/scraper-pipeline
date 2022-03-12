import type Base from './base';

type ProcessorFunc<InputType, OutputType> = (data: InputType) => Promise<OutputType>;

class Custom<InputType, OutputType> implements Base {
  processor: ProcessorFunc<InputType, OutputType>;

  constructor(processor: ProcessorFunc<InputType, OutputType>) {
    this.processor = processor;
  }

  async run(data: InputType): Promise<OutputType> {
    return this.processor(data);
  }
}

export default Custom;
