export class Data<T> {
  current: T;

  previous: any;

  old: any[];

  constructor(current: T, previous: any = undefined, old: any[] = []) {
    this.current = current;
    this.previous = previous;
    this.old = old || [];
  }

  new<OtherType>(data: OtherType): Data<OtherType> {
    return new Data(
      data,
      this.current,
      this.previous ? this.old.concat(this.previous) : this.old.concat(),
    );
  }
}

export default Data;
