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

interface ITagsQueryOptions extends Object {
  order: 'desc' | 'asc',
  sort: 'popular' | 'activity' | 'name',
  site?: 'stackoverflow',
  page?: number,
  pagesize?: number,
  fromdate?: number,
  todate?: number,
  min?: number,
  max?: number,
  inname?: string
}

export class TagsQueryOptions implements ITagsQueryOptions {
  order: 'desc' | 'asc';
  sort: 'popular' | 'activity' | 'name';
  site: 'stackoverflow' = 'stackoverflow';
  page: number;
  pagesize: number;
  fromdate?: number;
  todate?: number;
  min?: number;
  max?: number;
  inname?: string;

  constructor(config: ITagsQueryOptions) {
    this.update(config);
  };

  public update(params: object) {
    Object.keys(params).forEach((key: string) => {
      if (key in TagsQueryOptions)
        this[key] = params[key];
    });
    this.order = params["order"] || 'desc';
    this.sort = params["sort"] || 'popular';
    this.page = params["page"] || 1;
    this.pagesize = params["pagesize"] || 30;
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
