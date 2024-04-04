import { fn } from '@storybook/test';
import InputGroupNumber from '../components/table/inputGroupNumber.tsx';
import { withRouter } from 'storybook-addon-remix-react-router';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Input',
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
    searchParamName: "pagesize",
    textStart: "",
    textEnd: ""

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

export const TextAddons = Template.bind({})
TextAddons.args = {
  config: {
    defaultValue: 1,
  },
  textStart: "Strona",
  textEnd: "z 30",
};

export const Error = Template.bind({})
Error.args = {
  config: {
    defaultValue: 107
  }
};
Error.parameters = {
  docs: {
    description: {
      story: "input value > max allowed"
    }
  }
}

