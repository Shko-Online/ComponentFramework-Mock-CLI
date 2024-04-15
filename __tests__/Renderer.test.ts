import { describe, expect, test } from '@jest/globals';
import Renderer from '../src/Renderer';

describe('Renderer', () => {
    test('can load template', async () => {
        const renderer = new Renderer();
        var result = await renderer.Render({
            Component: 'Calendar',
            ComponentFolder: '../Calendar',
            ComponentIndex: 'index',
            Inputs: [
                { name: "Theme", type: "Multiple", usage: "input" },
                { name: "BackgroundColor", type: "SingleLine.Text", usage: "input" },
                { name: "Language", type: "SingleLine.Text", usage: 'input' },
                { name: "AccessibilityLabel", type: "SingleLine.Text", usage: 'input' },
                { name: "SelectedDateValue", type: "DateAndTime.DateOnly", usage: 'bound' },
                { name: "MinDate", type: "DateAndTime.DateOnly", usage: 'input' },
                { name: "MaxDate", type: "DateAndTime.DateOnly", usage: 'input' },
                { name: "ShowGoToToday", type: "TwoOptions", usage: 'input' },
                { name: "MonthPickerVisible", type: "TwoOptions", usage: 'input' },
                { name: "DayPickerVisible", type: "TwoOptions", usage: 'input' },
                { name: "HighlightSelectedMonth", type: "TwoOptions", usage: 'input' },
                { name: "HighlightCurrentMonth", type: "TwoOptions", usage: 'input' },
                { name: "ShowSixWeeksByDefault", type: "TwoOptions", usage: 'input' },
                { name: "ShowWeekNumbers", type: "TwoOptions", usage: 'input' },
                { name: "InputEvent", type: "SingleLine.Text", usage: 'input' },
                {
                    name: "FirstDayOfWeek", type: "Enum", usage: 'input', enumValues: [
                        { name: "Sunday", value: "Sunday" },
                        { name: "Monday", value: "Monday" },
                        { name: "Tuesday", value: "Tuesday" },
                        { name: "Wednesday", value: "Wednesday" },
                        { name: "Thursday", value: "Thursday" },
                        { name: "Friday", value: "Friday" },
                        { name: "Saturday", value: "Saturday" }
                    ]
                }
            ],
            MockGenerator: 'ComponentFrameworkMockGeneratorReact'
        });

        expect(result).toMatchSnapshot();
    });
});