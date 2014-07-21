#!/usr/bin/env node

var path = require('path')
  , fs = require('fs')

var nopt = require('nopt')

var cob = require('../')

var noptions = {
    help: Boolean
  , version: Boolean
  , get: Array
  , set: Array
  , input: String
  , output: String
}

var shorts = {
    g: ['--get']
  , s: ['--set']
  , i: ['--input']
  , f: ['--input']
  , o: ['--output']
  , h: ['--help']
  , v: ['--version']
}

var cobPackage = require('../package.json')

var options = nopt(noptions, shorts, process.argv)

var outputStream
  , inputStream
  , cobStream
  , to_set
  , bits
  , arg
  , k
  , v

if(options.help) return help()
if(options.version) return version()

if(options.argv.remain.length) {
  for(var i = 0, l = options.argv.remain.length; i < l; ++i) {
    arg = options.argv.remain[i]

    if(arg.indexOf('=') > -1) {
      !options.set && (options.set = [])
      options.set.push(arg)
    } else {
      !options.get && (options.get = [])
      options.get.push(arg)
    }
  }
}

if(!options.input) {
  inputStream = process.stdin
} else {
  inputStream = fs.createReadStream(options.input)
}

if(!options.output) {
  outputStream = process.stdout
} else {
  outputStream = fs.createWriteStream(options.output)
}

if(!options.set && !options.get) {
  cobStream = cob()
} else if(options.set) {
  for(var i = 0, l = options.set.length; i < l; ++i) {
    bits = options.set[i].split('=')
    k = bits[0]
    v = bits[1]

    to_set[k] = JSON.parse(v)
  }

  cobStream = cob(to_set)
} else {
  cobStream = cob(options.get)
}

inputStream.pipe(cobStream).pipe(outputStream)

function help() {
  version()

  fs.createReadStream(path.resolve(__dirname, '..', 'help.txt'))
      .pipe(process.stderr)
}

function version() {
  process.stderr.write('cob version ' + cobPackage.version + '\n')
}
