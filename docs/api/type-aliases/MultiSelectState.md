[**tinky-multi-select**](../README.md)

---

[tinky-multi-select](../globals.md) / MultiSelectState

# Type Alias: MultiSelectState

> **MultiSelectState** = `Pick`\<[`State`](../interfaces/State.md), `"focusedValue"` \| `"visibleFromIndex"` \| `"visibleToIndex"` \| `"value"`\> & `object`

Return type for the useMultiSelectState hook.
Exposes state and actions for controlling the multi-select interface.

## Type Declaration

### focusNextOption()

> **focusNextOption**: () => `void`

Moves focus to the next option and scrolls the list down if necessary.

#### Returns

`void`

### focusPreviousOption()

> **focusPreviousOption**: () => `void`

Moves focus to the previous option and scrolls the list up if necessary.

#### Returns

`void`

### submit()

> **submit**: () => `void`

Triggers the `onSubmit` callback with the current selection.

#### Returns

`void`

### toggleFocusedOption()

> **toggleFocusedOption**: () => `void`

Toggles the selection state of the currently focused option.

#### Returns

`void`

### visibleOptions

> **visibleOptions**: [`Option`](../interfaces/Option.md) & `object`[]

Subset of options that should be currently currently visible based on scroll position.
