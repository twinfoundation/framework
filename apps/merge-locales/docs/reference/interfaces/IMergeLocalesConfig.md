# Interface: IMergeLocalesConfig

Configuration for the CLI.

## Properties

### locales?

> `optional` **locales**: `ILocale`[]

The languages to include while merging, if none are supplied only English will be included.

***

### includePackages?

> `optional` **includePackages**: `string`[]

Additional packages to add locales for, which are not part of the dependencies.

***

### excludePackages?

> `optional` **excludePackages**: `string`[]

Packages to exclude from the locales.

***

### outputDirectory?

> `optional` **outputDirectory**: `string`

Output directory for the merged locales.
