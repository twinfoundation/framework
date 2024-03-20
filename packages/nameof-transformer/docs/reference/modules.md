# @gtsc/nameof-transformer

## References

### default

Renames and re-exports [factory](modules.md#factory)

## Variables

### name

• `Const` **name**: ``"@gtsc/nameof-transformer"``

Exports the factory name.

___

### version

• `Const` **version**: ``"0.0.3"``

Exports the factory version.

## Functions

### factory

▸ **factory**(): `TransformerFactory`\<`Node`\>

Exports the factory.

#### Returns

`TransformerFactory`\<`Node`\>

The factory.

___

### manual

▸ **manual**(`content`): `string`

Replace the transformers manually.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | The content to replace the transformers in. |

#### Returns

`string`

The content with the transformers replace.

___

### tsTransformersPreProcess

▸ **tsTransformersPreProcess**(): `Object`

Return a function that can be used as a svelte preprocessor.

#### Returns

`Object`

The preprocessor.

| Name | Type |
| :------ | :------ |
| `markup` | `unknown` |
