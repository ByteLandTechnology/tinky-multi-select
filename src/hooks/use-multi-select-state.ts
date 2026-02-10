import { isDeepStrictEqual } from "node:util";
import {
  useReducer,
  type Reducer,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";

/**
 * Option type for MultiSelect component.
 */
export interface Option {
  /**
   * Display label for the option.
   */
  label: string;

  /**
   * Unique value for the option.
   * This value is used for identification and selection state.
   */
  value: string;
}

/**
 * Extended option type with linked-list navigation properties.
 * INTERNAL USE ONLY.
 */
export interface OptionMapItem extends Option {
  /**
   * Reference to the previous option in the list.
   */
  previous: OptionMapItem | undefined;

  /**
   * Reference to the next option in the list.
   */
  next: OptionMapItem | undefined;

  /**
   * The visual index of this option in the full list.
   */
  index: number;
}

/**
 * A Map-based data structure for managing options with efficient O(1) access and linked-list navigation.
 * INTERNAL USE ONLY.
 */
export class OptionMap extends Map<string, OptionMapItem> {
  /**
   * The first item in the list option map.
   */
  readonly first: OptionMapItem | undefined;

  /**
   * Creates an instance of OptionMap.
   * @param options - The array of options to initialize the map with.
   */
  constructor(options: Option[]) {
    const items: [string, OptionMapItem][] = [];
    let firstItem: OptionMapItem | undefined;
    let previous: OptionMapItem | undefined;
    let index = 0;

    for (const option of options) {
      const item: OptionMapItem = {
        ...option,
        previous,
        next: undefined,
        index,
      };

      if (previous) {
        previous.next = item;
      }

      firstItem ??= item;

      items.push([option.value, item]);
      index++;
      previous = item;
    }

    super(items);
    this.first = firstItem;
  }
}

/**
 * Internal state structure for the useMultiSelectState hook.
 */
export interface State {
  /**
   * Map where key is option's value and value is the augmented OptionMapItem.
   */
  optionMap: OptionMap;

  /**
   * Maximum number of options visible at once.
   */
  visibleOptionCount: number;

  /**
   * Value of the currently focused (highlighted) option.
   */
  focusedValue: string | undefined;

  /**
   * Index of the first visible option in the rendered list window.
   */
  visibleFromIndex: number;

  /**
   * Index of the last visible option (exclusive) in the rendered list window.
   */
  visibleToIndex: number;

  /**
   * Snapshot of values of previously selected options for comparison.
   */
  previousValue: string[];

  /**
   * Array of currently selected option values.
   */
  value: string[];
}

/**
 * Action types for the internal reducer.
 */
export type Action =
  | FocusNextOptionAction
  | FocusPreviousOptionAction
  | ToggleFocusedOptionAction
  | ResetAction;

/**
 * Action to focus the next available option in the list.
 */
interface FocusNextOptionAction {
  type: "focus-next-option";
}

/**
 * Action to focus the previous available option in the list.
 */
interface FocusPreviousOptionAction {
  type: "focus-previous-option";
}

/**
 * Action to toggle the selection state of the currently focused option.
 */
interface ToggleFocusedOptionAction {
  type: "toggle-focused-option";
}

/**
 * Action to reset the state to a new initial state.
 * Used when props (like options) change significantly.
 */
interface ResetAction {
  type: "reset";
  state: State;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "focus-next-option": {
      if (!state.focusedValue) {
        return state;
      }

      const item = state.optionMap.get(state.focusedValue);

      if (!item) {
        return state;
      }

      const { next } = item;

      if (!next) {
        return state;
      }

      const needsToScroll = next.index >= state.visibleToIndex;

      if (!needsToScroll) {
        return {
          ...state,
          focusedValue: next.value,
        };
      }

      const nextVisibleToIndex = Math.min(
        state.optionMap.size,
        state.visibleToIndex + 1,
      );

      const nextVisibleFromIndex =
        nextVisibleToIndex - state.visibleOptionCount;

      return {
        ...state,
        focusedValue: next.value,
        visibleFromIndex: nextVisibleFromIndex,
        visibleToIndex: nextVisibleToIndex,
      };
    }

    case "focus-previous-option": {
      if (!state.focusedValue) {
        return state;
      }

      const item = state.optionMap.get(state.focusedValue);

      if (!item) {
        return state;
      }

      const { previous } = item;

      if (!previous) {
        return state;
      }

      const needsToScroll = previous.index <= state.visibleFromIndex;

      if (!needsToScroll) {
        return {
          ...state,
          focusedValue: previous.value,
        };
      }

      const nextVisibleFromIndex = Math.max(0, state.visibleFromIndex - 1);

      const nextVisibleToIndex =
        nextVisibleFromIndex + state.visibleOptionCount;

      return {
        ...state,
        focusedValue: previous.value,
        visibleFromIndex: nextVisibleFromIndex,
        visibleToIndex: nextVisibleToIndex,
      };
    }

    case "toggle-focused-option": {
      if (!state.focusedValue) {
        return state;
      }

      if (state.value.includes(state.focusedValue)) {
        const newValue = new Set(state.value);
        newValue.delete(state.focusedValue);

        return {
          ...state,
          previousValue: state.value,
          value: [...newValue],
        };
      }

      return {
        ...state,
        previousValue: state.value,
        value: [...state.value, state.focusedValue],
      };
    }

    case "reset": {
      return action.state;
    }
    default:
      return state;
  }
};

