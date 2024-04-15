import libxmljs, { XMLElement } from "libxmljs";
import { info } from "./tracing";
import { IData, IProperty } from "ShkoOnline.types";

export class ManifestParser {
  private VERBOSE: boolean;
  constructor(VERBOSE: boolean) {
    this.VERBOSE = VERBOSE;
  }
  async Parse(manifest: Buffer) {
    const xmlDoc = await libxmljs.parseXmlAsync(manifest);
    const control = xmlDoc.find("/manifest/control")[0] as XMLElement;
    const result = {
      Component: control.getAttribute("constructor")?.value(),
      ComponentIndex: (
        xmlDoc.find(
          "/manifest/control/resources/code[@order='1']"
        )[0] as XMLElement
      )
        .getAttribute("path")
        ?.value() as string,
      MockGenerator:
        control.getAttribute("control-type")?.value() === "virtual"
          ? "ComponentFrameworkMockGeneratorReact"
          : "ComponentFrameworkMockGenerator",
      Inputs: xmlDoc.find("/manifest/control/property").map((p) => {
        const type = (p as XMLElement)
          .getAttribute("of-type")
          ?.value() as IProperty["type"];
        const name = (p as XMLElement).getAttribute("name")?.value() as string;
        const usage = (p as XMLElement)
          .getAttribute("usage")
          ?.value() as IProperty["usage"];
        if (type === "Enum") {
          const enumValues = p.find("value").map((v) => ({
            name: (v as XMLElement).getAttribute("name")?.value() as string,
            value: (v as XMLElement).text(),
          }));
          return {
            type,
            name,
            usage,
            enumValues,
          };
        }
        return {
          type,
          name,
          usage,
        };
      }),
    } as IData;

    return result;
  }
}
