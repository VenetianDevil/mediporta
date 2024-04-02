import useServerService from './useServerService';

interface Collective {
  tags: string[],
  external_links: { type: string, link: string }[],
  description: string,
  link: string,
  name: string,
  slug: string,

}

export interface Tag {
  has_synonyms: boolean,
  is_moderator_only: boolean,
  is_required: boolean,
  count: number,
  name: string,
  collectives?: Collective[],

}

const ORDER_OPTS = ['desc', 'asc'] as const;
export type TOrder = (typeof ORDER_OPTS)[number];

const SORT_OPTS = ['popular', 'activity', 'name'] as const;
export type TSort = (typeof SORT_OPTS)[number];

interface ITagsQueryOptions extends Object {
  order: TOrder,
  sort: TSort,
  page?: number,
  pagesize?: number,
  fromdate?: number,
  todate?: number,
  min?: number,
  max?: number,
  inname?: string
}

export class TagsQueryOptions implements ITagsQueryOptions {
  private _order: TOrder;
  private _sort: TSort;
  private _site: 'stackoverflow' = 'stackoverflow'; //not changable
  private _page: number;
  private _pagesize: number;
  fromdate?: number;
  todate?: number;
  min?: number;
  max?: number;
  inname?: string;

  constructor(config: ITagsQueryOptions) {
    this.order = config["order"] || 'desc';
    this.sort = config["sort"] || 'popular';
    this.page = config["page"] || 1;
    this.pagesize = config["pagesize"] || 30;
    this.update(config);
  };

  public update(params: object) {
    Object.keys(params).forEach((key: string) => {
      if (key in this) {
        this[key] = params[key];
      }
    });
  }

  get queryObject(): ITagsQueryOptions {
    return Object.keys(this)
      .filter(key => !!this[key] || this[key] === 0)
      .reduce((acc, key) => { acc[key.replace(/^_/, "")] = this[key]; return acc }, {});
  }

  set order(newOrderValue: string) {
    if (!ORDER_OPTS.includes(newOrderValue as TOrder)) {
      newOrderValue = 'desc';
    }
    this._order = newOrderValue as TOrder;
  }

  get order(): TOrder {
    return this._order;
  }

  set sort(newSortValue: string) {
    if (!SORT_OPTS.includes(newSortValue as TSort)) {
      newSortValue = 'popular'
    }
    this._sort = newSortValue as TSort;
  }

  get sort(): TSort {
    return this._sort;
  }

  set page(newPageValue: number) {
    if (typeof newPageValue !== 'number') {
      try {
        newPageValue = parseInt(newPageValue);
      } catch (err) {
        newPageValue = 1;
      }
    }
    if (!newPageValue) newPageValue = 1;
    this._page = newPageValue;
  }

  get page(): number {
    return this._page;
  }

  set pagesize(newPageSizeValue: number) {
    if (typeof newPageSizeValue !== 'number') {
      try {
        newPageSizeValue = parseInt(newPageSizeValue);
      } catch (err) {
        newPageSizeValue = 30;
      }
    }
    if (!newPageSizeValue || newPageSizeValue > 100 || newPageSizeValue < 1) {
      newPageSizeValue = 30;
    }
    this._pagesize = newPageSizeValue;
  }

  get pagesize(): number {
    return this._pagesize;
  }
}

const useTags = () => {
  const { request, getQueryFromObject } = useServerService();
  const totalRequest = "filter=!HUWWJ)6LYhiHX71CO";

  function getTags(options: ITagsQueryOptions, total: boolean = false) {
    return request("GET", `/tags?${getQueryFromObject(options)}${total ? totalRequest : ''}`);
  }


  return { getTags };
}

export default useTags;
