import { fn } from '@storybook/test';
import DataTable from '../components/table/dataTable.tsx';

const exampleData = [
  {
    "collectives": [
      {
        "tags": [
          "php"
        ],
        "external_links": [
          {
            "type": "support",
            "link": "https://stackoverflow.com/contact?topic=15"
          }
        ],
        "description": "A collective where developers working with PHP can learn and connect about the open source scripting language.",
        "link": "/collectives/php",
        "name": "PHP",
        "slug": "php"
      }
    ],
    "has_synonyms": true,
    "is_moderator_only": false,
    "is_required": false,
    "count": 1464508,
    "name": "php"
  },
  {
    "has_synonyms": true,
    "is_moderator_only": false,
    "is_required": false,
    "count": 2529023,
    "name": "javascript"
  },
  {
    "has_synonyms": true,
    "is_moderator_only": false,
    "is_required": false,
    "count": 2192458,
    "name": "python"
  },
  {
    "has_synonyms": true,
    "is_moderator_only": false,
    "is_required": false,
    "count": 1917429,
    "name": "java"
  },
  {
    "has_synonyms": true,
    "is_moderator_only": false,
    "is_required": false,
    "count": 1615050,
    "name": "c#"
  },
  {
    "collectives": [
      {
        "tags": [
          "android",
          "ios"
        ],
        "external_links": [
          {
            "type": "support",
            "link": "https://stackoverflow.com/contact?topic=15"
          }
        ],
        "description": "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
        "link": "/collectives/mobile-dev",
        "name": "Mobile Development",
        "slug": "mobile-dev"
      }
    ],
    "has_synonyms": true,
    "is_moderator_only": false,
    "is_required": false,
    "count": 1417314,
    "name": "android"
  }];
const keyNames = [{ key: "name", name: "Nazwa" }, { key: "count", name: "l. postów" }];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    page: 1,
    pagesize: 30,

  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

const Template = (args) => <DataTable {...args} />

// isIndex = true, keyNames, page = 1, pagesize = 0

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithKeyNames = Template.bind({})
WithKeyNames.args = {
  data: exampleData,
  keyNames,

};

export const Default = Template.bind({})
Default.args = {
  data: exampleData,

};

export const NoIndexCol = Template.bind({})
NoIndexCol.args = {
  data: exampleData,
  keyNames,
  isIndex: false,

};

export const EmptyData = Template.bind({})
EmptyData.args = {
  data: [],

};

export const EmptyDataWithKeys = Template.bind({})
EmptyDataWithKeys.args = {
  data: [],
  keyNames,

};

export const EmptyDataCustomText = Template.bind({})
EmptyDataCustomText.args = {
  data: [],
  keyNames,
  emptyDataInfo: "Loading..."
};