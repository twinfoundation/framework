# Class: ModuleHelper

Helper functions for modules.

## Constructors

### new ModuleHelper()

> **new ModuleHelper**(): [`ModuleHelper`](ModuleHelper.md)

#### Returns

[`ModuleHelper`](ModuleHelper.md)

## Properties

### CLASS\_NAME

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### getModuleEntry()

> `static` **getModuleEntry**\<`T`\>(`module`, `entry`): `Promise`\<`T`\>

Get the module entry.

#### Type Parameters

• **T**

#### Parameters

• **module**: `string`

The module.

• **entry**: `string`

The entry to get from the module.

#### Returns

`Promise`\<`T`\>

The entry from the module.

#### Throws

GeneralError if getting the module entry failed.
