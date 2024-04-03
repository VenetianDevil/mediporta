import { fn } from '@storybook/test';
import FormSelectSort from '../components/table/formSelectSort.tsx';
import { withRouter } from 'storybook-addon-remix-react-router';

const sortOptions = ["popular", "activity", "name"];
let selected = {
  sort: 'popular',
  order: 'desc'
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Select',
  component: FormSelectSort,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    selected,
  },
  argTypes: {
    callback: { action: "Value Changed", description: "Function called after select; new selected object passed as an argument" },
    emptyValueLabel: {
      description: "Label for option with empty value (disabled)"
    }
  }
};

const Template = (args) => <FormSelectSort {...args} />

export const Default = Template.bind({})
Default.args = {
  options: sortOptions

};

export const NoDefaultValue = Template.bind({})
NoDefaultValue.args = {
  options: sortOptions,
  selected: undefined,

};

export const NoDefaultValueCustomLabel = Template.bind({})
NoDefaultValueCustomLabel.args = {
  options: sortOptions,
  selected: undefined,
  emptyValueLabel: "Wybierz kolejność"

};

export const Empty = Template.bind({})
Empty.args = {
  options: []
};