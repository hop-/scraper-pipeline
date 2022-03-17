import { Common } from './common';

type ProcessorFunc<InputType, OutputType> = (data: InputType, previous: any, old: any[]) => Promise<OutputType>;

export class Custom<InputType, OutputType> extends Common<InputType, OutputType> {
  process: ProcessorFunc<InputType, OutputType>;

  constructor(name:string, processor: ProcessorFunc<InputType, OutputType>) {
    super(name);
    this.process = processor;
  }
}

export default Custom;
