# @gtsc/nameof-transformer - Configuration

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
