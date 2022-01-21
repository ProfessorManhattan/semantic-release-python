const execa = require('execa')
const path = require('path')
const { getOption } = require('./util')
const got = require('got')
const FormData = require('form-data')

/**
 * @param name
 */
function assertEnvironmentVariable(name) {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is not set`)
  }
}

/**
 * @param executable
 * @param arguments_
 * @param exitCode
 */
async function assertExitCode(executable, arguments_ = [], exitCode = 0) {
  let res
  try {
    res = await execa(executable, arguments_)
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
async function verifySetupPy(setupPy) {
  try {
    await execa('python', [path.resolve(__dirname, 'verifySetup.py'), path.basename(setupPy)], {
      cwd: path.dirname(setupPy)
    })
  } catch {
    throw new Error(`version in ${setupPy}`)
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
 * @param root0
 * @param root0.logger
 */
async function verify(pluginConfig, { logger }) {
  const setupPy = getOption(pluginConfig, 'setupPy')
  const pypiPublish = getOption(pluginConfig, 'pypiPublish')

  if (pypiPublish !== false) {
    const username = process.env.PYPI_USERNAME ? process.env.PYPI_USERNAME : '__token__'
    const token = process.env.PYPI_TOKEN
    const repoUrl = process.env.PYPI_REPO_URL ? process.env.PYPI_REPO_URL : getOption(pluginConfig, 'repoUrl')

    assertEnvironmentVariable('PYPI_TOKEN')

    logger.log('Check if setuptools, wheel and twine are installed')
    await assertPackage('setuptools')
    await assertPackage('wheel')
    await assertPackage('twine')

    logger.log(`Verify authentication for ${username}@${repoUrl}`)
    await verifyAuth(repoUrl, username, token)
  }

  logger.log('Verify that version is not set in setup.py')
  await verifySetupPy(setupPy)
}

module.exports = {
  assertEnvVar: assertEnvironmentVariable,
  assertExitCode,
  assertPackage,
  verify,
  verifyAuth,
  verifySetupPy
}
