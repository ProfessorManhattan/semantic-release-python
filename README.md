<!-- ⚠️ This README has been generated from the file(s) ".config/docs/blueprint-readme-plugin.md" ⚠️--><div align="center">
  <center>
    <a href="https://github.com/ProfessorManhattan/semantic-release-python">
      <img width="148" height="148" alt="Semantic Release Python logo" src="https://gitlab.com/megabyte-labs/npm/plugin/semantic-release-python/-/raw/master/logo.png" />
    </a>
  </center>
</div>
<div align="center">
  <center><h1 align="center"><i></i>Semantic Release Python (with Poetry Support)<i></i></h1></center>
  <center><h4 style="color: #18c3d1;">A plugin created by <a href="https://megabyte.space" target="_blank">Megabyte Labs</a></h4><i></i></center>
</div>

<div align="center">
  <a href="https://megabyte.space" title="Megabyte Labs homepage" target="_blank">
    <img alt="Homepage" src="https://img.shields.io/website?down_color=%23FF4136&down_message=Down&label=Homepage&logo=home-assistant&logoColor=white&up_color=%232ECC40&up_message=Up&url=https%3A%2F%2Fmegabyte.space&style=for-the-badge" />
  </a>
  <a href="https://github.com/ProfessorManhattan/semantic-release-python/blob/master/docs/CONTRIBUTING.md" title="Learn about contributing" target="_blank">
    <img alt="Contributing" src="https://img.shields.io/badge/Contributing-Guide-0074D9?logo=github-sponsors&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://app.slack.com/client/T01ABCG4NK1/C01NN74H0LW/details/" title="Chat with us on Slack" target="_blank">
    <img alt="Slack" src="https://img.shields.io/badge/Slack-Chat-e01e5a?logo=slack&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://github.com/ProfessorManhattan/semantic-release-python" title="GitHub mirror" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/badge/Mirror-GitHub-333333?logo=github&style=for-the-badge" />
  </a>
  <a href="https://gitlab.com/megabyte-labs/npm/plugin/semantic-release-python" title="GitLab repository" target="_blank">
    <img alt="GitLab" src="https://img.shields.io/badge/Repo-GitLab-fc6d26?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHJJREFUCNdNxKENwzAQQNEfWU1ZPUF1cxR5lYxQqQMkLEsUdIxCM7PMkMgLGB6wopxkYvAeI0xdHkqXgCLL0Beiqy2CmUIdeYs+WioqVF9C6/RlZvblRNZD8etRuKe843KKkBPw2azX13r+rdvPctEaFi4NVzAN2FhJMQAAAABJRU5ErkJggg==&style=for-the-badge" />
  </a>
</div>
<br/>
<div align="center">
  <a href="https://www.npmjs.com/package/semantic-release-python" title="Version 2.5.22" target="_blank">
    <img alt="Version: 2.5.22" src="https://img.shields.io/badge/version-2.5.22-blue.svg?cacheSeconds=2592000&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAACNJREFUCNdjIACY//+BEp9hhM3hAzYQwoBIAqEDYQrCZLwAAGlFKxU1nF9cAAAAAElFTkSuQmCC&style=flat-square" />
  </a>
  <a href="https://gitlab.com/megabyte-labs/npm/plugin/semantic-release-python/-/commits/master" title="GitLab CI build status" target="_blank">
    <img alt="Build status" src="https://img.shields.io/gitlab/pipeline-status/megabyte-labs/npm/plugin/semantic-release-python?branch=master&label=build&logo=gitlab&logoColor=white&style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/semantic-release-python" title="Dependency status reported by Depfu" target="_blank">
    <img alt="Dependency status reported by Depfu" src="https://img.shields.io/depfu/megabyte-labs/semantic-release-python?logo=codeforces&logoColor=white&style=flat-square&logo=npm" />
  </a>
  <a href="https://www.npmjs.com/package/semantic-release-python" title="Zip file size" target="_blank">
    <img alt="Zip file size" src="https://img.shields.io/bundlephobia/minzip/semantic-release-python?style=flat-square&logo=npm&logoColor=white" />
  </a>
  <a href="https://www.npmjs.com/package/semantic-release-python" title="Total downloads of semantic-release-python on npmjs.org" target="_blank">
    <img alt="Total downloads of semantic-release-python on npmjs.org" src="https://img.shields.io/npm/dt/semantic-release-python?style=flat-square&logo=npm&logoColor=white" />
  </a>
  <a href="https://snyk.io/advisor/npm-package/semantic-release-python" title="Number of vulnerabilities from Snyk scan on semantic-release-python" target="_blank">
    <img alt="Number of vulnerabilities from Snyk scan on semantic-release-python" src="https://img.shields.io/snyk/vulnerabilities/npm/semantic-release-python?style=flat-square&logo=snyk&logoColor=white" />
  </a>
  <a href="website.documentation/npm" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg?logo=readthedocs&logoColor=white&style=flat-square" />
  </a>
  <a href="https://github.com/ProfessorManhattan/semantic-release-python/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUCNdjYOD/wMDAUP+PgYHxhzwDA/MB5gMM7AwMDxj4GBgKGGQYGCyAEEgbMDDwAAWAwmk8958xpIOI5zKH2RmOyhxmZjguAiKmgIgtQOIYmFgCIp4AlaQ9OczGkJYCJEAGgI0CGwo2HmwR2Eqw5SBnNIAdBHYaAJb6KLM15W/CAAAAAElFTkSuQmCC&style=flat-square" />
  </a>
