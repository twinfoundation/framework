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

The TypeScript compilation process reads the code from the .ts files and generates JavaScript .js from them.

This process is performed internally in the TypeScript compiler using a pipeline of transformers.

The transformer pipeline is not expose by the default `tsc` compiler, so for this reason we need to replace it's use in our compilation scripts with one that supports transformers.

Add a transformer capable compiler.

```shell
npm install ts-patch -D
```

Modify your build script in `package.json`

```shell
{
    "scripts": {
        "compile": "tspc"
    }
}
```

Modify your `tsconfig.json` to use the transformer.

```json
{
    "compilerOptions": {
        ...
        "plugins": [
            { "transform": "@gtsc/nameof-transformer" }
        ]
    },
    ...
}
```

## Usage

See the README for the `@gtsc/nameof` package for usage in code.
