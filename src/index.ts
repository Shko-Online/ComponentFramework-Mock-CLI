#!/usr/bin/env node

import { ProgramOptions } from "ProgramOptions";
import { Option, program } from "commander";
import { error, info } from "./tracing";

program.version(require("../package.json").version).name("pcf-cli");

program.requiredOption(
  "-c, --component <component>",
  "path to the PCF component"
);
program.addOption(new Option(
  "-l, --log-level <logLevel>",
  "specify log level (none | error | verbose)",
).choices(["none", "error", "verbose"]).default("error"));

const Run = async () => {
  await program.parseAsync();
  const options = program.opts() as ProgramOptions;
  if (options.logLevel === "verbose") {
    info("Searching for component");
  }

  error("this is an error");
};

Run();
