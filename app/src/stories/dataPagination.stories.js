import { fn } from '@storybook/test';
import DataPagination from '../components/dataPagination.jsx';
import { withRouter } from 'storybook-addon-remix-react-router';
import '../styles/dataPagination.css';

const paginationInfo = { activePage: 1, pagesize: 30, total: 500, maxItems: 5 }

export default {
  title: 'Example/Pagination',
  component: DataPagination,
  decorators: [withRouter],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    config: { ...paginationInfo },
  },
  argTypes: {
    callback: { action: "Value Changed", description: "Function called after page change; new page index passed as an argument" },
    config: {
      description: "total - Total number of all records displayed on pages; maxItems - Max allowed amount of pagintation items"
    }
  }
};

const Template = (args) => <main class="container my-auto">
  <DataPagination {...args} />
</main>

export const Default = Template.bind({});

export const DefaultNoInputField = Template.bind({})
DefaultNoInputField.args = {
  isInputField: false,
  config: { ...paginationInfo, activePage: 5 }
}

export const PageCountLessThanMaxAllowed = Template.bind({})
PageCountLessThanMaxAllowed.args = {
  config: { ...paginationInfo, total: 270, maxItems: 10 }
}

export const TotalLessThanPageSize = Template.bind({})
TotalLessThanPageSize.args = {
  config: { ...paginationInfo, total: 10 }
}