</div>

> </br><h3 align="center">**A semantic-release plugin for PyPi.org that supports both regular and Poetry projects**</h3></br>

<a href="#table-of-contents" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
  - [Developer Requirements](#developer-requirements)
- [Lifecycle Hooks](#lifecycle-hooks)
- [Environment Variables](#environment-variables)
- [Options](#options)
- [Examples](#examples)
  - [Basic Example Using `setup.cfg`](#basic-example-using-setupcfg)
  - [Example Using Poetry](#example-using-poetry)
- [Post-Install Hook](#post-install-hook)
  - [Running Without Poetry](#running-without-poetry)
  - [Bypassing the Post-Install Hook](#bypassing-the-post-install-hook)
- [Contributing](#contributing)
- [License](#license)

<a href="#overview" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Overview

**Semantic Release Python** is a [semantic-release](https://semantic-release.gitbook.io/semantic-release/) plugin that brings support for managing the publication of PyPi packages. It supports traditional Python projects with a `setup.cfg` file and also **supports Poetry projects**.

This plugin requires both Python 3 and a recent version of Node.js to be present. After installing the plugin, a few supporting Python packages will automatically be installed into a `virtualenv` located at `.venv`. Using a virtualenv helps to prevent incompatibilities with your current installed software. Before you run any configuration that contains, you must source the virtualenv by running `. venv/bin/activate` or install the dependencies in this project's `requirements.txt` through other means prior to utilizing the plugin.

<a href="#requirements" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Requirements

If you are simply including this library in your project, all you need is a recent version of Node.js. **[Node.js >14.18.0](repository.project.node)** is sometimes required and is the only version range we actively support. Albeit, it is highly probable that lower versions will work as well depending on the requirements that this project imports.

### Developer Requirements

The following versions of Node.js and Python are required for development:

- **[Node.js >14.18.0](repository.project.node)**
- **[Python >3.10.0](repository.project.python)**

Other versions may work, but only the above versions are supported. Most development dependencies are installed automatically by our `Taskfile.yml` set-up (even Node.js and Python). Run `bash start.sh` to install **[Bodega](https://github.com/ProfessorManhattan/Bodega)** (an improved fork of [go-task](https://github.com/go-task/task)) and run the initialization sequence. The taskfiles will automatically install dependencies as they are needed, based on what development tasks you are running. For more information, check out the [CONTRIBUTING.md](https://github.com/ProfessorManhattan/semantic-release-python/blob/main/docs/CONTRIBUTING.md) or simply run:

```shell
npm run help
```

`npm run help` will ensure Bodega is installed and then open an interactive dialog where you can explore and learn about various developer commands.

<a href="#lifecycle-hooks" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Lifecycle Hooks

| Step               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verifyConditions` | <ul><li>Verify the environment variable `PYPI_TOKEN`</li><li>Verify `PYPI_TOKEN` is authorized to publish on the specified repository</li><li>If the project is not a [Poetry](https://python-poetry.org/) project (i.e. it has a `setup.cfg`), then verify that `version` is not set inside `setup.py` (version will be set in `setup.cfg`)</li><li>If it is not Poetry project, check if the packages `setuptools`, `wheel` and `twine` are installed</li><li>If it is a Poetry project (i.e. contains `pyproject.toml` instead of `setup.cfg`), ensure Poetry is installed</li></ul> |
| `prepare`          | Update the version in `setup.cfg` and create the distribution packages if it is not a Poetry project. But, if it is a Poetry project, then just update the version.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `publish`          | Build the project if it is a Poetry project and then publish the Python package to the `PYPI_REPO_URL`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<a href="#environment-variables" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Environment Variables

| Variable        | Description                                                                                              | Required | Default                           |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| `PYPI_TOKEN`    | [API token](https://test.pypi.org/help/#apitoken) for PyPi (or password if `PYPI_USERNAME` is specified) | true     |
| `PYPI_USERNAME` | PyPi username (only required if you are using a password instead of an API token)                        | false    | `__token__`                       |
| `PYPI_REPO_URL` | URL of remote Python package repository                                                                  | false    | `https://upload.pypi.org/legacy/` |

<a href="#options" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Options

| Option        | Type    | Default                           | Description                                                                                                                                                                                    |
| ------------- | ------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setupPy`     | string  | `./setup.py`                      | Location of `setup.py` (or any file in the root of the project for a Poetry project)                                                                                                           |
| `distDir`     | string  | `dist`                            | Directory to put the source distribution archive(s) in, relative to the directory of `setup.py` (this variable is not used in Poetry projects)                                                 |
| `repoUrl`     | string  | `https://upload.pypi.org/legacy/` | The repository to upload the package to                                                                                                                                                        |
| `pypiPublish` | boolean | `true`                            | Whether to publish the Python package to the PyPi registry. If false, the package version will still be updated.                                                                               |
| `gpgSign`     | boolean | `false`                           | Whether to sign the package using GPG. A valid PGP key must already be installed and configured on the host. Our implementation for Poetry projects currently do not support this feature.     |
| `gpgIdentity` | string  | `null`                            | When `gpgSign` is true, set the GPG identify to use when signing files. Leave empty to use the default identity. Our implementation for Poetry projects currently do not support this feature. |

<a href="#examples" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Examples

This plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration). For a full example of a configuration used for multiple project types, check out the [shareable configuration we use for all our of projects](https://github.com/ProfessorManhattan/release-config).

### Basic Example Using `setup.cfg`

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "semantic-release-python"
  ]
}
```

### Example Using Poetry

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-python",
      {
        "setupPy": "./pyproject.toml"
      }
    ]
  ]
}
```

<a href="#post-install-hook" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Post-Install Hook

Whenever this package is installed, it will run a bash script that ensures [Bodega](https://github.com/ProfessorManhattan/Bodega) is installed and then install dependencies using a task defined in the Taskfiles included in the modules source. It attempts to use Poetry if it is installed but falls back to a regular venv if Poetry is not available.

Using Poetry might be the easier route. It will be easier to figure out exactly how this plugin can be used (by looking at [semantic-release-config](https://github.com/ProfessorManhattan/semantic-release-config) and our [`semantic-release` task](https://gitlab.com/megabyte-labs/common/shared/-/blob/master/common/.config/taskfiles/publish/Taskfile.yml) which is run by Bodega, a fork of [go-task/task](https://github.com/go-task/task)).

### Running Without Poetry

If you do not use Poetry, then before running semantic-release you should ensure that you activate the virtual environment that the post-install hook should automatically install (as long as Python 3 is installed). You can activate the Python virtual environment by running:

```shell
. .venv/bin/activate
```

After you run that, you enter a shell where you will have access to the dependencies that the post-install hook installed. You can then run the semantic-release CLI.

### Bypassing the Post-Install Hook

There may be some cases where you do not want the dependencies to be installed automatically by the plugin. For instance, you may want to bypass the post-install hook when running in a CI environment where it does not make a difference when using Python virtual environments. To disable the post-install hook, run the following somewhere before the installation:

```shell
export SEMANTIC_PYTHON_POST_INSTALL=false
```

If `SEMANTIC_PYTHON_POST_INSTALL` is set to `false`, then the post-install hook will be skipped. This allows you to permit other NPM packages to run post-install hooks without having to disable all scripts by running `npm i --ignore-scripts`.

<a href="#contributing" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ProfessorManhattan/semantic-release-python/issues). If you would like to contribute, please take a look at the [contributing guide](https://github.com/ProfessorManhattan/semantic-release-python/blob/master/docs/CONTRIBUTING.md).

<details>
<summary><b>Sponsorship</b></summary>
<br/>
<blockquote>
<br/>
Dear Awesome Person,<br/><br/>
I create open source projects out of love. Although I have a job, shelter, and as much fast food as I can handle, it would still be pretty cool to be appreciated by the community for something I have spent a lot of time and money on. Please consider sponsoring me! Who knows? Maybe I will be able to quit my job and publish open source full time.
<br/><br/>Sincerely,<br/><br/>

**_Brian Zalewski_**<br/><br/>

</blockquote>

<a title="Support us on Open Collective" href="https://opencollective.com/megabytelabs" target="_blank">
  <img alt="Open Collective sponsors" src="https://img.shields.io/opencollective/sponsors/megabytelabs?logo=opencollective&label=OpenCollective&logoColor=white&style=for-the-badge" />
</a>
<a title="Support us on GitHub" href="https://github.com/ProfessorManhattan" target="_blank">
  <img alt="GitHub sponsors" src="https://img.shields.io/github/sponsors/ProfessorManhattan?label=GitHub%20sponsors&logo=github&style=for-the-badge" />
</a>
<a href="https://www.patreon.com/ProfessorManhattan" title="Support us on Patreon" target="_blank">
  <img alt="Patreon" src="https://img.shields.io/badge/Patreon-Support-052d49?logo=patreon&logoColor=white&style=for-the-badge" />
</a>

</details>

<a href="#license" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## License

Copyright © 2020-2021 [Megabyte LLC](https://megabyte.space). This project is [MIT](https://gitlab.com/megabyte-labs/npm/plugin/semantic-release-python/-/blob/master/LICENSE) licensed.
