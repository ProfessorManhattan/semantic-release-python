## Lifecycle Hooks

| Step | Description
| ---- | -----------
| ```verifyConditions``` | <ul><li>Verify the environment variable ```PYPI_TOKEN```</li><li>Verify ```PYPI_TOKEN``` is authorized to publish on the specified repository</li><li>If the project is not a [Poetry](https://python-poetry.org/) project (i.e. it has a `setup.cfg`), then verify that `version` is not set inside `setup.py` (version will be set in `setup.cfg`)</li><li>If it is not Poetry project, check if the packages `setuptools`, `wheel` and `twine` are installed</li><li>If it is a Poetry project (i.e. contains `pyproject.toml` instead of `setup.cfg`), ensure Poetry is installed</li></ul>
| ```prepare``` | Update the version in ```setup.cfg``` and create the distribution packages if it is not a Poetry project. But, if it is a Poetry project, then just update the version.
| ```publish``` | Build the project if it is a Poetry project and then publish the Python package to the `PYPI_REPO_URL`

## Environment Variables

| Variable | Description | Required | Default
| -------- | ----------- | ----------- | -----------
| ```PYPI_TOKEN``` | [API token](https://test.pypi.org/help/#apitoken) for PyPi (or password if `PYPI_USERNAME` is specified) | true | 
| ```PYPI_USERNAME``` | PyPi username (only required if you are using a password instead of an API token) | false | ```__token__```
| ```PYPI_REPO_URL``` | URL of remote Python package repository | false | `https://upload.pypi.org/legacy/`

## Options

| Option | Type | Default | Description
| ------ | ---- | ------- | -----------
| ```setupPy``` | string | ```./setup.py``` | Location of ```setup.py``` (or any file in the root of the project for a Poetry project)
| ```distDir``` | string | ```dist``` | Directory to put the source distribution archive(s) in, relative to the directory of ```setup.py``` (this variable is not used in Poetry projects)
| ```repoUrl``` | string | ```https://upload.pypi.org/legacy/``` | The repository to upload the package to
| ```pypiPublish``` | boolean | ```true``` | Whether to publish the Python package to the PyPi registry. If false, the package version will still be updated.
| ```gpgSign``` | boolean | ```false``` | Whether to sign the package using GPG. A valid PGP key must already be installed and configured on the host. Our implementation for Poetry projects currently do not support this feature.
| ```gpgIdentity``` | string | ```null``` | When ```gpgSign``` is true, set the GPG identify to use when signing files. Leave empty to use the default identity. Our implementation for Poetry projects currently do not support this feature.

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