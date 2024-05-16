[**@gtsc/entity**](../README.md) • **Docs**

***

# Class: DecoratorHelper

Class to help with decorators.

## Constructors

### new DecoratorHelper()

> **new DecoratorHelper**(): [`DecoratorHelper`](DecoratorHelper.md)

#### Returns

[`DecoratorHelper`](DecoratorHelper.md)

## Methods

### getSchema()

> `static` **getSchema**\<`T`\>(`target`): `undefined` \| [`IEntitySchema`](../interfaces/IEntitySchema.md)\<`T`\>

Get the schema from the reflection metadata.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **target**: `any`

The object to get the schema data from.

#### Returns

`undefined` \| [`IEntitySchema`](../interfaces/IEntitySchema.md)\<`T`\>

The schema from the metadata if it can be found.

***

### setSchema()

> `static` **setSchema**\<`T`\>(`target`, `entitySchema`): `void`

Set the schema from the reflection metadata.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **target**: `any`

The object to get the schema data from.

• **entitySchema**: [`IEntitySchema`](../interfaces/IEntitySchema.md)\<`T`\>

The schema to set.

#### Returns

`void`
