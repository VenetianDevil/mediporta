import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import useTags, { TagsQueryOptions, Tag, TOrder, TSort } from '../../utils/services/useTags.tsx';
import { useQueries } from 'react-query';
import ErrorHandler from '../../components/errorHandler.tsx';
import DataTable from '../../components/table/dataTable.tsx';
import DataPagination from '../../components/dataPagination.jsx';
import InputGroupNumber from '../../components/table/inputGroupNumber.tsx';
import FormSelectSort from '../../components/table/formSelectSort.tsx';

type TagArr = Tag[];

function Tags() {
  const { getTags } = useTags();
  const [searchParams,] = useSearchParams();
  const [tags, setTags] = useState<TagArr[]>([]);

  const keyNames = [{ key: "name", name: "Nazwa", sortable: true }, { key: "count", name: "l. postów" }];
  const sortOptions = ["popular", "activity", "name"];

  const [paginationInfo, setPaginationInfo] = useState({ activePage: Number(searchParams.get("page") || 1), pagesize: 30, total: 0 });
  const [tagsQueryOptions, setTagsQueryOptions] = useState<TagsQueryOptions>(new TagsQueryOptions({
    order: searchParams.get("order") as TOrder,
    sort: searchParams.get("sort") as TSort,
    page: paginationInfo.activePage,
    pagesize: Number(searchParams.get("pagesize")),
  }));
  const [resTotal, resTags] = useQueries([
    {
      queryKey: ['tagsTotal'],
      queryFn: () => getTags(tagsQueryOptions.queryObject, true),
      refetchOnWindowFocus: false, refetchIntervalInBackground: false, refetchOnMount: false,
      retry: 3,

    },
    {
      queryKey: ['tags', tagsQueryOptions],
      queryFn: () => getTags(tagsQueryOptions.queryObject),
      refetchOnWindowFocus: false,
      retry: 3,

    }

  ]);

  const [isLoading, isSuccess, isError, isFetching, data, error] = [resTags.isLoading || resTotal.isLoading, resTags.isSuccess && resTotal.isSuccess, resTags.isError || resTotal.isError, resTags.isFetching || resTotal.isFetching, resTags.data, resTags.error];

  const updateTagQueryOptions = (params: {}) => {
    setTagsQueryOptions(prev => {
      return new TagsQueryOptions({
        ...prev.queryObject,
        ...params,
      });
    })
  }

  const updatePaginationInfo = (params: {}) => {
    setPaginationInfo(prev => {
      return {
        ...prev,
        ...params
      }
    })
  }

  const changePage = (idx: number) => {
    if (idx != paginationInfo.activePage) {
      updatePaginationInfo({ activePage: idx })
      updateTagQueryOptions({ page: idx });
    }
  }

  const changePageSize = (size: number) => updateTagQueryOptions({ pagesize: size });
  const changeSortParams = (params: { sort: TSort, order: TOrder }) => updateTagQueryOptions(params);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const params = { pagesize: tagsQueryOptions.pagesize, total: !!resTotal.data ? resTotal.data.total : paginationInfo.total };
      updatePaginationInfo(params);
      setTags(data.items);
    }
  }, [isSuccess, isFetching])

  useEffect(() => {
    let changedParams = {};
    Object.keys(tagsQueryOptions).forEach(key => {
      key = key.replace(/^_/, '');
      const value = searchParams.get(key) || undefined; // undefined for reseting value
      if (value !== tagsQueryOptions[key]) {
        changedParams[key] = value;
        if (key === "page" && !!value) {
          updatePaginationInfo({ activePage: Number(value), pagesize: tagsQueryOptions.pagesize })
        }
      }
    })
    if (Object.keys(changedParams).length > 0) {
      updateTagQueryOptions(changedParams);
    }
  }, [searchParams]);

  const loader = <Spinner animation='border' role='status' className='border-4' />;
  const pagination = <DataPagination config={{ ...paginationInfo, maxItems: 5 }} callback={changePage} />;

  return (
    <Row className='my-5'>
      <Helmet>
        <title>App | Tagi</title>
      </Helmet>
      <Col xs={12}>
        <h1 className='mb-5'>Tagi&nbsp;{(isLoading || isFetching) && tags.length > 0 ? <span className='position-absolute'>{loader}</span> : null}</h1>
        {isError ? <ErrorHandler error={error} /> :
          <div>
            <Row className='mb-3'>
              <Col xs={12} sm={{ span: 4, offset: 5 }} md={{ span: 3, offset: 6 }} lg={{ span: 2, offset: 8 }}>
                <InputGroupNumber config={{ defaultValue: tagsQueryOptions.pagesize }} callback={changePageSize} textEnd="/ str." searchParamName="pagesize" min={1} max={100} />
              </Col>
              <Col xs={12} sm={{ span: 3 }} lg={{ span: 2 }}>
                <FormSelectSort options={sortOptions} selected={{ sort: tagsQueryOptions.sort, order: tagsQueryOptions.order }} callback={changeSortParams} />
              </Col>
            </Row>
            {pagination}
            {!isLoading ?
              <div>
                <DataTable data={tags} keyNames={keyNames} isIndex={true} page={tagsQueryOptions.page} pagesize={tagsQueryOptions.pagesize} />
              </div>
              :
              <DataTable data={[]} keyNames={keyNames} isIndex={true} emptyDataInfo="Ładowanie..." />
            }
            {pagination}
          </div>
        }
      </Col>
    </Row>
  )

}

export default Tags;
