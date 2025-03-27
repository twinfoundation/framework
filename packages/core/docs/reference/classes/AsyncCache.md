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

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### key

`string`

The key for the entry in the cache.

##### ttlMs

The TTL of the entry in the cache.

`undefined` | `number`

##### requestMethod

() => `Promise`\<`T`\>

The method to call if not cached.

#### Returns

`undefined` \| `Promise`\<`T`\>

The response.

***

### get()

> `static` **get**\<`T`\>(`key`): `Promise`\<`undefined` \| `T`\>

Get an entry from the cache.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### key

`string`

The key to get from the cache.

#### Returns

`Promise`\<`undefined` \| `T`\>

The item from the cache if it exists.

***

### set()

> `static` **set**\<`T`\>(`key`, `value`, `ttlMs`?): `Promise`\<`void`\>

Set an entry into the cache.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### key

`string`

The key to set in the cache.

##### value

`T`

The value to set in the cache.

##### ttlMs?

`number`

The TTL of the entry in the cache in ms, defaults to 1s.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### remove()

> `static` **remove**(`key`): `void`

Remove an entry from the cache.

#### Parameters

##### key

`string`

The key to remove from the cache.

#### Returns

`void`

***

### clearCache()

> `static` **clearCache**(`prefix`?): `void`

Clear the cache.

#### Parameters

##### prefix?

`string`

Optional prefix to clear only entries with that prefix.

#### Returns

`void`

***

### cleanupExpired()

> `static` **cleanupExpired**(): `void`

Perform a cleanup of the expired entries in the cache.

#### Returns

`void`
