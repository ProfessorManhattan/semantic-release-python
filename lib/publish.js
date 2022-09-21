const execa = require('execa')
const { getOption } = require('./util')
const path = require('path')
const fs = require('fs')

/**
 * @param setupPy
 * @param distDir
 * @param repoUrl
 * @param gpgSign
 * @param gpgIdentity
 */
function publishPackage(setupPy, distDir, repoUrl, gpgSign, gpgIdentity) {
  return execa(
    'python3',
    [
      '-m',
      'twine',
      'upload',
      '--repository-url',
      repoUrl,
      '--non-interactive',
      '--skip-existing',
      '--verbose',
      gpgSign ? '--sign' : null,
      gpgSign && gpgIdentity ? '--identity' : null,
      gpgSign && gpgIdentity ? gpgIdentity : null,
      `${distDir}/*`
    ].filter((arg) => arg !== null),
    {
      cwd: path.dirname(setupPy),
      env: {
        TWINE_PASSWORD: process.env.PYPI_TOKEN,
        TWINE_USERNAME: process.env.PYPI_USERNAME ? process.env.PYPI_USERNAME : '__token__'
      }
    }
  )
}

/**
 * @param pluginConfig
 * @param logger
 * @param stdout
 * @param stderr
 */
async function publishSetupCfg(pluginConfig, logger, stdout, stderr) {
  const setupPy = getOption(pluginConfig, 'setupPy')
  const distDir = getOption(pluginConfig, 'distDir')
  const pypiPublish = getOption(pluginConfig, 'pypiPublish')
  const repoUrl = process.env.PYPI_REPO_URL ? process.env.PYPI_REPO_URL : getOption(pluginConfig, 'repoUrl')
  const gpgSign = getOption(pluginConfig, 'gpgSign')
  const gpgIdentity = getOption(pluginConfig, 'gpgIdentity')

  if (pypiPublish) {
    logger.log(`Publishing package to ${repoUrl}`)
    const result = publishPackage(setupPy, distDir, repoUrl, gpgSign, gpgIdentity)
    result.stdout.pipe(stdout, { end: false })
    result.stderr.pipe(stderr, { end: false })
    await result
  } else {
    logger.log('Not publishing package due to requested configuration')
  }
}

/**
 * @param pluginConfig
 * @param logger
 * @param stdout
 * @param stderr
 */
async function publishPoetry(pluginConfig, logger) {
  const setupPy = getOption(pluginConfig, 'setupPy')
  const pypiPublish = getOption(pluginConfig, 'pypiPublish')
  const repoUrl = process.env.PYPI_REPO_URL ? process.env.PYPI_REPO_URL : getOption(pluginConfig, 'repoUrl')

  if (pypiPublish) {
    try {
      logger.log(`Publishing package to ${repoUrl}`)
      await execa('poetry', ['config', 'repositories.repo', repoUrl], { cwd: path.dirname(setupPy) })
    } catch {
      throw new Error(`Failed to run "poetry config repositories.repo ${repoUrl}"`)
    }
    try {
      await execa(
        'poetry',
        [
          'publish',
          '--build',
          '--repository',
          'repo',
          '--username',
          '__token__',
          '--password',
          process.env.PYPI_TOKEN,
          '--no-interaction',
          '-vvv'
        ],
        { cwd: path.dirname(setupPy) }
      )
    } catch {
      throw new Error(`Failed to run "poetry config repositories.repo ${repoUrl}"`)
    }
  } else {
    logger.log('Not publishing package due to requested configuration')
  }
}

/**
 * @param pluginConfig
 * @param root0
 * @param root0.logger
 * @param root0.stdout
 * @param root0.stderr
 */
 async function publish(pluginConfig, { logger, stdout, stderr }) {
  const setupPy = getOption(pluginConfig, 'setupPy');
  if (fs.existsSync(setupPy)) {
    if (path.basename(setupPy) === "setup.cfg") {
      await publishSetupCfg(pluginConfig, logger, stdout, stderr)
    } else if (path.basename(setupPy) === "pyproject.toml") {
      await publishPoetry(pluginConfig, logger)
    }
  } else {
    const pypiPublish = getOption(pluginConfig, 'pypiPublish')
    if (pypiPublish !== false) {
      throw new Error(`Project must have either a setup.cfg or a pyproject.toml file`)
    }
  }
}

module.exports = {
  publish,
  publishPackage
}
