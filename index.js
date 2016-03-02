var is = require('type-is')

module.exports = function (express) {
  express || (express = require('express'))
  var send = express.response.send

  express.response.send = function(code, body) {
    body == null && (body=code, code=null)

    if (is.is(this.get('Content-Type'), 'json') && typeof body === 'string')
      body = body.replace(/</g, '\\u003c')

    return code
      ? send.call(this, code, body)
      : send.call(this, body)
  }
}
