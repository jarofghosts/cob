var through = require('through')
  , DotPath = require('dotpath')

module.exports = cob

function cob(keys) {
  var cobStream = through(write, end)
    , data = ''

  if(typeof keys === 'string') keys = [keys]

  return cobStream

  function write(buf) {
    data += buf
  }

  function end() {
    try {
      data = JSON.parse(data)
    } catch(e) {
      return cobStream.queue(null)
    }

    if(!keys) return printJson(data)

    var traverse = new DotPath(data)

    if(Array.isArray(keys)) {
      for(var i = 0, l = keys.length; i < l; ++i) {
        printJson(traverse.get(keys[i]))
      }

      return cobStream.queue(null)
    }

    for(var k in keys) {
      traverse.forceSet(k, keys[k])
    }

    printJson(data)

    function printJson(data) {
      cobStream.queue(JSON.stringify(data, null, 2) + '\n')
    }
  }
}
