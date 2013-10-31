var cob = require('../'),
    assert = require('assert'),
    stream = require('stream')

var test_obj = { hello: { world: true } }

var r = stream.Readable()
r._read = function () {
  r.push(JSON.stringify(test_obj))
  r.push(null)
}
var w = stream.Writable(),
    data = []

w.write = function(chunk, enc, next) {
  assert.strictEqual(JSON.parse(chunk), true)
  next && next()
}

r.pipe(cob('hello.world')).pipe(w)
