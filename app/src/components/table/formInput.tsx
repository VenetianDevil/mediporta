import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

var _ = require('lodash');

const InputGroupNumber = ({ defaultValue, callback, searchParamName, text, min = 1, max }) => {
  const [, setSearchParams] = useSearchParams();

  const onChange = async (e) => {
    const value = e.target.value;
    if (searchParamName)
      setSearchParams(prev => { prev.set(searchParamName, value); return prev; });
    callback(Number(value));
  }
  const debouceOnChange = _.debounce(onChange, 300);

  return (
    <InputGroup>
      <Form.Control as="input" type='number' defaultValue={defaultValue} min={min} max={max} step={1} onChange={debouceOnChange}></Form.Control>
      <InputGroup.Text>{text}</InputGroup.Text>
    </InputGroup>
  )
}

InputGroupNumber.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  callback: PropTypes.func,
  searchParamName: PropTypes.string,
  text: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number

}

export default InputGroupNumber;
