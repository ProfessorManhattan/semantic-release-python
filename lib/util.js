const defaultOptions = require('./defaultOptions')
const execa = require('execa')
const path = require('path')

/**
 * Determines whether an object has an own (non-inherited) property.
 *
 * This intentionally avoids `Object.hasOwn`, which was added in Node.js 16.9
 * and therefore throws `TypeError: Object.hasOwn is not a function` on older
 * runtimes that this package still supports (see `engines.node` in
 * package.json).
 *
 * @param object
 * @param property
 */
function hasOwn(object, property) {
  if (object === null || typeof object === 'undefined') {
    return false
  }

  return Object.prototype.hasOwnProperty.call(object, property)
}

/**
 * @param pluginConfig
 * @param option
 */
function getOption(pluginConfig, option) {
  return hasOwn(pluginConfig, option) ? pluginConfig[option] : defaultOptions[option]
}

/**
 * @param version
 */
async function normalizeVersion(version) {
  const { stdout } = await execa('python3', [
    '-c',
    'import pkg_resources\n' + `print(pkg_resources.packaging.version.Version('${version}'))`
  ])

  return stdout
}

/**
 * @param setupPy
 * @param command
 * @param option
 * @param value
 */
function setopt(setupPy, command, option, value) {
  return execa(
    'python3',
    [path.basename(setupPy), 'setopt', `--command=${command}`, `--option=${option}`, `--set-value=${value}`],
    { cwd: path.dirname(setupPy) }
  )
}

module.exports = {
  getOption,
  hasOwn,
  normalizeVersion,
  setopt
}
