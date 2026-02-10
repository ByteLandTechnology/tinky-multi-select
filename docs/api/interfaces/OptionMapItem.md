[**tinky-multi-select**](../README.md)

---

[tinky-multi-select](../globals.md) / OptionMapItem

# Interface: OptionMapItem

Extended option type with linked-list navigation properties.
INTERNAL USE ONLY.

## Extends

- [`Option`](Option.md)

## Properties

### index

> **index**: `number`

The visual index of this option in the full list.

---

### label

> **label**: `string`

Display label for the option.

#### Inherited from

[`Option`](Option.md).[`label`](Option.md#label)

---

### next

> **next**: `OptionMapItem` \| `undefined`

Reference to the next option in the list.

---

### previous

> **previous**: `OptionMapItem` \| `undefined`

Reference to the previous option in the list.

---

### value

> **value**: `string`

Unique value for the option.
This value is used for identification and selection state.

#### Inherited from

[`Option`](Option.md).[`value`](Option.md#value)
