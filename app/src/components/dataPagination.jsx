import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Pagination, InputGroup, Form } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import '../styles/dataPagination.css';
import PropTypes from 'prop-types';

var _ = require('lodash');

const DataPagination = ({ config, callback }) => {
  const [, setSearchParams] = useSearchParams();
  const maxItems = config.maxItems || 10;
  const leftItems = Math.floor(maxItems / 2);
  const rightItems = maxItems % 2 === 0 ? leftItems - 1 : leftItems;
  const [inputInvalid, setInputInvalid] = useState(false);
  const ref = useRef({value: config.activePage});

  useEffect(() => {
    if (config.count > 0 && config.activePage > config.count) {
      onClick(config.count);
    };
  }, [config.count])

  useEffect(() => {
    ref.current.value = config.activePage;
  }, [config.activePage])

  const onClick = (idx) => {
    idx = Number(idx);
    if (idx > config.count || idx < 1) {
      setInputInvalid(true);
      return;
    }
    setInputInvalid(false);
    setSearchParams(prev => { prev.set("page", idx); return prev; });
    // ref.current.value = idx
    callback(idx);
  }
  const debounceOnClick = _.debounce(onClick, 300);

  if (config.count <= 1) return;

  const paginationItems = () => {
    const items = [];
    const begin = Math.min( //maintain visible maxItems items
      Math.max(1, Math.round(config.activePage - leftItems)), // find begining
      Math.max(config.count - maxItems + 1, 1) // if count < maxItems
    );

    const end = Math.max( //maintain visible maxItems items
      Math.min(config.count, Math.round(config.activePage + rightItems)), //find end
      Math.min(config.count, maxItems) // if count < maxItems
    );

    for (let idx = begin; idx <= end; idx++) {
      items.push(
        <Pagination.Item key={"page-" + idx} active={idx == config.activePage} onClick={() => onClick(idx)}>
          {idx}
        </Pagination.Item>
      );
    }
    if (begin > 1) items.unshift(<Pagination.Ellipsis key="elipsis_begin" />);
    if (end < config.count) items.push(<Pagination.Ellipsis key="elipsis_end" />);
    return items;
  }
  const pagination =
    <Row className='justify-content-center'>
      <Col xs={12} md={{ span: 8 }} lg={{ span: 6, offset: 3 }}>
        <Pagination className='justify-content-center gap-1'>
          <Pagination.First key="first" disabled={config.activePage == 1} onClick={() => onClick(1)} />
          <Pagination.Prev key="prev" disabled={config.activePage == 1} onClick={() => onClick(config.activePage - 1)} />
          {paginationItems()}
          <Pagination.Next key="next" disabled={config.activePage == config.count} onClick={() => onClick(config.activePage + 1)} />
          <Pagination.Last key="last" disabled={config.activePage == config.count} onClick={() => onClick(config.count)} />
        </Pagination>
      </Col>
      {config.count > maxItems ?
        <Col xs={{ span: 6 }} md={{ span: 4 }} lg={{ span: 3, offset: 0 }}>
          <InputGroup className='w-auto'>
            <InputGroup.Text className='align-self-center px-2 m-0'>Strona</InputGroup.Text>
            <Form.Control ref={ref} type='number' max={config.count} min={1} defaultValue={config.activePage} onChange={(e) => debounceOnClick(e.target.value)} isInvalid={inputInvalid}></Form.Control>
            <InputGroup.Text>z {config.count}</InputGroup.Text>
          </InputGroup>
        </Col>
        : null}
    </Row>;

  return pagination;
}

DataPagination.propTypes = {
  config: PropTypes.shape({
    activePage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    maxItems: PropTypes.number,

  }),
  callback: PropTypes.func,
}

export default DataPagination;
