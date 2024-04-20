#!/usr/bin/env node

import { ProgramOptions } from "./ProgramOptions";
import { Option, program } from "commander";
import { error, info } from "./tracing";
import path from "path";
import fs, { constants } from "fs/promises";
import { ManifestParser } from "./ManifestParser";
import Renderer from "./Renderer";

program.version(require("../package.json").version).name("pcf-cli");

program.requiredOption(
  "-c, --component <component>",
  "path to the PCF component"
);
program.addOption(
  new Option(
    "-o, --outputFolder <outputFolder>",
    "path to the desired output folder"
  ).default(".")
);
program.addOption(
  new Option(
    "-r, --renderGenerator <renderGenerator>",
    "override generated file name"
  ).default("{Component}.renderGenerator.ts")
);
program.addOption(
  new Option("-l, --log-level <logLevel>", "specify log level")
    .choices(["none", "error", "verbose"])
    .default("error")
);

const Run = async () => {
  await program.parseAsync();
  const options = program.opts() as ProgramOptions;
  info(JSON.stringify(options));
  const component = path.resolve(options.component);
  try {
    await fs.access(component, constants.R_OK);
  } catch (e) {
    if (options.logLevel !== "none") error("Could not read file.", e);
    process.exit(-1);
  }

  try {
    const parser = new ManifestParser(options.logLevel === "verbose");
    if (options.logLevel === "verbose") {
      info(
        `Reading component manifest from '${path.relative(".", component)}'`
      );
    }
    const manifestXml = await fs.readFile(component);

    if (options.logLevel === "verbose") {
      info("Parsing manifest");
    }
    const manifest = await parser.Parse(manifestXml);
    const renderer = new Renderer();

    const renderGenerator = path.resolve(
      options.outputFolder,
      options.renderGenerator === "{Component}.renderGenerator.ts"
        ? `${manifest.Component}.renderGenerator.ts`
        : options.renderGenerator
    );

    manifest.ComponentFolder = path
      .relative(path.dirname(renderGenerator), path.dirname(component))
      .split(path.sep)
      .join(path.posix.sep);

    await fs.writeFile(renderGenerator, await renderer.Render(manifest));
  } catch (e) {
    if (options.logLevel !== "none")
      error("Could not create renderGenerator.", e);
    process.exit(-1);
  }
};

Run();
