import { describe, expect, test } from "@jest/globals";
import { ManifestParser } from "../src/ManifestParser";
import fs from "fs/promises";

describe("ManifestParser", () => {
  test("can parse Manifest", async () => {
    const manifest = await fs.readFile(
      require.resolve("./Calendar/ControlManifest.Input.xml")
    );
    var parser = new ManifestParser(true);
    expect(await parser.Parse(manifest)).toEqual({
      Component: "Calendar",
      ComponentIndex: "index.ts",
      MockGenerator: "ComponentFrameworkMockGeneratorReact",
      Inputs: [
        {
          type: "Multiple",
          name: "Theme",
          usage: "input",
        },
        {
          type: "SingleLine.Text",
          name: "BackgroundColor",
          usage: "input",
        },
        {
          type: "SingleLine.Text",
          name: "Language",
          usage: "input",
        },
        {
          type: "SingleLine.Text",
          name: "AccessibilityLabel",
          usage: "input",
        },
        {
          type: "DateAndTime.DateOnly",
          name: "SelectedDateValue",
          usage: "bound",
        },
        {
          type: "DateAndTime.DateOnly",
          name: "MinDate",
          usage: "input",
        },
        {
          type: "DateAndTime.DateOnly",
          name: "MaxDate",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "ShowGoToToday",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "MonthPickerVisible",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "DayPickerVisible",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "HighlightSelectedMonth",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "HighlightCurrentMonth",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "ShowSixWeeksByDefault",
          usage: "input",
        },
        {
          type: "TwoOptions",
          name: "ShowWeekNumbers",
          usage: "input",
        },
        {
          type: "SingleLine.Text",
          name: "InputEvent",
          usage: "input",
        },
        {
          type: "Enum",
          name: "FirstDayOfWeek",
          usage: "input",
          enumValues: [
            {
              name: "Sunday",
              value: "Sunday",
            },
            {
              name: "Monday",
              value: "Monday",
            },
            {
              name: "Tuesday",
              value: "Tuesday",
            },
            {
              name: "Wednesday",
              value: "Wednesday",
            },
            {
              name: "Thursday",
              value: "Thursday",
            },
            {
              name: "Friday",
              value: "Friday",
            },
            {
              name: "Saturday",
              value: "Saturday",
            },
          ],
        },
      ],
      Styles: ["css/Calendar.css"]
    });
  });
});
