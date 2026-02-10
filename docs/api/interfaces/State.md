[**tinky-multi-select**](../README.md)

---

[tinky-multi-select](../globals.md) / State

# Interface: State

Internal state structure for the useMultiSelectState hook.

## Properties

### focusedValue

> **focusedValue**: `string` \| `undefined`

Value of the currently focused (highlighted) option.

---

### optionMap

> **optionMap**: [`OptionMap`](../classes/OptionMap.md)

Map where key is option's value and value is the augmented OptionMapItem.

---

### previousValue

> **previousValue**: `string`[]

Snapshot of values of previously selected options for comparison.

---

### value

> **value**: `string`[]

Array of currently selected option values.

---

### visibleFromIndex

> **visibleFromIndex**: `number`

Index of the first visible option in the rendered list window.

---

### visibleOptionCount

> **visibleOptionCount**: `number`

Maximum number of options visible at once.

---

### visibleToIndex

> **visibleToIndex**: `number`

Index of the last visible option (exclusive) in the rendered list window.
