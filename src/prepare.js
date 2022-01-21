const execa = require('execa')
const { getOption, normalizeVersion, setopt} = require('./util')
const path = require('path')

async function setReleaseVersion(setupPy, version){
    try{
        await setopt(setupPy, 'metadata', 'version', version)
    } catch(err){
        throw Error(`failed to set release version ${version}\n${err}`)
    }   
}

async function sDistPackage(setupPy, distDir){
    try {
        await execa('python', [
            path.basename(setupPy),
            'sdist',
            '--dist-dir',
            distDir
        ], {cwd: path.dirname(setupPy)})
    } catch(err){
        throw Error(`failed to build source archive`)
    }
}

async function bDistPackage(setupPy, distDir){
    try {
        await execa('python', [
            path.basename(setupPy),
            'bdist_wheel',
            '--dist-dir',
            distDir
        ], {cwd: path.dirname(setupPy)})
    } catch(err){
        throw Error(`failed to build wheel`)
    }
}

async function prepareSetupCfg(pluginConfig, nextRelease, logger){
    let setupPy = getOption(pluginConfig, 'setupPy')
    let distDir = getOption(pluginConfig, 'distDir')
    let pypiPublish = getOption(pluginConfig, 'pypiPublish')

    let version = await normalizeVersion(nextRelease.version)

    logger.log(`Setting version to ${version}`)    
    await setReleaseVersion(setupPy, version)

    if (pypiPublish !== false) {
        logger.log(`Build source archive`)    
        await sDistPackage(setupPy, distDir)
        logger.log(`Build wheel`)    
        await bDistPackage(setupPy, distDir)
    }
}

async function preparePoetry(pluginConfig, nextRelease, logger) {
    let setupPy = getOption(pluginConfig, 'setupPy')

    logger.log(`Setting version to ${version}`)
    try {
        await execa('poetry', [
            'version',
            nextRelease.version
        ], {cwd: path.dirname(setupPy)})
    } catch(err){
        throw Error(`Failed to run "poetry version ${nextRelease.version}"`)
    }
}

async function prepare(pluginConfig, { nextRelease, logger }){
    if (fs.existsSync('./setup.cfg')) {
        await prepareSetupCfg(pluginConfig, nextRelease, logger)
    } else if (fs.existsSync('./pyproject.toml')) {
        await preparePoetry(pluginConfig, nextRelease, logger)
    } else {
        let pypiPublish = getOption(pluginConfig, 'pypiPublish')
        if (pypiPublish !== false) {
            throw Error(`Project must have either a setup.cfg or a pyproject.toml file`)
        }
    }
}

module.exports = {
    setReleaseVersion,
    sDistPackage,
    bDistPackage,
    prepare
}