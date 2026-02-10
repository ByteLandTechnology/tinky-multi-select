import { useInput, type Key } from "tinky";
import { type MultiSelectState } from "./use-multi-select-state.js";

/**
 * Props for the useMultiSelect hooks.
 */
export interface UseMultiSelectProps {
  /**
   * When true, keyboard input is ignored.
   *
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * The state object returned by `useMultiSelectState`.
   * This hook operates on the provided state to handle user interactions.
   */
  state: MultiSelectState;
}

/**
 * Hook to bind keyboard interactions to the MultiSelect state.
 * Handles Arrow keys for navigation, Space for selection, and Enter for submission.
 *
 * @param props - Configuration props.
 */
export const useMultiSelect = ({
  isDisabled = false,
  state,
}: UseMultiSelectProps) => {
  useInput(
    (_input: string, key: Key) => {
      if (key.downArrow) {
        state.focusNextOption();
      }

      if (key.upArrow) {
        state.focusPreviousOption();
      }

      if (_input === " ") {
        state.toggleFocusedOption();
      }

      if (key.return) {
        state.submit();
      }
    },
    { isActive: !isDisabled },
  );
};
