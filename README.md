# GTSC / Framework

This mono-repository contains some of the fundamental packages that the rest of the GTSC packages depend on. There are lots of utility functions and helper classes.

## Packages

- [nameof-transformer](packages/nameof-transformer/README.md) - A TypeScript transformer which converts types and properties to their actual name for use at runtime.
- [nameof](packages/nameof/README.md) - Provides the definitions for the methods which are processed by the `nameof-transformer`
- [core](packages/core/README.md) - Helper methods/classes for data type checking/validation/guarding/error handling.
- [entity](packages/entity/README.md) - Helpers for defining and working with entities.
- [crypto](packages/crypto/README.md) - Helpers which implement cryptographic functions.
- [image](packages/image/README.md) - Package contains classes for processing images.
- [qr](packages/qr/README.md) - Package contains classes for generating QR codes.
- [services](packages/services/README.md) - Package contains definitions and helpers for services.
- [schema](packages/services/README.md) - Package contains definitions and helpers for schemas.

## Contributing

To contribute to this package see the guidelines for building and publishing in [CONTRIBUTING](./CONTRIBUTING.md)
