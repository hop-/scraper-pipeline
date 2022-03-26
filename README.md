# Node.js Pipelines

## Introduction

Scraper pipeline is typescript asynchronous module.

It helps to organize the code in pipeline applications.

It contains some generic fonctonal to scrape, parse, modify and send data.

It also let you define custom modules when the generic fonctional is not enough.

## Quick Start

How to install

```shell
npm install scraper-pipeline
```

Here are some examples to help you understand the features

### Basic pipeline with custom modules

```ts
import { Pipeline, Modules } from '..';

const yourFunctionToGetSomeCsv = async () => {
  ...
};

const yourFunctionToStoreData = async (data: any) => {
  ...
};

const getter = new Modules.General.Custom(yourFunctionToGetSomeCsv);
const parser = new Modules.General.CsvParser({headers: true});
const saver = new Modules.General.Custom(yourFunctionToStoreData);

const pipeline = new Pipeline([getter, parser, saver]);

pipeline.run().then(() => { console.log('Done') });
```

## Components and Types

`Pipeline` is the main component of the package.
It is initiated with a pipe of `Modules`.

`Pipeline` has a method `run`.
By running the `Pipline` it will execute the `Modules` in sequence and feed `Data` from one to another.

First module doesn't have feed `Data`.

`Modules` are the small components which are usually doing a single function.

All `Modules` are implementing `Modules.Base` and extending `Modules.Common<InputType, OutputType>` class.

There are some `General` `Modules` which are designed to solve general problems.

`Modules.General.CsvParser` is a module which helps to parse CSV `Data` and returns a structured output.

`Modules.General.Custom<InputType, OutputType>` is using a custom async function to solve custom problems.

`Data<T>` is generic type to send `Data` between modules.
The `Data` contains `current`, `previous` and `old` data. It stores all data passed across the `Pipeline`.

## License

May be freely distributed under the [MIT license](https://raw.githubusercontent.com/hop-/scraper-pipeline/main/LICENSE).