/**
 * Props for the useMultiSelectState hook.
 */
export interface UseMultiSelectStateProps {
  /**
   * Number of visible options.
   * Determines the size of the scrolling window.
   *
   * @default 5
   */
  visibleOptionCount?: number;

  /**
   * Array of available options.
   */
  options: Option[];

  /**
   * Initially selected option values.
   */
  defaultValue?: string[];

  /**
   * Callback fired when the selection changes.
   *
   * @param value - Array of selected option values.
   */
  onChange?: (value: string[]) => void;

  /**
   * Callback fired when the user commits the selection.
   *
   * @param value - Array of selected option values.
   */
  onSubmit?: (value: string[]) => void;
}

/**
 * Return type for the useMultiSelectState hook.
 * Exposes state and actions for controlling the multi-select interface.
 */
export type MultiSelectState = Pick<
  State,
  "focusedValue" | "visibleFromIndex" | "visibleToIndex" | "value"
> & {
  /**
   * Subset of options that should be currently currently visible based on scroll position.
   */
  visibleOptions: (Option & { index: number })[];

  /**
   * Moves focus to the next option and scrolls the list down if necessary.
   */
  focusNextOption: () => void;

  /**
   * Moves focus to the previous option and scrolls the list up if necessary.
   */
  focusPreviousOption: () => void;

  /**
   * Toggles the selection state of the currently focused option.
   */
  toggleFocusedOption: () => void;

  /**
   * Triggers the `onSubmit` callback with the current selection.
   */
  submit: () => void;
};

type CreateDefaultStateParams = Pick<
  UseMultiSelectStateProps,
  "visibleOptionCount" | "defaultValue" | "options"
>;

const createDefaultState = ({
  visibleOptionCount: customVisibleOptionCount,
  defaultValue,
  options,
}: CreateDefaultStateParams): State => {
  const visibleOptionCount =
    typeof customVisibleOptionCount === "number"
      ? Math.min(customVisibleOptionCount, options.length)
      : options.length;

  const optionMap = new OptionMap(options);
  const value = defaultValue ?? [];

  return {
    optionMap,
    visibleOptionCount,
    focusedValue: optionMap.first?.value,
    visibleFromIndex: 0,
    visibleToIndex: visibleOptionCount,
    previousValue: value,
    value,
  };
};

/**
 * Core logic hook for the MultiSelect component.
 * Manages navigation, selection, and scrolling state independently of the UI.
 *
 * @param props - Configuration props for the state.
 * @returns The current state object and action methods.
 */
export const useMultiSelectState = ({
  visibleOptionCount = 5,
  options,
  defaultValue,
  onChange,
  onSubmit,
}: UseMultiSelectStateProps): MultiSelectState => {
  const [state, dispatch] = useReducer(
    reducer,
    { visibleOptionCount, defaultValue, options },
    createDefaultState,
  );

  const [lastOptions, setLastOptions] = useState(options);

  if (options !== lastOptions && !isDeepStrictEqual(options, lastOptions)) {
    dispatch({
      type: "reset",
      state: createDefaultState({
        visibleOptionCount,
        defaultValue,
        options,
      }),
    });

    setLastOptions(options);
  }

  const focusNextOption = useCallback(() => {
    dispatch({
      type: "focus-next-option",
    });
  }, []);

  const focusPreviousOption = useCallback(() => {
    dispatch({
      type: "focus-previous-option",
    });
  }, []);

  const toggleFocusedOption = useCallback(() => {
    dispatch({
      type: "toggle-focused-option",
    });
  }, []);

  const submit = useCallback(() => {
    onSubmit?.(state.value);
  }, [state.value, onSubmit]);

  const visibleOptions = useMemo(() => {
    return options
      .map((option, index) => ({
        ...option,
        index,
      }))
      .slice(state.visibleFromIndex, state.visibleToIndex);
  }, [options, state.visibleFromIndex, state.visibleToIndex]);

  useEffect(() => {
    if (!isDeepStrictEqual(state.previousValue, state.value)) {
      onChange?.(state.value);
    }
  }, [state.previousValue, state.value, options, onChange]);

  return {
    focusedValue: state.focusedValue,
    visibleFromIndex: state.visibleFromIndex,
    visibleToIndex: state.visibleToIndex,
    value: state.value,
    visibleOptions,
    focusNextOption,
    focusPreviousOption,
    toggleFocusedOption,
    submit,
  };
};
