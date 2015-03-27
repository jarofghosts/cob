var test = require('tape')

var cob = require('../')

test('queues pretty printed json on write', function(t) {
  var testObj = {hello: {world: true}}
    , cobStream = cob()

  cobStream.on('data', function(data) {
    t.equal(data.toString(), JSON.stringify(testObj, null, 2) + '\n')
    t.end()
  })

  cobStream.end(JSON.stringify(testObj))
})

test('streams values at dotpath if specified', function(t) {
  var testObj = {hello: {world: true}}
    , cobStream = cob('hello.world')

  cobStream.on('data', function(data) {
    t.equal(data.toString(), JSON.stringify(true) + '\n')
    t.end()
  })

  cobStream.end(JSON.stringify(testObj))
})

test('streams values at dotpath if specified', function(t) {
  var testObj = {hello: {world: true}}
    , cobStream = cob({'hello.world': false})

  cobStream.on('data', function(data) {
    t.equal(
        data.toString()
      , JSON.stringify({hello: {world: false}}, null, 2) + '\n'
    )
    t.end()
  })

  cobStream.end(JSON.stringify(testObj))
})
