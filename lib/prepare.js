const execa = require('execa')
const { getOption, normalizeVersion, setopt } = require('./util')
const path = require('path')
const fs = require('fs')

/**
 * @param setupPy
 * @param version
 */
async function setReleaseVersion(setupPy, version) {
  try {
    await setopt(setupPy, 'metadata', 'version', version)
  } catch (error) {
    throw new Error(`failed to set release version ${version}\n${error}`)
  }
}

/**
 * @param setupPy
 * @param distDir
 */
async function sDistPackage(setupPy, distDir) {
  try {
    await execa('python3', [path.basename(setupPy), 'sdist', '--dist-dir', distDir], { cwd: path.dirname(setupPy) })
  } catch {
    throw new Error(`failed to build source archive`)
  }
}

/**
 * @param setupPy
 * @param distDir
 */
async function bDistPackage(setupPy, distDir) {
  try {
    await execa('python3', [path.basename(setupPy), 'bdist_wheel', '--dist-dir', distDir], {
      cwd: path.dirname(setupPy)
    })
  } catch {
    throw new Error(`failed to build wheel`)
  }
}

/**
 * @param pluginConfig
 * @param nextRelease
 * @param logger
 */
async function prepareSetupCfg(pluginConfig, nextRelease, logger) {
  const setupPy = getOption(pluginConfig, 'setupPy')
  const distDir = getOption(pluginConfig, 'distDir')
  const pypiPublish = getOption(pluginConfig, 'pypiPublish')

  const version = await normalizeVersion(nextRelease.version)

  logger.log(`Setting version to ${version}`)
  await setReleaseVersion(setupPy, version)

  if (pypiPublish !== false) {
    logger.log(`Build source archive`)
    await sDistPackage(setupPy, distDir)
    logger.log(`Build wheel`)
    await bDistPackage(setupPy, distDir)
  }
}

/**
 * @param pluginConfig
 * @param nextRelease
 * @param logger
 */
async function preparePoetry(pluginConfig, nextRelease, logger) {
  const setupPy = getOption(pluginConfig, 'setupPy')

  const version = await normalizeVersion(nextRelease.version)

  logger.log(`Setting version to ${version}`)
  try {
    await execa('poetry', ['version', nextRelease.version], { cwd: path.dirname(setupPy) })
  } catch {
    throw new Error(`Failed to run "poetry version ${nextRelease.version}"`)
  }
}

/**
 * @param pluginConfig
 * @param root0
 * @param root0.nextRelease
 * @param root0.logger
 */
 async function prepare(pluginConfig, { logger }) {
  const setupPy = getOption(pluginConfig, 'setupPy');
  if (fs.existsSync(setupPy)) {
    if (path.basename(setupPy) === "setup.cfg") {
      await verifySetupCfg(pluginConfig, logger)
    } else if (path.basename(setupPy) === "pyproject.toml") {
      await verifyPoetry(pluginConfig, logger)
    }
  } else {
    const pypiPublish = getOption(pluginConfig, 'pypiPublish')
    if (pypiPublish !== false) {
      throw new Error(`Project must have either a setup.cfg or a pyproject.toml file`)
    }
  }
}

module.exports = {
  bDistPackage,
  prepare,
  sDistPackage,
  setReleaseVersion
}
