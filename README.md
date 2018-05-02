# promise-splittetr

<div>
	<a href="https://www.npmjs.com/package/promise-splittetr"><img src='http://img.shields.io/npm/v/promise-splittetr.svg?style=flat'></a>
	<a href="https://www.npmjs.com/package/promise-splittetr"><img src='https://img.shields.io/npm/dm/promise-splittetr.svg?style=flat-square'></a>
	<a href="https://david-dm.org/giowe/promise-splittetr"><img src='https://david-dm.org/giowe/promise-splittetr/status.svg'></a>
	<a href="https://www.youtube.com/watch?v=Sagg08DrO5U"><img src='http://img.shields.io/badge/gandalf-approved-61C6FF.svg'></a>
</div>

Split a promise list into chunks and exectes them synchronously with a retry system

## Usage example
```
const splitter = require('promise-splitter');

splitter([...array_of_promises], options)
  .then(console.log)
  .catch(console.log);
```

## Options
default option values
```
{
  chunkSize: 5,
  retryLimit: 3,
  startChunk: 1,
  verbose: false,
  logger: console
}
```
