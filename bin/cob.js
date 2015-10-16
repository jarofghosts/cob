#!/usr/bin/env node

var path = require('path')
var fs = require('fs')

var nopt = require('nopt')

var cob = require('../')

var noptions = {
  help: Boolean,
  version: Boolean,
  get: Array,
  set: Array,
  input: String,
  output: String
}

var shorts = {
  g: ['--get'],
  s: ['--set'],
  i: ['--input'],
  f: ['--input'],
  o: ['--output'],
  h: ['--help'],
  v: ['--version']
}

var cobPackage = require('../package.json')

module.exports = bin

if (require.main === module) {
  bin()
}

function bin () {
  var options = nopt(noptions, shorts, process.argv)
  var toSet = {}

  var outputStream
  var inputStream
  var cobStream
  var bits
  var arg
  var k
  var v

  if (options.help) {
    return help()
  }

  if (options.version) {
    return version()
  }

  if (options.argv.remain.length) {
    for (var i = 0, l = options.argv.remain.length; i < l; ++i) {
      arg = options.argv.remain[i]

      if (arg.indexOf('=') > -1) {
        !options.set && (options.set = [])
        options.set.push(arg)
      } else {
        !options.get && (options.get = [])
        options.get.push(arg)
      }
    }
  }

  if (!options.input) {
    inputStream = process.stdin
  } else {
    inputStream = fs.createReadStream(options.input)
  }

  if (!options.output) {
    outputStream = process.stdout
  } else {
    outputStream = fs.createWriteStream(options.output)
  }

  if (!options.set && !options.get) {
    cobStream = cob()
  } else if (options.set) {
    for (var j = 0, m = options.set.length; j < m; ++j) {
      bits = options.set[j].split('=')
      k = bits[0]
      v = bits[1]

      toSet[k] = JSON.parse(v)
    }

    cobStream = cob(toSet)
  } else {
    cobStream = cob(options.get)
  }

  inputStream.pipe(cobStream).pipe(outputStream)
}

function help () {
  version()

  fs.createReadStream(path.resolve(__dirname, '..', 'help.txt'))
    .pipe(process.stderr)
}

function version () {
  process.stderr.write('cob version ' + cobPackage.version + '\n')
}
