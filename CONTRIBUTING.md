# Contributing

To contribute to this repository please follow the guidelines outlines below.

## Building

To completely build all of the packages run the following command.

```shell
npm run dist
```

This command will clean the current output, build the code, execute the tests, package and generate docs.

The output will be a `dist` folder for each package, the folder contains the following:

- `esm` - An ESM format module for the package
- `cjs` - An CommonJS format module for the package
- `types` - A folder containing TypeScript Definition files .d.ts
- `docs` - Auto generated documentation for the package in markdown format

## Code Quality

The code, config and docs should be formatted using prettier and linting checked before committing new code using the following commands.

```shell
npm run format
```

and

```shell
npm run lint
```

## Branch Naming

The `main` branch is always the most recently published versions of the packages.

The `next` branch is where all PRs should be merged to, in preparation for a final merge to `main`.

- When creating a branch for a feature use the format e.g. `feat/my-feature`
- When creating a branch for a bugfix use the format e.g. `bugfix/my-fix`
- When creating a branch for a chore e.g. dependency update use the format e.g. `chore/my-chore`

All of the possible prefixes are:

- feature
- bugfix
- hotfix
- release
- chore

## PR Naming

When creating a PR from a branch the name of the PR should follow the same convention as the commit naming.

## Commit Naming

All commits messages should be of the format `prefix: <message>`. The prefixes should be one of the following:

All commits messages should be of the format `prefix: <message>`. The prefixes should be one of the following:

- build:
- chore:
- ci:
- docs:
- feat:
- fix:
- perf:
- refactor:
- revert:
- style:
- test:

e.g. `fix: endless loop in data lookup`

## Publishing Next

To publish a `next` version of a package you should perform the following steps:

- Run the `Prepare Release` GitHub action on `next` with the semver type set to `prerelease` which will bump the versions, update changelogs and generate a PR
- Once the PR has been checked it should be merged to the `next` branch
- Run the `Publish Release` GitHub action to publish the NPM packages tagged as `next`, and add GitHub releases tagged as prerelease

## Publishing Production

To publish a `production` version of a package you should perform the following steps:

- Merge the current `next` branch to main
- Run the `Prepare Release` GitHub action on `main` with the semver type set to `major`, `minor` or `patch` which will bump the versions, update changelogs and generate a PR
- Once the PR has been checked it should be merged to the `main` branch
- Run the `Publish Release` GitHub action to publish the NPM packages, and add GitHub releases

## Documentation

The documentation is auto-generated for each package using typedoc which consumes the comments from the source.

In addition the `docs` folder for each repo contains additional content, like an overview and examples.

The output generated in the `dist` folder from each package is then merged automatically in to the main docs site.
