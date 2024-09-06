# Class: AsyncCache

Cache the results from asynchronous requests.

## Constructors

### new AsyncCache()

> **new AsyncCache**(): [`AsyncCache`](AsyncCache.md)

#### Returns

[`AsyncCache`](AsyncCache.md)

## Methods

### exec()

> `static` **exec**\<`T`\>(`key`, `ttlMs`, `requestMethod`): `undefined` \| `Promise`\<`T`\>

Execute an async request and cache the result.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **key**: `string`

The key for the entry in the cache.

• **ttlMs**: `undefined` \| `number`

The TTL of the entry in the cache.

• **requestMethod**

The method to call if not cached.

#### Returns

`undefined` \| `Promise`\<`T`\>

The response.

***

### get()

> `static` **get**\<`T`\>(`key`): `Promise`\<`undefined` \| `T`\>

Get an entry from the cache.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **key**: `string`

The key to get from the cache.

#### Returns

`Promise`\<`undefined` \| `T`\>

The item from the cache if it exists.

***

### remove()

> `static` **remove**(`key`): `void`

Remove an entry from the cache.

#### Parameters

• **key**: `string`

The key to remove from the cache.

#### Returns

`void`

***

### clearCache()

> `static` **clearCache**(`prefix`?): `void`

Clear the cache.

#### Parameters

• **prefix?**: `string`

Optional prefix to clear only entries with that prefix.

#### Returns

`void`

***

### cleanupExpired()

> `static` **cleanupExpired**(): `void`

Perform a cleanup of the expired entries in the cache.

#### Returns

`void`
