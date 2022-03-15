import { Pipeline, Modules } from '..';

const init = async () => '1, 5, 3, 2';
const initer = new Modules.Custom(init);

const split = async (data: string) => data.split(', ');
const spliter = new Modules.Custom(split);

const modify = async (data: string) => `1${data}`;
const stringModifier = new Modules.Custom(modify);

const castToInt = async (data: string) => parseInt(data, 10);
const intCaster = new Modules.Custom(castToInt);

const sort = async (data: number[]) => data.sort();
const sorter = new Modules.Custom(sort);

const print = async (data: number[]) => data.forEach((d) => console.log(d));
const printer = new Modules.Custom(print);

const pipe = new Pipeline([initer, spliter, [stringModifier, intCaster], sorter, printer]);

pipe.run().then(() => console.log('ready.'));
