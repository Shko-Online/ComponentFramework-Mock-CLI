import libxmljs, { XMLElement } from "libxmljs";
import { info } from './tracing';

export class ManifestParser {
    private VERBOSE: boolean;
    constructor(VERBOSE: boolean) {
        this.VERBOSE = VERBOSE;
    }
    async Parse(manifest: Buffer) {
        const xmlDoc = await libxmljs.parseXmlAsync(manifest);
        const control = xmlDoc.find("/manifest/control");
        info((control[0] as XMLElement).getAttribute("constructor")?.value() || "");
    }
}