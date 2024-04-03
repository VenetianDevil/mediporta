import { fn } from '@storybook/test';
import ErrorHandler from '../components/errorHandler.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Error',
  component: ErrorHandler,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const Template = (args) => <main className='container'><ErrorHandler {...args} /></main>

export const Error_400 = Template.bind({})
Error_400.args = {
  error: {
    error_id: 400,
    error_message: 'site is required',
    error_name: "bad_parameter"

  }
};

export const Error_404 = Template.bind({})
Error_404.args = {
  error: {
    error_id: 404,
    error_message: 'Method do not exist',
    error_name: "no_method"

  }
};

export const Error_400_to_410 = Template.bind({})
Error_400_to_410.args = {
  error: {
    error_id: 405,
    error_message: 'Access Token required',
    error_name: "key_required"

  }
};

export const Error_500_up = Template.bind({})
Error_500_up.args = {
  error: {
    error_id: 500,
    error_message: 'Iternal server error',
    error_name: "internal_error"

  }
};

export const Other = Template.bind({})
Other.args = {
  error: {
    error_id: 418,
    error_message: "I'm a teapot",
    error_name: "teapot_error"

  }
};