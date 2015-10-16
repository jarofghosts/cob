var dotpath = require('deep-property')
var concat = require('concat-stream')
var through = require('through2')
var duplex = require('duplexify')

module.exports = cob

function cob (keys) {
  var stream = through()

  return duplex(concat(onend), stream)

  function onend (buf) {
    var data = parseJson(buf)

    if (!keys) {
      print(data)

      return stream.push(null)
    }

    if (typeof keys === 'string') {
      keys = [keys]
    }

    if (Array.isArray(keys)) {
      keys.map(lookup).forEach(print)

      return stream.push(null)
    }

    print(Object.keys(keys).reduce(updateObj, data))
    stream.push(null)

    function lookup (key) {
      return dotpath.get(data, key)
    }
  }

  function updateObj (data, key) {
    dotpath.set(data, key, keys[key])

    return data
  }

  function print (obj) {
    stream.push(JSON.stringify(obj, null, 2) + '\n')
  }

  function parseJson (str) {
    try {
      return JSON.parse(str.toString())
    } catch (err) {
      stream.emit('error', err)

      return false
    }
  }
}
