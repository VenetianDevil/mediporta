import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, Spinner } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
// import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import useTags, { TagsQueryOptions, Tag } from '../../utils/services/useTags.tsx';
import { useQuery } from 'react-query';
import ErrorHandler from '../../components/errorHandler.tsx';
import DataTable from '../../components/table/dataTable.tsx';
import DataPagination from '../../components/dataPagination.jsx';
import InputGroupNumber from '../../components/table/formInput.tsx';
import FormSelectSort from '../../components/table/formSelect.tsx';

function Tags() {
  const { getTags } = useTags();
  const [searchParams,] = useSearchParams();
  const [tags, setTags] = useState([]);
  const [requestTotal, setRequestTotal] = useState(true); // request total number of records only with firt query

  const keyNames = [{ key: "name", name: "Nazwa", sortable: true }, { key: "count", name: "l. postów" }];
  const sortOptions = ["popular", "activity", "name"]

  const [paginationInfo, setPaginationInfo] = useState({ activePage: Number(searchParams.get("page") || 1), count: 0, total: 0 });
  const [tagsQueryOptions,] = useState(new TagsQueryOptions({
    order: 'desc',
    sort: 'popular',
    page: paginationInfo.activePage,
    pagesize: Number(searchParams.get("pagesize")) || undefined,

  }));
  const { isLoading, isError, isSuccess, data, error, ...rest } = useQuery(['tags', tagsQueryOptions.page], () => getTags(tagsQueryOptions, requestTotal), { refetchOnWindowFocus: false });
  // const isLoading = false;
  // const isError = false;
  // const isSuccess = true;
  // const data = {
  //   items: [
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 2529023,
  //       "name": "javascript"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 2192458,
  //       "name": "python"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 1917429,
  //       "name": "java"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 1615050,
  //       "name": "c#"
  //     },
  //     {
  //       "collectives": [
  //         {
  //           "tags": [
  //             "php"
  //           ],
  //           "external_links": [
  //             {
  //               "type": "support",
  //               "link": "https://stackoverflow.com/contact?topic=15"
  //             }
  //           ],
  //           "description": "A collective where developers working with PHP can learn and connect about the open source scripting language.",
  //           "link": "/collectives/php",
  //           "name": "PHP",
  //           "slug": "php"
  //         }
  //       ],
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 1464508,
  //       "name": "php"
  //     },
  //     {
  //       "collectives": [
  //         {
  //           "tags": [
  //             "android",
  //             "ios"
  //           ],
  //           "external_links": [
  //             {
  //               "type": "support",
  //               "link": "https://stackoverflow.com/contact?topic=15"
  //             }
  //           ],
  //           "description": "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
  //           "link": "/collectives/mobile-dev",
  //           "name": "Mobile Development",
  //           "slug": "mobile-dev"
  //         }
  //       ],
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 1417314,
  //       "name": "android"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 1187442,
  //       "name": "html"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 1034862,
  //       "name": "jquery"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 806776,
  //       "name": "c++"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 804286,
  //       "name": "css"
  //     },
  //     {
  //       "collectives": [
  //         {
  //           "tags": [
  //             "android",
  //             "ios"
  //           ],
  //           "external_links": [
  //             {
  //               "type": "support",
  //               "link": "https://stackoverflow.com/contact?topic=15"
  //             }
  //           ],
  //           "description": "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
  //           "link": "/collectives/mobile-dev",
  //           "name": "Mobile Development",
  //           "slug": "mobile-dev"
  //         }
  //       ],
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 687280,
  //       "name": "ios"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 670775,
  //       "name": "sql"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 662058,
  //       "name": "mysql"
  //     },
  //     {
  //       "collectives": [
  //         {
  //           "tags": [
  //             "shinydashboard",
  //             "lubridate",
  //             "tibble",
  //             "zoo",
  //             "forcats",
  //             "stringr",
  //             "r-package",
  //             "rstudio",
  //             "r-caret",
  //             "rvest",
  //             "data.table",
  //             "dtplyr",
  //             "shinyapps",
  //             "tidyverse",
  //             "readr",
  //             "purrr",
  //             "r-raster",
  //             "dplyr",
  //             "knitr",
  //             "shiny-server",
  //             "plyr",
  //             "ggplot2",
  //             "tidyr",
  //             "rlang",
  //             "r",
  //             "shiny",
  //             "quantmod"
  //           ],
  //           "external_links": [
  //             {
  //               "type": "support",
  //               "link": "https://stackoverflow.com/contact?topic=15"
  //             }
  //           ],
  //           "description": "A collective where data scientists and AI researchers gather to find, share, and learn about R and other subtags like knitr and dplyr.",
  //           "link": "/collectives/r-language",
  //           "name": "R Language",
  //           "slug": "r-language"
  //         }
  //       ],
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 505609,
  //       "name": "r"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 476817,
  //       "name": "reactjs"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 472085,
  //       "name": "node.js"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 416703,
  //       "name": "arrays"
  //     },
  //     {
  //       "has_synonyms": false,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 403931,
  //       "name": "c"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 374635,
  //       "name": "asp.net"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 360366,
  //       "name": "json"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 343683,
  //       "name": "python-3.x"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 338059,
  //       "name": "ruby-on-rails"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 337895,
  //       "name": ".net"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 334538,
  //       "name": "sql-server"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 333386,
  //       "name": "swift"
  //     },
  //     {
  //       "has_synonyms": false,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 311839,
  //       "name": "django"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 304107,
  //       "name": "angular"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 292332,
  //       "name": "objective-c"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 286655,
  //       "name": "pandas"
  //     },
  //     {
  //       "has_synonyms": true,
  //       "is_moderator_only": false,
  //       "is_required": false,
  //       "count": 286528,
  //       "name": "excel"
  //     }
  //   ],
  //   has_more: true,
  //   quota_max: 300,
  //   quota_remaining: 118,
  //   total: 1000,
  // }
  // console.log(isLoading, isError, isSuccess, data, error, rest)

  const changePage = (idx: number) => {
    if (idx != paginationInfo.activePage) {
      setPaginationInfo(prev => {
        return {
          ...prev,
          activePage: idx,

        }
      })
      tagsQueryOptions.update({ page: idx })
    }
  }

  const changePageSize = (size: number) => {
    tagsQueryOptions.update({ pagesize: size });
  };

  const changeSortParams = (params: { sort: string, order: string }) => {
    tagsQueryOptions.update(params);
  }

  const loader = <Spinner animation='border' role='status' className='border-4' />;
  const pagination = <DataPagination config={{ ...paginationInfo, maxItems: 5 }} callback={changePage} />;

  useEffect(() => {
    if (isSuccess) {
      paginationInfo.total = data.total;
      setRequestTotal(false);
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      const newCount = Math.ceil(paginationInfo.total / tagsQueryOptions.pagesize);
      setPaginationInfo(prev => {
        return {
          ...prev,
          count: newCount,
        }
      })
      setTags(data.items);

    }

  }, [data]) // data

  return (
    <Row className='my-5'>
      <Helmet>
        <title>App | Tagi</title>
      </Helmet>
      <Col xs={12}>
        <h1 className='mb-5'>Tagi&nbsp;{isLoading && tags.length > 0 ? <span className='position-absolute'>{loader}</span> : null}</h1>
        {isError ? <ErrorHandler error={error} /> :
          <div>
            {pagination}
            {!isLoading || tags.length > 0 ?
              <div>
                <Row className='mb-3'>
                  <Col xs={12} sm={{ span: 4, offset: 5 }} md={{ span: 3, offset: 6 }} lg={{ span: 2, offset: 8 }}>
                    <InputGroupNumber defaultValue={tagsQueryOptions.pagesize} callback={changePageSize} text="/ str." searchParamName="pagesize" min={1} max={100} />
                  </Col>
                  <Col xs={12} sm={{ span: 3 }} lg={{ span: 2 }}>
                    <FormSelectSort options={sortOptions} selected={{ sort: tagsQueryOptions.sort, order: tagsQueryOptions.order }} callback={changeSortParams} />
                  </Col>
                </Row>
                <DataTable data={tags} keyNames={keyNames} isIndex={true} page={tagsQueryOptions.page} pagesize={tagsQueryOptions.pagesize} />
              </div>
              : loader
            }
            {pagination}
          </div>
        }
      </Col>
    </Row>
  )

}

export default Tags;
