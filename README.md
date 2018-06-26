# bson-fast-deep-equal
The fastest deep equal to work with `bson` or `bson-ext`

[![Build Status](https://travis-ci.org/Fonger/bson-fast-deep-equal.svg?branch=master)](https://travis-ci.org/Fonger/bson-fast-deep-equal)
[![npm version](https://badge.fury.io/js/bson-fast-deep-equal.svg)](http://badge.fury.io/js/bson-fast-deep-equal)
[![Coverage Status](https://coveralls.io/repos/github/Fonger/bson-fast-deep-equal/badge.svg?branch=master)](https://coveralls.io/github/Fonger/bson-fast-deep-equal?branch=master)


## Install

```bash
npm install Fonger/bson-fast-deep-equal
```


## Features

- ES5 compatible
- compatiable with bson and bson-ext
- works in node.js (0.10+) and browsers (IE9+)
- checks equality of Date and RegExp objects by value.
- additionally checks equality of the following BSON type by value.
  - ObjectId
  - Int32
  - Long
  - Decimal128
  - Timestamp
  - BSONRegExp
  - MaxKey
  - MinKey
- some primitive types in JavaScript are the same with bson. e.g. Double, Array, Boolean.
- binary data is **NOT** currently supported.

## Usage

```javascript
var equal = require('bson-fast-deep-equal');
var BSON = require('bson'); // or bson-ext
console.log(equal({foo: 'bar'}, {foo: 'bar'})); // true

var idA = BSON.ObjectID.createFromHexString('5b32688a8936060895b0fec1');
var idB = BSON.ObjectID.createFromHexString('5b32688a8936060895b0fec1');

console.log(equal({foo: idA}, {foo: idB})); // true
```


## Performance benchmark

Node.js v10.5.0:

```
bson-fast-deep-equal x 129,918 ops/sec ±3.00% (84 runs sampled)
fast-deep-equal x 157,447 ops/sec ±2.47% (81 runs sampled)
nano-equal x 164,383 ops/sec ±3.01% (84 runs sampled)
shallow-equal-fuzzy x 141,464 ops/sec ±3.29% (83 runs sampled)
underscore.isEqual x 92,865 ops/sec ±3.60% (76 runs sampled)
lodash.isEqual x 31,437 ops/sec ±2.65% (81 runs sampled)
deep-equal x 52,267 ops/sec ±3.32% (79 runs sampled)
deep-eql x 35,552 ops/sec ±2.68% (82 runs sampled)
assert.deepStrictEqual x 1,057 ops/sec ±3.08% (78 runs sampled)
ramda.equals x 10,662 ops/sec ±2.44% (84 runs sampled)
The fastest is nano-equal
```

To run benchmark (requires node.js 6+):

```bash
npm install
node benchmark
```


## License

[MIT](https://github.com/Fonger/bson-fast-deep-equal/blob/master/LICENSE)
