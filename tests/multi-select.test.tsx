import { describe, it, expect } from "vitest";
import { render } from "tinky-test";
import ansis from "ansis";
import * as figures from "./symbols.js";
import delay from "delay";
import { MultiSelect } from "../src/index.js";

const options = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Yellow",
    value: "yellow",
  },
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "Magenta",
    value: "magenta",
  },
  {
    label: "Cyan",
    value: "cyan",
  },
  {
    label: "White",
    value: "white",
  },
];

const arrowDown = "\u001B[B";
const arrowUp = "\u001B[A";
const enter = "\r";

describe("MultiSelect", () => {
  it("limit number of visible options", () => {
    const { lastFrame } = render(
      <MultiSelect visibleOptionCount={6} options={options} />,
    );

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        "  Green",
        "  Yellow",
        "  Blue",
        "  Magenta",
        "  Cyan",
      ].join("\n"),
    );
  });

  it("focus next option", async () => {
    const { lastFrame, stdin } = render(<MultiSelect options={options} />);

    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);

    expect(lastFrame()).toBe(
      [
        "  Red",
        `${ansis.blue(figures.pointer)} ${ansis.blue("Green")}`,
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );
  });

  it("focus next option and scroll down", async () => {
    const { lastFrame, stdin } = render(<MultiSelect options={options} />);

    for (let press = 0; press < 6; press++) {
      await delay(50);
      stdin.emit("data", arrowDown);
      await delay(50);
    }

    expect(lastFrame()).toBe(
      [
        "  Yellow",
        "  Blue",
        "  Magenta",
        "  Cyan",
        `${ansis.blue(figures.pointer)} ${ansis.blue("White")}`,
      ].join("\n"),
    );
  });

  it("don't scroll down when focused option is the last one", async () => {
    const { lastFrame, stdin } = render(<MultiSelect options={options} />);

    for (let press = 0; press < 7; press++) {
      await delay(50);
      stdin.emit("data", arrowDown);
      await delay(50);
    }

    expect(lastFrame()).toBe(
      [
        "  Yellow",
        "  Blue",
        "  Magenta",
        "  Cyan",
        `${ansis.blue(figures.pointer)} ${ansis.blue("White")}`,
      ].join("\n"),
    );
  });

  it("focus previous option", async () => {
    const { lastFrame, stdin } = render(<MultiSelect options={options} />);

    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);

    expect(lastFrame()).toBe(
      [
        "  Red",
        `${ansis.blue(figures.pointer)} ${ansis.blue("Green")}`,
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );

    await delay(50);
    stdin.emit("data", arrowUp);
    await delay(50);

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        "  Green",
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );
  });

  it("focus previous option and scroll up", async () => {
    const { lastFrame, stdin } = render(<MultiSelect options={options} />);

    for (let press = 0; press < 6; press++) {
      await delay(50);
      stdin.emit("data", arrowDown);
      await delay(50);
    }

    expect(lastFrame()).toBe(
      [
        "  Yellow",
        "  Blue",
        "  Magenta",
        "  Cyan",
        `${ansis.blue(figures.pointer)} ${ansis.blue("White")}`,
      ].join("\n"),
    );

    for (let press = 0; press < 6; press++) {
      await delay(50);
      stdin.emit("data", arrowUp);
      await delay(50);
    }

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        "  Green",
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );
  });

  it("don't scroll up when focused option is the first one", async () => {
    const { lastFrame, stdin } = render(<MultiSelect options={options} />);

    for (let press = 0; press < 6; press++) {
      await delay(50);
      stdin.emit("data", arrowDown);
      await delay(50);
    }

    expect(lastFrame()).toBe(
      [
        "  Yellow",
        "  Blue",
        "  Magenta",
        "  Cyan",
        `${ansis.blue(figures.pointer)} ${ansis.blue("White")}`,
      ].join("\n"),
    );

    for (let press = 0; press < 7; press++) {
      await delay(50);
      stdin.emit("data", arrowUp);
      await delay(50);
    }

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        "  Green",
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );
  });

  it("ignore input when disabled", async () => {
    let value: string[] = [];

    const { lastFrame, stdin } = render(
      <MultiSelect
        isDisabled
        options={options}
        onChange={(newValue) => {
          value = newValue;
        }}
      />,
    );

    expect(lastFrame()).toBe(
      ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
    );

    expect(value).toEqual([]);

    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);

    expect(lastFrame()).toBe(
      ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
    );

    expect(value).toEqual([]);

    await delay(50);
    stdin.emit("data", arrowUp);
    await delay(50);

    expect(lastFrame()).toBe(
      ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
    );

    expect(value).toEqual([]);

    await delay(50);
    stdin.emit("data", enter);
    await delay(50);

    expect(lastFrame()).toBe(
      ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
    );

    expect(value).toEqual([]);
  });

  it("toggle focused option", async () => {
    let value: string[] = [];

    const { lastFrame, stdin } = render(
      <MultiSelect
        options={options}
        onChange={(newValue) => {
          value = newValue;
        }}
      />,
    );

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        "  Green",
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );

    expect(value).toEqual([]);

    await delay(50);
    stdin.emit("data", " ");
    await delay(50);

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")} ${ansis.green(
          figures.tick,
        )}`,
        "  Green",
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );

    expect(value).toEqual(["red"]);

    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);

    expect(lastFrame()).toBe(
      [
        `  ${ansis.green("Red")} ${ansis.green(figures.tick)}`,
        `${ansis.blue(figures.pointer)} ${ansis.blue("Green")}`,
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );

    await delay(50);
    stdin.emit("data", " ");
    await delay(50);

    expect(lastFrame()).toBe(
      [
        `  ${ansis.green("Red")} ${ansis.green(figures.tick)}`,
        `${ansis.blue(figures.pointer)} ${ansis.blue("Green")} ${ansis.green(
          figures.tick,
        )}`,
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );

    expect(value).toEqual(["red", "green"]);

    await delay(50);
    stdin.emit("data", " ");
    await delay(50);

    expect(lastFrame()).toBe(
      [
        `  ${ansis.green("Red")} ${ansis.green(figures.tick)}`,
        `${ansis.blue(figures.pointer)} ${ansis.blue("Green")}`,
        "  Yellow",
        "  Blue",
        "  Magenta",
      ].join("\n"),
    );

    expect(value).toEqual(["red"]);
  });

  it("selected options by default", () => {
    const { lastFrame } = render(
      <MultiSelect defaultValue={["green", "magenta"]} options={options} />,
    );

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        `  ${ansis.green("Green")} ${ansis.green(figures.tick)}`,
        "  Yellow",
        "  Blue",
        `  ${ansis.green("Magenta")} ${ansis.green(figures.tick)}`,
      ].join("\n"),
    );
  });

  it("submit selected options", async () => {
    let submittedValue: string[] | undefined;

    const { lastFrame, stdin } = render(
      <MultiSelect
        defaultValue={["green", "magenta"]}
        options={options}
        onSubmit={(newValue) => {
          submittedValue = newValue;
        }}
      />,
    );

    await delay(50);
    stdin.emit("data", enter);
    await delay(50);

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        `  ${ansis.green("Green")} ${ansis.green(figures.tick)}`,
        "  Yellow",
        "  Blue",
        `  ${ansis.green("Magenta")} ${ansis.green(figures.tick)}`,
      ].join("\n"),
    );

    expect(submittedValue).toEqual(["green", "magenta"]);
  });

  it("highlight text in options", () => {
    const { lastFrame } = render(
      <MultiSelect highlightText="l" options={options} />,
    );

    expect(lastFrame()).toBe(
      [
        `${ansis.blue(figures.pointer)} ${ansis.blue("Red")}`,
        "  Green",
        `  Ye${ansis.bold("l")}low`,
        `  B${ansis.bold("l")}ue`,
        "  Magenta",
      ].join("\n"),
    );
  });
});
