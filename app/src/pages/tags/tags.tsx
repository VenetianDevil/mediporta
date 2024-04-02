import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, Spinner } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import useTags, { TagsQueryOptions, Tag, TOrder, TSort } from '../../utils/services/useTags.tsx';
import { useQueries } from 'react-query';
import ErrorHandler from '../../components/errorHandler.tsx';
import DataTable from '../../components/table/dataTable.tsx';
import DataPagination from '../../components/dataPagination.jsx';
import InputGroupNumber from '../../components/table/formInput.tsx';
import FormSelectSort from '../../components/table/formSelect.tsx';

type TagArr = Tag[];

function Tags() {
  const { getTags } = useTags();
  const [searchParams,] = useSearchParams();
  const [tags, setTags] = useState<TagArr[]>([]);

  const keyNames = [{ key: "name", name: "Nazwa", sortable: true }, { key: "count", name: "l. postów" }];
  const sortOptions = ["popular", "activity", "name"];

  const [paginationInfo, setPaginationInfo] = useState({ activePage: Number(searchParams.get("page") || 1), count: 0, total: 0 });
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
      retry: false,

    },
    {
      queryKey: ['tags', tagsQueryOptions.page],
      queryFn: () => getTags(tagsQueryOptions.queryObject),
      refetchOnWindowFocus: false,
      retry: false,

    }

  ]);

  const [isLoading, isSuccess, isError, data, error] = [resTags.isLoading || resTotal.isLoading, resTags.isSuccess && resTotal.isSuccess, resTags.isError || resTotal.isError, resTags.data, resTags.error];

  const changePage = (idx: number) => {
    console.log("change page")
    if (idx != paginationInfo.activePage) {
      console.log("--change page set pagination info and update query")
      setPaginationInfo(prev => {
        return {
          ...prev,
          activePage: idx,

        }
      })
      // tagsQueryOptions.update({ page: idx })
      setTagsQueryOptions(prev => {
        return new TagsQueryOptions({
          ...prev.queryObject,
          page: idx
        });
      })
    }
  }

  const changePageSize = (size: number) => {
    // tagsQueryOptions.update({ pagesize: size });
    setTagsQueryOptions(prev => {
      return new TagsQueryOptions({
        ...prev.queryObject,
        pagesize: size
      });
    })
  };

  const changeSortParams = (params: { sort: TSort, order: TOrder }) => {
    // tagsQueryOptions.update(params);
    setTagsQueryOptions(prev => {
      return new TagsQueryOptions({
        ...prev.queryObject,
        ...params,
      });
    })
  }

  useEffect(() => {
    if (isSuccess && !resTags.isFetching) {
      console.log(resTotal.data.total)
      if (paginationInfo.total === 0) paginationInfo.total = resTotal.data.total;
      const newCount = Math.ceil(paginationInfo.total / tagsQueryOptions.pagesize);
      setPaginationInfo(prev => {
        return {
          ...prev,
          count: newCount,
        }
      })
      setTags(data.items);
    }
  }, [isSuccess, resTags.isFetching]) // data

  useEffect(() => {
    console.log("QParam changed!")
    let changedParams = {};
    Object.keys(tagsQueryOptions).forEach(key => {
      key = key.replace(/^_/, '');
      const value = searchParams.get(key) || undefined;
      // console.log(key, value, tagsQueryOptions[key])
      if (value !== tagsQueryOptions[key]) {
        changedParams[key] = value;
        if (key === "page" && !!value) {
          const newCount = Math.ceil(paginationInfo.total / tagsQueryOptions.pagesize);
          setPaginationInfo(prev => {
            return {
              ...prev,
              activePage: Number(value),
              count: newCount,
            }
          })
        }
      }
    })
    console.log(changedParams)
    if (Object.keys(changedParams).length > 0) {
      // tagsQueryOptions.update(changedParams);
      setTagsQueryOptions(prev => {
        return new TagsQueryOptions({
          ...prev.queryObject,
          ...changedParams,
        });
      })
      if (resTotal.isError) resTotal.refetch();
    }
  }, [searchParams]);

  const loader = <Spinner animation='border' role='status' className='border-4' />;
  const pagination = <DataPagination config={{ ...paginationInfo, maxItems: 5 }} callback={changePage} />;

  // console.log(isLoading, isError, resTags.isError, resTotal.isError, isSuccess, data, error, resTags.isFetching, tags)
  // console.log(tagsQueryOptions, paginationInfo);
  return (
    <Row className='my-5'>
      <Helmet>
        <title>App | Tagi</title>
      </Helmet>
      <Col xs={12}>
        <h1 className='mb-5'>Tagi&nbsp;{isLoading && tags.length > 0 ? <span className='position-absolute'>{loader}</span> : null}</h1>
        {isError ? <ErrorHandler error={error} /> :
          <div>
            <Row className='mb-3'>
              <Col xs={12} sm={{ span: 4, offset: 5 }} md={{ span: 3, offset: 6 }} lg={{ span: 2, offset: 8 }}>
                <InputGroupNumber config={{ defaultValue: tagsQueryOptions.pagesize }} callback={changePageSize} text="/ str." searchParamName="pagesize" min={1} max={100} />
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
              <DataTable data={[]} keyNames={keyNames} isIndex={true} />
            }
            {pagination}
          </div>
        }
      </Col>
    </Row>
  )

}

export default Tags;
