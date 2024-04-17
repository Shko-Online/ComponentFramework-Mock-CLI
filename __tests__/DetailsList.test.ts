import { describe, expect, test } from "@jest/globals";
import { ManifestParser } from "../src/ManifestParser";
import fs from "fs/promises";
import Renderer from "../src/Renderer";

describe("DetailsList", () => {
  test("can generate renderGenerator", async () => {
    const manifestXml = await fs.readFile(
      require.resolve("./DetailsList/ControlManifest.Input.xml")
    );
    const parser = new ManifestParser(true);
    const manifest = await parser.Parse(manifestXml);
    const renderer = new Renderer();
    expect(await renderer.Render(manifest)).toMatchSnapshot();
  });
});
