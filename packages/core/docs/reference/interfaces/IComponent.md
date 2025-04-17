# Interface: IComponent

Interface describing a component which can be bootstrapped, started and stopped.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the component.

## Methods

### bootstrap()?

> `optional` **bootstrap**(`nodeLoggingConnectorType`, `componentState?`): `Promise`\<`boolean`\>

Bootstrap the component by creating and initializing any resources it needs.

#### Parameters

##### nodeLoggingConnectorType

The node logging connector type, defaults to "node-logging".

`undefined` | `string`

##### componentState?

A persistent state which can be modified by the method.

#### Returns

`Promise`\<`boolean`\>

True if the bootstrapping process was successful.

***

### start()?

> `optional` **start**(`nodeIdentity`, `nodeLoggingConnectorType`, `componentState?`): `Promise`\<`void`\>

The component needs to be started when the node is initialized.

#### Parameters

##### nodeIdentity

`string`

The identity of the node starting the component.

##### nodeLoggingConnectorType

The node logging connector type, defaults to "node-logging".

`undefined` | `string`

##### componentState?

A persistent state which can be modified by the method.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop()?

> `optional` **stop**(`nodeIdentity`, `nodeLoggingConnectorType`, `componentState?`): `Promise`\<`void`\>

The component needs to be stopped when the node is closed.

#### Parameters

##### nodeIdentity

`string`

The identity of the node stopping the component.

##### nodeLoggingConnectorType

The node logging connector type, defaults to "node-logging".

`undefined` | `string`

##### componentState?

A persistent state which can be modified by the method.

#### Returns

`Promise`\<`void`\>

Nothing.
