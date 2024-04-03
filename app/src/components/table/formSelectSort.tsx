import React, { useEffect, useRef } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

var _ = require('lodash');

const FormSelectSort = ({ options, selected, callback, emptyValueLabel = "Sortuj" }) => {
  const [_, setSearchParams] = useSearchParams();
  const ref = useRef({ value: JSON.stringify(selected) })

  const onChange = e => {
    const value = JSON.parse(e.target.value);
    setSearchParams(prev => {
      prev.set("sort", value.sort);
      prev.set("order", value.order);
      return prev;
    });
    callback(value);
  }

  useEffect(() => {
    console.log('--!config chane', selected)
    ref.current.value = JSON.stringify(selected);
  }, [selected])

  if (!options || options.length == 0) return;

  return (
    <Form.Select ref={ref} defaultValue={JSON.stringify(selected)} onChange={(e) => onChange(e)}>
      <option disabled value={"undefined"} hidden>{emptyValueLabel}</option>
      {options.reduce((acc, option: string) => {
        acc.push(<option key={option + ' asc'} value={JSON.stringify({ sort: option, order: 'asc' })}>{option} &#8593;</option>)
        acc.push(<option key={option + ' desc'} value={JSON.stringify({ sort: option, order: 'desc' })}>{option} &#8595;</option>)
        return acc;
      }, [])}
    </Form.Select>
  )
}

FormSelectSort.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.shape({
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }),
  callback: PropTypes.func,
  emptyValueLabel: PropTypes.string,

}

export default FormSelectSort;
