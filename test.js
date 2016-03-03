var safe_json = require('./index')
  , express   = require('express')
  , assert    = require('assert')
  , request   = require('supertest')

describe('express-safe-json', function() {
  it('escapes HTML in JSON responses', function(done) {
    var app = express()
    app.set('json spaces', false)
    safe_json(app)
    app.get('/', function(req, res) { res.json({'<foo>':'<bar>'}) })

    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect('{"\\u003cfoo>":"\\u003cbar>"}')
      .expect({'<foo>':'<bar>'}, done)
  })
})
