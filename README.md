cob
===

[![Build Status](https://travis-ci.org/jarofghosts/cob.png?branch=master)](https://travis-ci.org/jarofghosts/cob)

Easily read and manipulate json

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

#### `cob({ 'dot.path': "new value", 'a.plenty': true })`

a through stream that outputs all your JSON with the changes made as specified

## license

MIT
