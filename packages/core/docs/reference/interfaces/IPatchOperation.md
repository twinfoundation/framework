# Interface: IPatchOperation

Interface describing a patch operation to add a property.

## Properties

### op

> **op**: `"add"` \| `"remove"` \| `"replace"` \| `"move"` \| `"copy"` \| `"test"`

The operation that was performed on the item.

***

### path

> **path**: `string`

The path to the object that was changed.

***

### from?

> `optional` **from**: `string`

The path the value was copied or moved from.

***

### value?

> `optional` **value**: `unknown`

The value to add.
