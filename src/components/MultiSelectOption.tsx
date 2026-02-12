import { type ReactNode } from "react";
import { Box, Text } from "tinky";
import { useFigures } from "tinky-figures";

import { useComponentTheme } from "tinky-theme";
import {
  multiSelectTheme,
  MULTI_SELECT_COMPONENT_NAME,
  type MultiSelectThemeProps,
} from "../themes/multi-select-theme.js";

/**
 * Props for the MultiSelectOption component.
 */
export interface MultiSelectOptionProps {
  /**
   * Indicates whether this option is currently focused (highlighted by the cursor).
   */
  readonly isFocused: boolean;

  /**
   * Indicates whether this option is currently selected.
   */
  readonly isSelected: boolean;

  /**
   * The content to display for the option label.
   * Can be a string or a React Node (e.g. for highlighted text).
   */
  readonly children: ReactNode;
}

/**
 * Internal component representing a single option in the MultiSelect list.
 * Handles rendering of the focus indicator, label, and selection state.
 *
 * @param props - The props for the MultiSelectOption.
 * @returns The rendered option row.
 */
export function MultiSelectOption({
  isFocused,
  isSelected,
  children,
}: MultiSelectOptionProps) {
  const { pointer, tick } = useFigures();
  const { styles } = useComponentTheme<MultiSelectThemeProps>(
    MULTI_SELECT_COMPONENT_NAME,
    multiSelectTheme,
    { isFocused, isSelected },
  );

  return (
    <Box {...styles.option}>
      {isFocused && <Text {...styles.focusIndicator}>{pointer}</Text>}

      <Text {...styles.label}>{children}</Text>

      {isSelected && <Text {...styles.selectedIndicator}>{tick}</Text>}
    </Box>
  );
}
