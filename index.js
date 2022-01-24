const { verify } = require('./src/verify')
const { prepare } = require('./src/prepare')
const { publish } = require('./src/publish')

module.exports = {
  prepare,
  publish,
  verifyConditions: verify
}
