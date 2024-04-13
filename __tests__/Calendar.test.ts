import {describe, expect, test} from '@jest/globals';
import { ManifestParser } from '../src/ManifestParser';
import fs from 'fs/promises';

describe('Calendar', () => {
  test('can parse Manifest', async () => {
    const manifest = await fs.readFile(require.resolve('./Calendar/ControlManifest.Input.xml'));
    var parser = new ManifestParser(true);
    expect(await parser.Parse(manifest)).toBeFalsy();
  });
});