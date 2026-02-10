import { type BoxProps, type TextProps } from "tinky";
import { type ComponentTheme } from "tinky-theme";

/**
 * Props passed to the theme style functions for the MultiSelect component.
 * Allows styles to adapt based on the component's state.
 */
export interface MultiSelectThemeProps {
  /**
   * Indicates whether the specific option is currently focused (highlighted).
   */
  isFocused?: boolean;

  /**
   * Indicates whether the specific option is currently selected.
   */
  isSelected?: boolean;
}

/**
 * The default theme definition for the MultiSelect component.
 * Defines the structure and default appearance of the component parts.
 */
export const multiSelectTheme: ComponentTheme<MultiSelectThemeProps> = {
  styles: {
    /**
     * Style for the main container box.
     */
    container: (): BoxProps => ({
      flexDirection: "column",
    }),

    /**
     * Style for each option row.
     * Uses props to adjust padding based on focus state.
     */
    option: (props): BoxProps => ({
      gap: 1,
      paddingLeft: props.isFocused ? 0 : 2,
    }),

    /**
     * Style for the selection indicator (checkbox/tick).
     */
    selectedIndicator: (): TextProps => ({
      color: "green",
    }),

    /**
     * Style for the focus indicator (pointer/caret).
     */
    focusIndicator: (): TextProps => ({
      color: "blue",
    }),

    /**
     * Style for the option label text.
     * Changes color based on selection and focus state.
     */
    label: (props): TextProps => {
      let color: string | undefined;

      if (props.isSelected) {
        color = "green";
      }

      if (props.isFocused) {
        color = "blue";
      }

      return { color };
    },

    /**
     * Style for matched/highlighted text within an option label.
     */
    highlightedText: (): TextProps => ({
      bold: true,
    }),
  },
};

/**
 * Component name used for theme registration.
 * This constant is used with the `useComponentTheme` hook to retrieve the correct theme.
 */
export const MULTI_SELECT_COMPONENT_NAME = "MultiSelect";

/**
 * Type alias for the MultiSelect theme structure.
 * Useful for consumers who want to extend or type-check their custom themes.
 */
export type MultiSelectTheme = typeof multiSelectTheme;
