var through = require('through'),
    dotpather = require('dotpather')

module.exports = cob

function cob(path, value) {
  if (!path && !value) return through()

  var cob_stream = through(write, end),
      data = []

  return cob_stream

  function write(buf) {
    data.push(buf.toString())
  }

  function end() {
    data = data.join('')
    try {
      data = JSON.parse(data)
    } catch(e) {
      return
    }
    cob_stream.queue('' + (dotpather(path)(data)) + '\n')
    cob_stream.queue(null)
  }
}
