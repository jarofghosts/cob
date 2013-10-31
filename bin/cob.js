#!/usr/bin/env node

var cob = require('../'),
    fs = require('fs'),
    path = require('path'),
    nopt = require('nopt'),
    noptions = {
      help: Boolean,
      version: Boolean,
      get: Array,
      set: Array,
      input: String,
      output: String
    },
    shorts = {
      g: ['--get'],
      s: ['--set'],
      i: ['--input'],
      f: ['--input'],
      o: ['--output'],
      h: ['--help'],
      v: ['--version']
    },
    options = nopt(noptions, shorts, process.argv),
    input_stream,
    output_stream,
    cob_stream

if (options.help) return help()
if (options.version) return version()

if (!options.input) {
  input_stream = process.stdin
} else {
  input_stream = fs.createReadStream(options.input)
}

if (!options.output) {
  output_stream = process.stdout
} else {
  output_stream = fs.createWriteStream(options.output)
}

if (!options.set && !options.get) {
  cob_stream = cob()
} else if (options.set) {
  var to_set = {}
  for (var i = 0, l = options.set.length; i < l; ++i) {
    var bits = options.set[i].split('='),
        k = bits[0],
        v = bits[1]

    to_set[k] = JSON.parse(v)
  }

  cob_stream = cob(to_set)

} else {
  cob_stream = cob(options.get)
}

input_stream.pipe(cob_stream).pipe(output_stream)

function help() {
  version()
  fs.createReadStream(path.resolve(__dirname, '..', 'help.txt'))
      .pipe(process.stdout)
}

function version() {
  var cob_package = require('../package.json')
  process.stdout.write('cob version ' + cob_package.version + '\n')
}
