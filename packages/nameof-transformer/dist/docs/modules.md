# @gtsc/nameof-transformer

## References

### default

Renames and re-exports [factory](modules.md#factory)

## Variables

### name

• `Const` **name**: `"@gtsc/nameof-transformer"`

Exports the factory name.

#### Defined in

[index.ts:22](https://github.com/gtscio/framework/blob/51767d6/packages/nameof-transformer/src/index.ts#L22)

---

### version

• `Const` **version**: `"0.0.1"`

Exports the factory version.

#### Defined in

[index.ts:16](https://github.com/gtscio/framework/blob/51767d6/packages/nameof-transformer/src/index.ts#L16)

## Functions

### factory

▸ **factory**(): `TransformerFactory`\<`Node`\>

Exports the factory.

#### Returns

`TransformerFactory`\<`Node`\>

The factory.

#### Defined in

[index.ts:10](https://github.com/gtscio/framework/blob/51767d6/packages/nameof-transformer/src/index.ts#L10)

---

### manual

▸ **manual**(`content`): `string`

Replace the transformers manually.

#### Parameters

| Name      | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `content` | `string` | The content to replace the transformers in. |

#### Returns

`string`

The content with the transformers replace.

#### Defined in

[manual.ts:9](https://github.com/gtscio/framework/blob/51767d6/packages/nameof-transformer/src/manual.ts#L9)

---

### tsTransformersPreProcess

▸ **tsTransformersPreProcess**(): `Object`

Return a function that can be used as a svelte preprocessor.

#### Returns

`Object`

The preprocessor.

| Name     | Type      |
| :------- | :-------- |
| `markup` | `unknown` |

#### Defined in

[svelte.ts:9](https://github.com/gtscio/framework/blob/51767d6/packages/nameof-transformer/src/svelte.ts#L9)
