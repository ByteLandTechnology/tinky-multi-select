import { type ReactNode } from "react";
import { Box, Text } from "tinky";
import { useComponentTheme } from "tinky-theme";
import {
  multiSelectTheme,
  MULTI_SELECT_COMPONENT_NAME,
} from "../themes/multi-select-theme.js";
import {
  useMultiSelectState,
  type Option,
} from "../hooks/use-multi-select-state.js";
import { MultiSelectOption } from "./MultiSelectOption.js";
import { useMultiSelect } from "../hooks/use-multi-select.js";

/**
 * Props for the MultiSelect component.
 */
export interface MultiSelectProps {
  /**
   * When disabled, user input is ignored and the component may appear dimmed.
   *
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Number of options to display at once.
   * If the number of options exceeds this value, the list will scroll.
   *
   * @default 5
   */
  readonly visibleOptionCount?: number;

  /**
   * Text to highlight within option labels.
   * Useful for implementing search or filtering functionality.
   * Matches are case-sensitive by default unless handled by the consumer.
   */
  readonly highlightText?: string;

  /**
   * Array of options to display.
   * Each option must have a unique `value` and a display `label`.
   */
  readonly options: Option[];

  /**
   * Array of values for options that should be selected initially.
   *
   * @default []
   */
  readonly defaultValue?: string[];

  /**
   * Callback fired when the selection changes.
   *
   * @param value - An array of the currently selected option values.
   */
  readonly onChange?: (value: string[]) => void;

  /**
   * Callback fired when the user presses Enter.
   *
   * @param value - An array of the selected option values at the time of submission.
   */
  readonly onSubmit?: (value: string[]) => void;
}

// Theme props interface for useComponentTheme
interface MultiSelectPropsForTheme {
  isFocused?: boolean;
  isSelected?: boolean;
}

/**
 * A multi-select component for Tinky CLIs.
 * Allows users to select multiple items from a list using keyboard navigation.
 * Supports scrolling, filtering highlighting, and custom theming.
 *
 * @param props - The props for the MultiSelect component.
 * @returns The rendered MultiSelect component.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' },
 *   ]}
 *   onSubmit={(values) => console.log(values)}
 * />
 * ```
 */
export function MultiSelect({
  isDisabled = false,
  visibleOptionCount = 5,
  highlightText,
  options,
  defaultValue,
  onChange,
  onSubmit,
}: MultiSelectProps) {
  const state = useMultiSelectState({
    visibleOptionCount,
    options,
    defaultValue,
    onChange,
    onSubmit,
  });

  useMultiSelect({ isDisabled, state });

  // Use the new tinky-theme API with three arguments
  const { styles } = useComponentTheme<MultiSelectPropsForTheme>(
    MULTI_SELECT_COMPONENT_NAME,
    multiSelectTheme,
    { isFocused: false, isSelected: false },
  );

  return (
    <Box {...styles.container}>
      {state.visibleOptions.map((option) => {
        let label: ReactNode = option.label;

        if (highlightText && option.label.includes(highlightText)) {
          const index = option.label.indexOf(highlightText);

          label = (
            <>
              {option.label.slice(0, index)}
              <Text {...styles.highlightedText}>{highlightText}</Text>
              {option.label.slice(index + highlightText.length)}
            </>
          );
        }

        return (
          <MultiSelectOption
            key={option.value}
            isFocused={!isDisabled && state.focusedValue === option.value}
            isSelected={state.value.includes(option.value)}
          >
            {label}
          </MultiSelectOption>
        );
      })}
    </Box>
  );
}
