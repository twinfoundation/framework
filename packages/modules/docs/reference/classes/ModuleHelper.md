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

##### module

`string`

The module.

##### entry

`string`

The entry to get from the module.

#### Returns

`Promise`\<`T`\>

The entry from the module.

#### Throws

GeneralError if getting the module entry failed.

***

### getModuleMethod()

> `static` **getModuleMethod**\<`T`\>(`module`, `method`): `Promise`\<(...`args`) => `T`\>

Get the method from a module.

#### Type Parameters

• **T**

#### Parameters

##### module

`string`

The module.

##### method

`string`

The method to execute from the module, use dot notation to get a static class method.

#### Returns

`Promise`\<(...`args`) => `T`\>

The result of the method execution.

#### Throws

GeneralError if executing the module entry failed.

***

### execModuleMethod()

> `static` **execModuleMethod**\<`T`\>(`module`, `method`, `args`?): `Promise`\<`T`\>

Execute the method in the module.

#### Type Parameters

• **T**

#### Parameters

##### module

`string`

The module.

##### method

`string`

The method to execute from the module.

##### args?

`unknown`[]

The arguments to pass to the method.

#### Returns

`Promise`\<`T`\>

The result of the method execution.

#### Throws

GeneralError if executing the module entry failed.

***

### execModuleMethodThread()

> `static` **execModuleMethodThread**\<`T`\>(`module`, `method`, `args`?): `Promise`\<`T`\>

Execute the method in the module in a thread.

#### Type Parameters

• **T**

#### Parameters

##### module

`string`

The module.

##### method

`string`

The method to execute from the module.

##### args?

`unknown`[]

The arguments to pass to the method.

#### Returns

`Promise`\<`T`\>

The result of the method execution.

#### Throws

GeneralError if executing the module entry failed.
