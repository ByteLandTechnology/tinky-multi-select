import process from "node:process";
import { useApp } from "tinky";

const isUnicodeSupported = (
  env: Record<string, string | undefined>,
  platform: string,
) => {
  if (platform !== "win32") {
    return env.TERM !== "linux"; // Linux console (kernel)
  }

  return (
    Boolean(env.CI) ||
    Boolean(env.WT_SESSION) || // Windows Terminal
    Boolean(env.TERMINUS_SUBLIME) ||
    env.ConEmuTask === "{cmd::Cmder}" ||
    env.TERM_PROGRAM === "Terminus-Sublime" ||
    env.TERM_PROGRAM === "vscode" ||
    env.TERM === "xterm-256color" ||
    env.TERM === "alacritty" ||
    env.TERMINAL_EMULATOR === "JetBrains-JediTerm"
  );
};

/**
 * Hook to get terminal symbols based on the current environment's unicode support.
 */
export const useSymbols = () => {
  const { env } = useApp();
  const isUnicode = isUnicodeSupported(env || {}, process.platform);

  return {
    /**
     * Pointer symbol used to indicate the focused option.
     * Uses the heavy right-pointing angle quotation mark ornament (❯) or greater-than sign (>).
     */
    POINTER: isUnicode ? "❯" : ">",

    /**
     * Tick/check symbol used to indicate selected options.
     * Uses the heavy check mark (✔) or square root (√).
     */
    TICK: isUnicode ? "✔" : "√",
  };
};
