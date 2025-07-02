# TWIN Framework

This mono-repository contains some of the fundamental packages that the rest of the TWIN packages depend on. Utility functions and helper classes.

## Packages

- [nameof-transformer](packages/nameof-transformer/README.md) - A TypeScript transformer which converts types and properties to their actual name for use at runtime.
- [nameof](packages/nameof/README.md) - Provides the definitions for the methods which are processed by the `nameof-transformer`.
- [nameof-vitest-plugin](packages/nameof-vitest-plugin/README.md) - Plugin for Vitest to perform the nameof transformation inline.
- [core](packages/core/README.md) - Helper methods/classes for data type checking/validation/guarding/error handling.
- [entity](packages/entity/README.md) - Helpers for defining and working with entities.
- [crypto](packages/crypto/README.md) - Helpers which implement cryptographic functions.
- [image](packages/image/README.md) - Package contains classes for processing images.
- [qr](packages/qr/README.md) - Package contains classes for generating QR codes.
- [web](packages/web/README.md) - Contains classes for use with web operations.
- [modules](packages/modules/README.md) - Helper classes for loading and executing from modules.
- [cli-core](packages/cli-core/README.md) - Provides core classes and methods to be used when building a CLI.

## Apps

- [merge-locales](packages/merge-locales/README.md) - Tool to merge locales from the dependencies of a package.
- [crypto-cli](apps/crypto-cli/README.md) - A command line interface for interacting with the crypto packages.

## Contributing

To contribute to this package see the guidelines for building and publishing in [CONTRIBUTING](./CONTRIBUTING.md)
