import { fn } from '@storybook/test';
import FormSelectSort from '../components/table/formSelect.tsx';
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
    selected
  },
  argTypes: { callback: { action: "Value Changed" } }
};

const Template = (args) => <FormSelectSort {...args} />

export const Default = Template.bind({})
Default.args = {
  options: sortOptions

};

// export const WithKeyNames = Template.bind({})
// WithKeyNames.args = {
//   data: exampleData,
//   keyNames,

// };

// export const NoIndexCol = Template.bind({})
// NoIndexCol.args = {
//   data: exampleData,
//   keyNames,
//   isIndex: false,

// };

// export const EmptyData = Template.bind({})
// EmptyData.args = {
//   data: [],

// };

// export const EmptyDataWithKeys = Template.bind({})
// EmptyDataWithKeys.args = {
//   data: [],
//   keyNames,

// };
