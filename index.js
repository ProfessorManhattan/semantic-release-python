const { verify } = require('./lib/verify')
const { prepare } = require('./lib/prepare')
const { publish } = require('./lib/publish')

module.exports = {
  prepare,
  publish,
  verifyConditions: verify
}
