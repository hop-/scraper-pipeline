import Common from './common';

type ProcessorFunc<InputType, OutputType> = (data: InputType, previous: any, old: any[]) => Promise<OutputType>;

class Custom<InputType, OutputType> extends Common<InputType, OutputType> {
  process: ProcessorFunc<InputType, OutputType>;

  constructor(processor: ProcessorFunc<InputType, OutputType>) {
    super();
    this.process = processor;
  }
}

export default Custom;
