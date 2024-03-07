# GTSC / Framework

This mono-repository contains some of the fundamental packages that the rest of the GTSC packages depend on. There are lots of utility functions and helper classes.

## Packages

- [nameof-transformer](packages/nameof-transformer/README.md) - A TypeScript transformer which converts types and properties to their actual name for use at runtime.
- [nameof](packages/nameof/README.md) - Provides the definitions for the methods which are processed by the `nameof-transformer`
- [core](packages/core/README.md) - Helper methods/classes for data type checking/validation/guarding/error handling.
- [entity](packages/entity/README.md) - Helpers for defining and working with entities.

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

The `dev` branch is where all PRs should be merged to, in preparation for a final merge to `main`.

When creating a branch for a feature use the format e.g. `feature/my-feature`

When creating a branch for a fix use the format e.g. `fix/my-fix`

## Publishing

To publish a new version of a package you should perform the following steps:

- Increment the version in package.json following semver rules.
- Update the CHANGELOG.md for the package with the relevant changes.
- Create a PR for the changes and have it approved.
- The PR with the version and changelog modifications is merged to `dev.
- When the PR is merged to `main` you will be able to run the `publish` GitHub Action, which will publish the new version to the npm registry.

## Documentation

The documentation is auto-generated for each package using typedoc which consumes the comments from the source.

In addition the `docs` folder for each repo contains additional content, like an overview and examples.

The output generated in the `dist` folder from each package is then merged automatically in to the main docs site.
