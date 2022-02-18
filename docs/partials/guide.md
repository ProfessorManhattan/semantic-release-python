## Lifecycle Hooks

| Step               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verifyConditions` | <ul><li>Verify the environment variable `PYPI_TOKEN`</li><li>Verify `PYPI_TOKEN` is authorized to publish on the specified repository</li><li>If the project is not a [Poetry](https://python-poetry.org/) project (i.e. it has a `setup.cfg`), then verify that `version` is not set inside `setup.py` (version will be set in `setup.cfg`)</li><li>If it is not Poetry project, check if the packages `setuptools`, `wheel` and `twine` are installed</li><li>If it is a Poetry project (i.e. contains `pyproject.toml` instead of `setup.cfg`), ensure Poetry is installed</li></ul> |
| `prepare`          | Update the version in `setup.cfg` and create the distribution packages if it is not a Poetry project. But, if it is a Poetry project, then just update the version.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `publish`          | Build the project if it is a Poetry project and then publish the Python package to the `PYPI_REPO_URL`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Environment Variables

| Variable        | Description                                                                                              | Required | Default                           |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| `PYPI_TOKEN`    | [API token](https://test.pypi.org/help/#apitoken) for PyPi (or password if `PYPI_USERNAME` is specified) | true     |
| `PYPI_USERNAME` | PyPi username (only required if you are using a password instead of an API token)                        | false    | `__token__`                       |
| `PYPI_REPO_URL` | URL of remote Python package repository                                                                  | false    | `https://upload.pypi.org/legacy/` |

## Options

| Option        | Type    | Default                           | Description                                                                                                                                                                                    |
| ------------- | ------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setupPy`     | string  | `./setup.py`                      | Location of `setup.py` (or any file in the root of the project for a Poetry project)                                                                                                           |
| `distDir`     | string  | `dist`                            | Directory to put the source distribution archive(s) in, relative to the directory of `setup.py` (this variable is not used in Poetry projects)                                                 |
| `repoUrl`     | string  | `https://upload.pypi.org/legacy/` | The repository to upload the package to                                                                                                                                                        |
| `pypiPublish` | boolean | `true`                            | Whether to publish the Python package to the PyPi registry. If false, the package version will still be updated.                                                                               |
| `gpgSign`     | boolean | `false`                           | Whether to sign the package using GPG. A valid PGP key must already be installed and configured on the host. Our implementation for Poetry projects currently do not support this feature.     |
| `gpgIdentity` | string  | `null`                            | When `gpgSign` is true, set the GPG identify to use when signing files. Leave empty to use the default identity. Our implementation for Poetry projects currently do not support this feature. |

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
