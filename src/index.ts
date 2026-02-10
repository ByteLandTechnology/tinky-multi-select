// Import theme for side effect (registers component theme)
import "./themes/multi-select-theme.js";

// Export MultiSelect component and related types
export {
  MultiSelect,
  type MultiSelectProps,
} from "./components/MultiSelect.js";
export {
  MultiSelectOption,
  type MultiSelectOptionProps,
} from "./components/MultiSelectOption.js";
export {
  useMultiSelect,
  type UseMultiSelectProps,
} from "./hooks/use-multi-select.js";
export {
  useMultiSelectState,
  type UseMultiSelectStateProps,
  type MultiSelectState,
  type State,
  type OptionMapItem,
  OptionMap,
} from "./hooks/use-multi-select-state.js";

// Export shared types
export type { Option } from "./hooks/use-multi-select-state.js";

// Export theme-related types and utilities
export {
  multiSelectTheme,
  MULTI_SELECT_COMPONENT_NAME,
  type MultiSelectTheme,
  type MultiSelectThemeProps,
} from "./themes/multi-select-theme.js";

// Export symbols
export { useSymbols } from "./utils/symbols.js";
