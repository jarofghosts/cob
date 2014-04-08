var through = require('through')
  , DotPath = require('dotpath')

module.exports = cob

function cob(keys) {
  var cob_stream = through(write, end)
    , data = []

  if (typeof keys === 'string') keys = [keys]

  return cob_stream

  function write(buf) {
    data.push(buf.toString())
  }

  function end() {
    data = data.join('')

    try {
      data = JSON.parse(data)
    } catch(e) {
      return cob_stream.queue(null)
    }

    if (!keys) return print_json(data)

    var traverse = new DotPath(data)

    if (Array.isArray(keys)) {
      for (var i = 0, l = keys.length; i < l; ++i) {
        print_json(traverse.get(keys[i]))
      }

      return cob_stream.queue(null)
    }

    for (var k in keys) {
      traverse.forceSet(k, keys[k])
    }

    print_json(data)

    function print_json(data) {
      return cob_stream.queue(JSON.stringify(data, null, 2) + '\n')
    }
  }
}
