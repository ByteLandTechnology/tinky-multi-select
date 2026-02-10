[**tinky-multi-select**](../README.md)

---

[tinky-multi-select](../globals.md) / UseMultiSelectStateProps

# Interface: UseMultiSelectStateProps

Props for the useMultiSelectState hook.

## Properties

### defaultValue?

> `optional` **defaultValue**: `string`[]

Initially selected option values.

---

### onChange()?

> `optional` **onChange**: (`value`) => `void`

Callback fired when the selection changes.

#### Parameters

##### value

`string`[]

Array of selected option values.

#### Returns

`void`

---

### onSubmit()?

> `optional` **onSubmit**: (`value`) => `void`

Callback fired when the user commits the selection.

#### Parameters

##### value

`string`[]

Array of selected option values.

#### Returns

`void`

---

### options

> **options**: [`Option`](Option.md)[]

Array of available options.

---

### visibleOptionCount?

> `optional` **visibleOptionCount**: `number`

Number of visible options.
Determines the size of the scrolling window.

#### Default

```ts
5;
```
