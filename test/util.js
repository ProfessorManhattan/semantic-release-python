const { setopt } = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')
const got = require('got')
const { v4: uuidv4 } = require('uuid')

const defaultContent = `
from setuptools import setup
setup()
`

/**
 * @param setupPy
 * @param name
 * @param content
 */
async function genPackage(setupPy, name, content = defaultContent) {
  const dir = path.dirname(setupPy)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(setupPy, content)

  const options = [['name', name]]

  for (const [option, value] of options) {
    await setopt(setupPy, 'metadata', option, value)
  }
}

/**
 * @param repoUrl
 * @param packageName
 * @param version
 */
async function hasPackage(repoUrl, packageName, version) {
  const url = `${repoUrl}/pypi/${packageName}/${version}/json`
  try {
    await got.get(url)

    return true
  } catch {
    return false
  }
}

/**
 *
 * @param {string} setupPy path of setup.py
 * @param name
 * @returns {{config: object, context: object, packageName: string}}
 */
async function genPluginArguments(setupPy, name = 'integration') {
  const packageName = `semantic-release-pypi-${name}-test-${uuidv4()}`

  const config = {
    repoUrl: 'https://test.pypi.org/legacy/',
    setupPy
  }

  const context = {
    logger: {
      log: jest.fn()
    },
    nextRelease: {
      version: '1.2.3'
    },
    stderr: process.stderr,
    stdout: process.stdout
  }

  await genPackage(setupPy, packageName)

  return { config, context, packageName }
}

module.exports = {
  genPackage,
  genPluginArgs: genPluginArguments,
  hasPackage
}
