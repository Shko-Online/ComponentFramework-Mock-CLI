import {describe, expect, test} from '@jest/globals';
import Renderer from '../src/Renderer';

describe('Renderer', () => {
  test('can load template', async () => {
    const renderer = new Renderer();
    var result = await renderer.Render({
        Component: 'Calendar',
        ComponentFolder: '../Calendar',
        ComponentIndex: 'index',
        Inputs: {
            Theme: "Multiple"
        },
        MockGenerator: 'ComponentFrameworkMockGeneratorReact'
    });

    expect(result).toMatchSnapshot();
  });
});