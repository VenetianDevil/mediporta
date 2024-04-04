import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import '../styles/dataPagination.css';
import PropTypes from 'prop-types';
import InputGroupNumber from './table/inputGroupNumber.tsx';

var _ = require('lodash');

const DataPagination = ({ config, callback, isInputField = true }) => {
  const [, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [CURRENT_PAGE, setCurrentPage] = useState(config.activePage);

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
    setCurrentPage(config.activePage);
  }, [config.activePage])

  const onClick = (idx) => {
    idx = Number(idx);
    setSearchParams(prev => { prev.set("page", idx); return prev; });
    setCurrentPage(idx);
    callback(idx);
  }
  const debounceOnClick = _.debounce(onClick, 300);

  if (pageCount <= 1) return;
  
  const paginationItems = () => {
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

  const pagination =
    (<Col xs={12} md={{ span: 8 }} xl={{ span: 6, offset: (!!isInputField && pageCount > maxItems) ? 3 : 0 }}>
      <Pagination className='justify-content-center gap-1'>
        <Pagination.First key="first" disabled={CURRENT_PAGE == 1} onClick={() => onClick(1)} />
        <Pagination.Prev key="prev" disabled={CURRENT_PAGE == 1} onClick={() => onClick(CURRENT_PAGE - 1)} />
        {paginationItems()}
        <Pagination.Next key="next" disabled={CURRENT_PAGE == pageCount} onClick={() => onClick(CURRENT_PAGE + 1)} />
        <Pagination.Last key="last" disabled={CURRENT_PAGE == pageCount} onClick={() => onClick(pageCount)} />
      </Pagination>
    </Col>);

  const paginationInputField =
    !!isInputField && pageCount > maxItems ?
      <Col xs={{ span: 6 }} md={{ span: 4 }} xl={{ span: 3, offset: 0 }}>
          <InputGroupNumber className="w-auto" config={{defaultValue: config.activePage}} callback={onClick} textStart="Strona" textEnd={`z ${pageCount}`} min={1} max={pageCount}/>
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
