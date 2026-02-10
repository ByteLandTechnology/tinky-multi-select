**tinky-multi-select**

---

# tinky-multi-select

A flexible and interactive multi-select component for building command-line interfaces (CLIs) with [Tinky](https://github.com/ByteLandTechnology/tinky).

## Features

- **✅ Multi-selection**: Select multiple items from a list using Space.
- **⌨️ Keyboard Navigation**: Navigate through options using Arrow keys.
- **📜 Scrolling**: efficient rendering for long lists with configurable visible window.
- **🎨 Theming Support**: Fully customizable appearance using `tinky-theme`.
- **🧩 Headless Mode**: Exports hooks (`useMultiSelect`, `useMultiSelectState`) for building custom UI implementations with the same logic.
- **🔍 Filtering Support**: Built-in support for highlighting matched text (filtering logic to be implemented by consumer).

## Installation

```bash
npm install tinky-multi-select
# or
bun add tinky-multi-select
# or
yarn add tinky-multi-select
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { render, Text, Box } from "tinky";
import { MultiSelect, type Option } from "tinky-multi-select";

const options: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
];

function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <Text color="green">You selected: {selected.join(", ")}</Text>;
  }

  return (
    <Box flexDirection="column">
      <Text>Please select your favorite fruits:</Text>
      <Box marginY={1}>
        <MultiSelect
          options={options}
          onChange={setSelected}
          onSubmit={() => setSubmitted(true)}
        />
      </Box>
      <Text color="gray">
        (Press <Text color="bold">Space</Text> to select,{" "}
        <Text color="bold">Enter</Text> to submit)
      </Text>
    </Box>
  );
}

render(<App />);
```

## Keyboard Controls

| Key       | Action                                 |
| --------- | -------------------------------------- |
| `↑` / `↓` | Navigate through the options           |
| `Space`   | Toggle selection of the focused option |
| `Enter`   | Submit the selection                   |

## API Reference

### `<MultiSelect />`

The main component for rendering the multi-select list.

| Prop                 | Type                        | Default      | Description                                                                             |
| -------------------- | --------------------------- | ------------ | --------------------------------------------------------------------------------------- |
| `options`            | `Option[]`                  | **Required** | Array of data objects to display as options.                                            |
| `defaultValue`       | `string[]`                  | `[]`         | Array of values that should be selected initially.                                      |
| `visibleOptionCount` | `number`                    | `5`          | functionality number of items to show at once. Enables scrolling for larger lists.      |
| `isDisabled`         | `boolean`                   | `false`      | If `true`, the component will not respond to user input.                                |
| `highlightText`      | `string`                    | `undefined`  | Substring to highlight within option labels. Useful when implementing search/filtering. |
| `onChange`           | `(value: string[]) => void` | `undefined`  | Callback fired whenever the selection changes.                                          |
| `onSubmit`           | `(value: string[]) => void` | `undefined`  | Callback fired when the user presses `Enter`.                                           |

### `Option` Interface

```typescript
interface Option {
  label: string; // Text to display
  value: string; // Unique identifier
}
```

## Headless Usage (Advanced)

If you need complete control over the rendering but want to re-use the interaction logic, you can use the exported hooks.

### `useMultiSelectState`

Manages the internal state of the selection (cursor position, selected items, scrolling).

```tsx
import { useMultiSelectState } from "tinky-multi-select";

const state = useMultiSelectState({
  options,
  defaultValue: ["apple"],
  visibleOptionCount: 5,
});

// state.visibleOptions -> options currently in view
// state.focusedValue -> value of the currently highlighted option
// state.value -> array of selected values
```

### `useMultiSelect`

Connects the state to Tinky's input handling system.

```tsx
import { useMultiSelect } from "tinky-multi-select";

useMultiSelect({
  state, // return value from useMultiSelectState
  isDisabled: false,
});
```

## Theming

This component uses `tinky-theme` for styling. You can customize the appearance by providing a theme to your `ThemeProvider` matching the `MULTI_SELECT_COMPONENT_NAME`.

The styles object structure:

- `container`: File-level box style
- `option`: Style for individual option row
- `label`: Style for the option text
- `focusIndicator`: Style for the cursor/pointer
- `selectedIndicator`: Style for the checkmark
- `highlightedText`: Style for matched text in filter mode

## License

MIT
