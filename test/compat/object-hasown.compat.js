/**
 * Compatibility check for the minimum supported Node.js version (see
 * `engines.node` in package.json).
 *
 * It intentionally runs without a test framework so that it can execute on the
 * oldest Node.js release supported by this package, where `Object.hasOwn` is
 * unavailable. Reproduces https://github.com/ProfessorManhattan/semantic-release-python/issues/1
 */
const assert = require('assert')
const path = require('path')

const MINIMUM_NODE = { major: 14, minor: 18, patch: 0 }

const parseVersion = (value) =>
  value
    .replace(/^v/, '')
    .split('.')
    .map((part) => Number.parseInt(part, 10))

const compareVersions = (left, right) => {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] - right[index]
    }
  }

  return 0
}

const current = parseVersion(process.version)
const minimum = [MINIMUM_NODE.major, MINIMUM_NODE.minor, MINIMUM_NODE.patch]

assert.ok(
  compareVersions(current, minimum) >= 0,
  `This package requires Node.js >=${minimum.join('.')} but ${process.version} is running`
)

// Simulate a runtime without `Object.hasOwn` before the library is loaded so
// that a hidden dependency on it fails this check instead of production.
if (typeof Object.hasOwn === 'function') {
  delete Object.hasOwn
}

assert.strictEqual(typeof Object.hasOwn, 'undefined', 'Failed to simulate a pre-16.9 Node.js runtime')

const { getOption, hasOwn } = require(path.join(__dirname, '..', '..', 'lib', 'util'))

// Own vs. inherited vs. missing properties
assert.strictEqual(hasOwn({ distDir: 'mydist' }, 'distDir'), true)
assert.strictEqual(hasOwn({}, 'distDir'), false)
assert.strictEqual(hasOwn(Object.create({ distDir: 'mydist' }), 'distDir'), false)
assert.strictEqual(hasOwn(Object.create(null), 'distDir'), false)
assert.strictEqual(hasOwn(null, 'distDir'), false)
assert.strictEqual(hasOwn(undefined, 'distDir'), false)

// Defaults, explicit overrides (`false` must survive), unknown options
assert.strictEqual(getOption({}, 'distDir'), 'dist')
assert.strictEqual(getOption({}, 'setupPy'), './setup.py')
assert.strictEqual(getOption({}, 'repoUrl'), 'https://upload.pypi.org/legacy/')
assert.strictEqual(getOption({ distDir: 'mydist' }, 'distDir'), 'mydist')
assert.strictEqual(getOption({ pypiPublish: false }, 'pypiPublish'), false)
assert.strictEqual(getOption({}, 'foo'), undefined)
assert.strictEqual(getOption(undefined, 'distDir'), 'dist')

// eslint-disable-next-line no-console
console.log(`Node.js ${process.version}: semantic-release-python configuration compatibility OK`)
