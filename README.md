# Node.js Scraping Pipelines

![Build Status](https://github.com/hop-/scraper-pipeline/actions/workflows/main.yml/badge.svg)

## Introduction

Scraping pipeline is typescript asynchronous module.

It helps to organize the code in pipeline applications.

It contains some generic functonal to scrap, parse, process, modify and send data.

It also let you define custom modules when the generic functionality is not enough.

## Quick Start

How to install

```shell
npm i scraping-pipeline
```

Here are some examples to help you understand the features

### Basic pipeline with custom modules

```ts
import { Pipeline, Modules } from 'scraping-pipeline';

const yourFunctionToGetSomeCsv = async (): Promise<string> => {
  const someCsv: string;
  ...
  return someCsv;
};

const yourFunctionToStoreData = async (data: any) => {
  ...
};

const getter = new Modules.General.Custom(yourFunctionToGetSomeCsv);
const parser = new Modules.General.CsvParser({ headers: true });
const saver = new Modules.General.Custom(yourFunctionToStoreData);

const pipeline = new Pipeline([getter, parser, saver]);

pipeline.run().then(() => { console.log('Done') });
```

## Components and Types

### Pipeline

`Pipeline` is the main component of the package.
It is initiated with a pipe of `Modules`.

`Pipeline` has a method `run`.
By running the `Pipline` it will execute the `Modules` in sequence and feed `Data` from one to another.

First module doesn't have feed `Data`.

### Modules

`Modules` are the small components which are usually doing a single task.

All `Modules` are implementing `Modules.Base` and extending `Modules.Common<InputType, OutputType>`.

There are some `General` `Modules` which are designed to do generic tasks.

#### CsvParser

`Modules.General.CsvParser` is a module which helps to parse CSV `Data` and returns a structured output.

#### Custom

`Modules.General.Custom<InputType, OutputType>` is using a custom async function to solve custom problems.

It gets an async function as an processor wich will do the task.

The processor functions gets 3 arguments:

* data: InputType
* previous: any
* old: any[]

Returns a value with OutputType type

### Data

`Data<T>` is generic type to send `Data` between modules.
The `Data` contains `current`, `previous` and `old` data. It stores all data passed across the `Pipeline`.

Usually you don't need to think about `Data<T>`, it is used in lower level of pipeline.

## License

May be freely distributed under the [MIT license](https://raw.githubusercontent.com/hop-/scraper-pipeline/main/LICENSE).
