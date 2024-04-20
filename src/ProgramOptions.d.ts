import { OptionValues } from "commander";

export interface ProgramOptions extends OptionValues {
  component: string;
  outputFolder: string;
  renderGenerator: string;
  logLevel: "none" | "error" | "verbose";

}
