# Interface: II18nShared

The shared state for the I18n global.

## Properties

### localeDictionaries

> **localeDictionaries**: `object`

Dictionaries for lookups.

#### Index Signature

\[`locale`: `string`\]: `object`

***

### currentLocale

> **currentLocale**: `string`

The current locale.

***

### localeChangedHandlers

> **localeChangedHandlers**: `object`

Change handler for the locale being updated.

#### Index Signature

\[`id`: `string`\]: (`locale`) => `void`

***

### dictionaryChangedHandlers

> **dictionaryChangedHandlers**: `object`

Change handler for the dictionaries being updated.

#### Index Signature

\[`id`: `string`\]: (`locale`) => `void`
