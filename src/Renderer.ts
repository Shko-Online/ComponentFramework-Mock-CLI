import { IData } from 'ShkoOnline.types';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';

export default class Renderer {
    constructor() {
        Handlebars.registerHelper('GetPropertyMocks', this.GetPropertyMocks.bind(this));
        Handlebars.registerHelper('ControlToPropertyMock', this.ControlToPropertyMock.bind(this));
        Handlebars.registerHelper('ControlToType', this.ControlToType.bind(this));
        Handlebars.registerHelper('isVirtualComponent', this.isVirtualComponent.bind(this));
    }

    private GetPropertyMocks(inputs: IData['Inputs']) {
        const propertyMocks: string[] = [];
        inputs.forEach(property => {
            var mock = this.ControlToPropertyMock(property);
            if (!propertyMocks.includes(mock)) {
                propertyMocks.push(mock);
            }
        });
        return propertyMocks.join(', ');
    }

    private isVirtualComponent(mockGenerator: IData['MockGenerator']) {
        return mockGenerator === 'ComponentFrameworkMockGeneratorReact';
    }

    private ControlToPropertyMock(control: IData['Inputs'][any]) {
        switch (control.type) {
            case 'DateAndTime.DateOnly':
                return 'DateTimePropertyMock';
            case 'Multiple':
                return 'StringPropertyMock';
            case 'SingleLine.Text':
                return 'StringPropertyMock';
            case 'TwoOptions':
                return 'TwoOptionsPropertyMock';
            case 'Enum':
                return 'EnumPropertyMock';
            default:
                return 'ERROR!'+control;
        }
    }

    private ControlToType(control: IData['Inputs'][any]) {
        switch (control.type) {
            case 'DateAndTime.DateOnly':
                return 'Date';
            case 'Multiple':
            case 'SingleLine.Text':
                return 'string';
            case 'TwoOptions':
                return 'boolean';
            case 'Enum':
                return control.enumValues.map(v=>v.value).join(" | ");
            default:
                return '';
        }
    }

    async Render(data: IData) {
        const buffer = await readFile(require.resolve('./renderGenerator.template.hbs'));
        const template = Handlebars.compile(buffer.toString());


        const dts = template({ data });

        return dts;
    }
}