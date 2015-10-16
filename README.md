# cob

[![Build Status](http://img.shields.io/travis/jarofghosts/cob.svg?style=flat-square)](https://travis-ci.org/jarofghosts/cob)
[![npm install](http://img.shields.io/npm/dm/cob.svg?style=flat-square)](https://www.npmjs.org/package/cob)
[![npm version](https://img.shields.io/npm/v/cob.svg?style=flat-square)](https://www.npmjs.org/package/cob)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/cob.svg?style=flat-square)](https://github.com/jarofghosts/cob/blob/master/LICENSE)

Easily read and manipulate JSON

## installation

`npm install -g cob`

## usage

`cat package.json | cob -g bin.cob`

outputs

```
"./bin.cob.js"
```

`cob -i package.json -s description='"this module is dumb"'`

outputs

...
```
  "description": "this module is dumb"
```
...

## options

* `--input, -i, -f <file>` Read from input `<file>`
* `--output, -o <file>` Output to `<file>`
* `--get, -g <dotpath>` Return the value at `<dotpath>`
* `--set, -s <dotpath>=<value>` Set the value at `<dotpath>`

## note

Extra arguments not specified by a flag will be considered either a get or a
set based on the presence or lack thereof of an equal sign.

For example, `cob name` is equivalent to `cob --get name` and
`cob name='"dummy"'` is the same as doing `cob --set name='"dummy"'`.

## as a module

```js
var cob = require('cob')
```

and use it as so:

#### `cob()`

a through stream that pretty prints the JSON you throw at it

#### `cob('dot.paths') || cob(['dot.paths', 'a.plenty'])`

a through stream that returns newline separated values of each dotpath resolved
in the JSON you throw at it

#### `cob({'dot.path': "new value", 'a.plenty': true})`

a through stream that outputs all your JSON with the changes made as specified

## license

MIT
