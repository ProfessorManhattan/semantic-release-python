const execa = require('execa')
const path = require('path')
const { getOption } = require('./util')
const got = require('got')
const FormData = require('form-data')
const fs = require('fs')

/**
 * @param name
 */
function assertEnvVar(name) {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is not set`)
  }
}

/**
 * @param executable
 * @param args
 * @param exitCode
 */
async function assertExitCode(executable, args = [], exitCode = 0) {
  let res
  try {
    res = await execa(executable, args)
  } catch (error) {
    res = error
  }
  if (res.exitCode != exitCode) {
    throw new Error(`command: ${res.command}, exit code: ${res.exitCode}, expected: ${exitCode}`)
  }
}

/**
 * @param name
 */
async function assertPackage(name) {
  try {
    await assertExitCode('pip', ['show', name], 0)
  } catch {
    throw new Error(`Package ${name} is not installed`)
  }
}

/**
 * @param setupPy
 */
async function verifySetupPy(setupPy, logger) {
  try {
    const verifyPath = path.resolve(__dirname, 'verifySetup.py')
    const setupPyFolder = path.basename(setupPy)
    const cwd = path.dirname(setupPy)
    logger.log(`Running verifyPython.py on ${verifyPath} with ${setupPyFolder} at ${cwd}`)
    await execa('python3', [verifyPath, setupPyFolder], {
      cwd
    })
  } catch(error) {
    logger.log(error)
    throw new Error(`version in ${setupPy}`, error)
  }
}

/**
 * @param repoUrl
 * @param username
 * @param token
 */
async function verifyAuth(repoUrl, username, token) {
  const form = new FormData()
  form.append(':action', 'file_upload')

  const basicAuth = Buffer.from(`${username}:${token}`).toString('base64')
  const headers = {
    Authorization: `Basic ${basicAuth}`
  }
  try {
    await got(repoUrl, {
      body: form,
      headers: Object.assign(headers, form.getHeaders()),
      method: 'post'
    })
  } catch (error) {
    if (error.response && error.response.statusCode == 403) {
      throw error
    }
  }
}

/**
 * @param pluginConfig
 * @param logger
 */
async function verifySetupCfg(pluginConfig, logger) {
  const setupPy = getOption(pluginConfig, 'setupPy')
  const pypiPublish = getOption(pluginConfig, 'pypiPublish')

  if (pypiPublish !== false) {
    const username = process.env.PYPI_USERNAME ? process.env.PYPI_USERNAME : '__token__'
    const token = process.env.PYPI_TOKEN
    const repoUrl = process.env.PYPI_REPO_URL ? process.env.PYPI_REPO_URL : getOption(pluginConfig, 'repoUrl')

    assertEnvVar('PYPI_TOKEN')

    logger.log('Check if setuptools, wheel and twine are installed')
    await assertPackage('setuptools')
    await assertPackage('wheel')
    await assertPackage('twine')

    logger.log(`Verify authentication for ${username}@${repoUrl}`)
    await verifyAuth(repoUrl, username, token)
  }

  logger.log('Verify that version is not set in setup.py')
  await verifySetupPy(setupPy, logger)
}

/**
 * @param pluginConfig
 * @param logger
 */
async function verifyPoetry(pluginConfig, logger) {
  const pypiPublish = getOption(pluginConfig, 'pypiPublish')

  if (pypiPublish !== false) {
    const username = process.env.PYPI_USERNAME ? process.env.PYPI_USERNAME : '__token__'
    const token = process.env.PYPI_TOKEN
    const repoUrl = process.env.PYPI_REPO_URL ? process.env.PYPI_REPO_URL : getOption(pluginConfig, 'repoUrl')

    assertEnvVar('PYPI_TOKEN')

    logger.log('Check if poetry is installed')
    await assertExitCode('poetry')

    logger.log(`Verify authentication for ${username}@${repoUrl}`)
    await verifyAuth(repoUrl, username, token)
  }
}

/**
 * @param pluginConfig
 * @param root0
 * @param root0.logger
 */
async function verify(pluginConfig, { logger }) {
  if (fs.existsSync('./setup.cfg')) {
    await verifySetupCfg(pluginConfig, logger)
  } else if (fs.existsSync('./pyproject.toml')) {
    await verifyPoetry(pluginConfig, logger)
  } else {
    const pypiPublish = getOption(pluginConfig, 'pypiPublish')
    if (pypiPublish !== false) {
      throw new Error(`Project must have either a setup.cfg or a pyproject.toml file`)
    }
  }
}

module.exports = {
  assertEnvVar,
  assertExitCode,
  assertPackage,
  verify,
  verifyAuth,
  verifySetupPy
}
