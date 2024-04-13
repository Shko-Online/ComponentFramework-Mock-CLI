import { OptionValues } from "commander";

export interface ProgramOptions extends OptionValues {
  component: string;
  logLevel: "silent" | "error" | "verbose";
}
