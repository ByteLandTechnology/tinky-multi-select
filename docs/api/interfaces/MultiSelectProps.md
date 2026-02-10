[**tinky-multi-select**](../README.md)

---

[tinky-multi-select](../globals.md) / MultiSelectProps

# Interface: MultiSelectProps

Props for the MultiSelect component.

## Properties

### defaultValue?

> `readonly` `optional` **defaultValue**: `string`[]

Array of values for options that should be selected initially.

#### Default

```ts
[];
```

---

### highlightText?

> `readonly` `optional` **highlightText**: `string`

Text to highlight within option labels.
Useful for implementing search or filtering functionality.
Matches are case-sensitive by default unless handled by the consumer.

---

### isDisabled?

> `readonly` `optional` **isDisabled**: `boolean`

When disabled, user input is ignored and the component may appear dimmed.

#### Default

```ts
false;
```

---

### onChange()?

> `readonly` `optional` **onChange**: (`value`) => `void`

Callback fired when the selection changes.

#### Parameters

##### value

`string`[]

An array of the currently selected option values.

#### Returns

`void`

---

### onSubmit()?

> `readonly` `optional` **onSubmit**: (`value`) => `void`

Callback fired when the user presses Enter.

#### Parameters

##### value

`string`[]

An array of the selected option values at the time of submission.

#### Returns

`void`

---

### options

> `readonly` **options**: [`Option`](Option.md)[]

Array of options to display.
Each option must have a unique `value` and a display `label`.

---

### visibleOptionCount?

> `readonly` `optional` **visibleOptionCount**: `number`

Number of options to display at once.
If the number of options exceeds this value, the list will scroll.

#### Default

```ts
5;
```
