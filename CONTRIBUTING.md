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

- When creating a branch for a feature use the format e.g. `feature/my-feature`
- When creating a branch for a fix use the format e.g. `fix/my-fix`
- When creating a branch for a chore e.g. dependency update use the format e.g. `chore/my-chore`

## Publishing Production

To publish a `production` version of a package you should perform the following steps:

- Increment the version in package.json following semver rules e.g. `1.0.0`.
- Make sure it does not reference any `next` versions in it's dependencies.
- Update the CHANGELOG.md for the package with the relevant changes.
- Create a PR for the changes and have it approved.
- The PR with the version and changelog modifications is merged to `next`.
- When the PR is merged to `main` you will be able to run the `Publish Production` GitHub Action, which will publish the new version to the npm registry.

## Publishing Next

To publish a `next` version of a package you should perform the following steps:

- Update the version in package.json following semver rules using `-next.n` as the suffix e.g. `1.0.0-next.9`.
- Create a PR for the changes and have it approved.
- The PR is merged to `next`.
- When the PR is merged to `next` you will be able to run the `Publish Next` GitHub Action, which will publish the new version to the npm registry.

## Documentation

The documentation is auto-generated for each package using typedoc which consumes the comments from the source.

In addition the `docs` folder for each repo contains additional content, like an overview and examples.

The output generated in the `dist` folder from each package is then merged automatically in to the main docs site.
