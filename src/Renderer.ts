import Handlebars from "handlebars";
import { IData } from "./ShkoOnline.types";
import { readFile } from "fs/promises";

export default class Renderer {
  constructor() {
    Handlebars.registerHelper(
      "GetPropertyMocks",
      this.GetPropertyMocks.bind(this)
    );
    Handlebars.registerHelper(
      "ControlToPropertyMock",
      this.ControlToPropertyMock.bind(this)
    );
    Handlebars.registerHelper("ControlToType", this.ControlToType.bind(this));
    Handlebars.registerHelper(
      "isVirtualComponent",
      this.isVirtualComponent.bind(this)
    );
    Handlebars.registerHelper(
      "GetOutputProperties",
      this.GetOutputProperties.bind(this)
    );
  }

  private GetPropertyMocks(inputs: IData["Inputs"]) {
    const propertyMocks: string[] = [];
    inputs.forEach((property) => {
      var mock = this.ControlToPropertyMock(property);
      if (!propertyMocks.includes(mock)) {
        propertyMocks.push(mock);
      }
    });
    return propertyMocks.join(", ");
  }

  private isVirtualComponent(mockGenerator: IData["MockGenerator"]) {
    return mockGenerator === "ComponentFrameworkMockGeneratorReact";
  }

  private ControlToPropertyMock(control: IData["Inputs"][any]) {
    switch (control.type) {
      case "DateAndTime.DateOnly":
      case "DateAndTime.DateAndTime":
        return "DateTimePropertyMock";
      case "Multiple":
      case "SingleLine.Text":
      case "SingleLine.Email":
      case "SingleLine.Phone":
      case "SingleLine.TextArea":
      case "SingleLine.Ticker":
      case "SingleLine.URL":
        return "StringPropertyMock";
      case "TwoOptions":
        return "TwoOptionsPropertyMock";
      case "Enum":
        return "EnumPropertyMock";
      case "Currency":
      case "Decimal":
        return "DecimalNumberPropertyMock";
      case "Lookup.Simple":
        return "LookupPropertyMock";
      case "Whole.None":
        return "WholeNumberPropertyMock";
      case "OptionSet":
        return "OptionSetPropertyMock";
      case "MultiSelectOptionSet":
        return "MultiSelectOptionSetPropertyMock";
      case "FP":
        return "DecimalNumberPropertyMock";
      default:
        return "ERROR!" + control["type"];
    }
  }

  private ControlToType(control: IData["Inputs"][any]) {
    switch (control.type) {
      case "DateAndTime.DateOnly":
      case "DateAndTime.DateAndTime":
        return "Date";
      case "Multiple":
      case "SingleLine.Text":
      case "SingleLine.Email":
      case "SingleLine.Phone":
      case "SingleLine.TextArea":
      case "SingleLine.Ticker":
      case "SingleLine.URL":
        return "string";
      case "TwoOptions":
        return "boolean";
      case "Enum":
        return control.enumValues.map((v) => '"' + v.value + '"').join(" | ");
      case "Lookup.Simple":
        return "ComponentFramework.LookupValue";
      case "Currency":
      case "Decimal":
      case "FP":
      case "Whole.None":
      case "OptionSet":
        return "number";
      case "MultiSelectOptionSet":
        return "number[]";
      default:
        return "ERROR" + control["type"];
    }
  }
  private ControlToOutputTypes(control: IData["Inputs"][any]) {
    switch (control.type) {
      case "DateAndTime.DateAndTime":
      case "DateAndTime.DateOnly":
        return "Date";
      case "Currency":
      case "Decimal":
      case "Whole.None":
      case "FP":
      case "OptionSet":
        return "number";
      case "Lookup.Simple":
        return "Lookup";
      case "Multiple":
        return "string";
      case "Object":
        return "any";
      case "MultiSelectOptionSet":
        return "number[]";
      case "SingleLine.Email":
      case "SingleLine.Phone":
      case "SingleLine.Text":
      case "SingleLine.TextArea":
      case "SingleLine.Ticker":
      case "SingleLine.URL":
        return "string";
      case "TwoOptions":
        return "boolean";
      default:
        return "ERROR!" + control["type"];
    }
  }

  private GetOutputProperties(inputs: IData["Inputs"]) {
    var t = inputs
      .filter(
        (property) => property.usage == "bound" || property.usage == "output"
      )
      .map((property) => {
        return {
          name: property.name,
          type: this.ControlToOutputTypes(property),
        };
      });
    return t;
  }

  async Render(data: IData) {
    const buffer = await readFile(
      require.resolve("./renderGenerator.template.hbs")
    );
    const template = Handlebars.compile(buffer.toString());

    const dts = template({ data });

    return dts;
  }
}
