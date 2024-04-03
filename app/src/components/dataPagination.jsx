import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Pagination, InputGroup, Form } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import '../styles/dataPagination.css';
import PropTypes from 'prop-types';

var _ = require('lodash');

const DataPagination = ({ config, callback, isInputField = true }) => {
  const [, setSearchParams] = useSearchParams();
  const [inputInvalid, setInputInvalid] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const ref = useRef({ value: config.activePage });

  const maxItems = config.maxItems || 5;
  const leftItems = Math.floor(maxItems / 2);
  const rightItems = maxItems % 2 === 0 ? leftItems - 1 : leftItems;

  useEffect(() => {
    const newCount = Math.ceil(config.total / config.pagesize);
    setPageCount(newCount);
    if (newCount > 0 && config.activePage > newCount) {
      onClick(newCount);
    };
  }, [config.pagesize, config.total])

  useEffect(() => {
    ref.current.value = config.activePage;
  }, [config.activePage])

  const onClick = (idx) => {
    idx = Number(idx);
    if (idx > pageCount || idx < 1) {
      setInputInvalid(true);
      return;
    }
    setInputInvalid(false);
    setSearchParams(prev => { prev.set("page", idx); return prev; });
    ref.current.value = idx;
    callback(idx);
  }
  const debounceOnClick = _.debounce(onClick, 300);

  if (pageCount <= 1) return;
  const paginationItems = () => {
    const CURRENT_PAGE = Number(ref.current.value);
    const items = [];
    const begin = Math.min( //maintain visible maxItems items
      Math.max(1, Math.round(CURRENT_PAGE - leftItems)), // find begining
      Math.max(pageCount - maxItems + 1, 1) // if count < maxItems
    );

    const end = Math.max( //maintain visible maxItems items
      Math.min(pageCount, Math.round(CURRENT_PAGE + rightItems)), //find end
      Math.min(pageCount, maxItems) // if count < maxItems
    );

    for (let idx = begin; idx <= end; idx++) {
      items.push(
        <Pagination.Item key={"page-" + idx} active={idx == CURRENT_PAGE} onClick={() => onClick(idx)}>
          {idx}
        </Pagination.Item>
      );
    }
    if (begin > 1) items.unshift(<Pagination.Ellipsis key="elipsis_begin" />);
    if (end < pageCount) items.push(<Pagination.Ellipsis key="elipsis_end" />);
    return items;
  }
  console.log(isInputField)
  const pagination =
    (<Col xs={12} md={{ span: 8 }} xl={{ span: 6, offset: (!!isInputField && pageCount > maxItems) ? 3 : 0 }}>
      <Pagination className='justify-content-center gap-1'>
        <Pagination.First key="first" disabled={ref.current.value == 1} onClick={() => onClick(1)} />
        <Pagination.Prev key="prev" disabled={ref.current.value == 1} onClick={() => onClick(ref.current.value - 1)} />
        {paginationItems()}
        <Pagination.Next key="next" disabled={ref.current.value == pageCount} onClick={() => onClick(ref.current.value + 1)} />
        <Pagination.Last key="last" disabled={ref.current.value == pageCount} onClick={() => onClick(pageCount)} />
      </Pagination>
    </Col>);

  const paginationInputField =
    !!isInputField && pageCount > maxItems ?
      <Col xs={{ span: 6 }} md={{ span: 4 }} xl={{ span: 3, offset: 0 }}>
        <InputGroup className='w-auto'>
          <InputGroup.Text className='align-self-center px-2 m-0'>Strona</InputGroup.Text>
          <Form.Control ref={ref} type='number' max={pageCount} min={1} defaultValue={config.activePage} onChange={(e) => debounceOnClick(e.target.value)} isInvalid={inputInvalid}></Form.Control>
          <InputGroup.Text>z {pageCount}</InputGroup.Text>
        </InputGroup>
      </Col>
      : null;

  return (<Row className='justify-content-center'>
    {pagination}
    {paginationInputField}
  </Row>);
}

DataPagination.propTypes = {
  config: PropTypes.shape({
    activePage: PropTypes.number.isRequired,
    pagesize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    maxItems: PropTypes.number,

  }),
  callback: PropTypes.func,
  isInputField: PropTypes.bool,
}

export default DataPagination;
