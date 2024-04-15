export type IEnumValue = {
  name: string;
  value: string;
};

export type IProperty = {
  defaultValue?: string;
  name: string;
  required?: boolean;
  usage: "input" | "bound" | "output";
} & (
  | {
      type:
        | "Currency"
        | "DateAndTime.DateAndTime"
        | "DateAndTime.DateOnly"
        | "Decimal"
        | "FP"
        | "Lookup.Simple"
        | "MultiSelectOptionSet"
        | "Multiple"
        | "Object"
        | "OptionSet"
        | "SingleLine.Email"
        | "SingleLine.Phone"
        | "SingleLine.Text"
        | "SingleLine.TextArea"
        | "SingleLine.Ticker"
        | "SingleLine.URL"
        | "TwoOptions"
        | "Whole.None";
    }
  | {
      type: "Enum";
      enumValues: IEnumValue[];
    }
);

export type IData = {
  /**
   * Class Name of the component
   */
  Component: string;
  /**
   * Component folder relative to the renderGenerator
   */
  ComponentFolder: string;
  /**
   * Component index file relative to the ComponentFolder. Defined in ControlManifest.Input.xml in the resources node like: `<code path="index.ts" order="1" />`
   */
  ComponentIndex: string;
  /**
   * List of inputs
   */
  Inputs: IProperty[];

  /**
   * Mock Generator type (Starndard | React)
   */
  MockGenerator:
    | "ComponentFrameworkMockGenerator"
    | "ComponentFrameworkMockGeneratorReact";
};
