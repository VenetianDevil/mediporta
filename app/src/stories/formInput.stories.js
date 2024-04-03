import { fn } from '@storybook/test';
import InputGroupNumber from '../components/table/formInput.tsx';
import { withRouter } from 'storybook-addon-remix-react-router';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Input',
  component: InputGroupNumber,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    config: {
      defaultValue: 1
    },
    min: 1,
    max: 100,
    text: "/ str.",
    searchParamName: "pagesize",

  },
  argTypes: {
    callback: { action: "Value Changed", description: "Function called on valid input change; new value passed as an argument" },
    searchParamName: {
      description: "Name of a query param to be updated after change"
    }
  }

};

const Template = (args) => <InputGroupNumber {...args} />

export const Default = Template.bind({})
Default.args = {
  config: {
    defaultValue: 1
  }
};

export const Error = Template.bind({})
Error.args = {
  config: {
    defaultValue: 107
  }
};


