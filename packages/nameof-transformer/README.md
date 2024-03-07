# GTSC / Nameof TypeScript Transformer

This transformer is used to convert class/type/property names to embedded strings, so that they are available to the code at runtime.

It is used during your TypeScript compilation as part of the build pipeline.

It is necessary that your code is built with a compiler that supports transformers such as `ts-patch` / `ttypescript` / `ttsc`.

You will also need to include the `@gtsc/nameof` to be able to reference the methods in your code.

## Installation

```shell
npm install @gtsc/nameof-transformer -D
```

## Configuration

Configuration of the package is shown in [dist/docs/configuration.md](dist/docs/configuration.md)

## Reference

Detailed reference documentation for the API can be found in [dist/docs/modules.md](dist/docs/modules.md)
