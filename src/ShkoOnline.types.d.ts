export type IData = {
    /**
     * Class Name of the component
     */
    Component: string;
    /**
     * Component folder relative to the renderGenerator
     */
    ComponentFolder: string;
    /**
     * Component index file relative to the ComponentFolder. Defined in ControlManifest.Input.xml in the resources node like: `<code path="index.ts" order="1" />`
     */
    ComponentIndex: string;
    
    Inputs: {
        [key: string]: 'DateAndTime.DateOnly' | 'Enum' | 'Multiple' | 'SingleLine.Text' | 'TwoOptions'
    };
    MockGenerator: 'ComponentFrameworkMockGenerator' | 'ComponentFrameworkMockGeneratorReact'
    
}