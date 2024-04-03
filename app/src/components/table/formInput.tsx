import React, { useEffect, useState, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

var _ = require('lodash');

const InputGroupNumber = ({ config, callback, searchParamName, text, min = 1, max }) => {
  const [, setSearchParams] = useSearchParams();
  const [isInvalid, setIsInvalid] = useState(false);
  const ref = useRef({ value: config.defaultValue });

  const validateField = () => {
    const val = ref.current.value;
    const isValid = val >= min && ((!!max && val <= max) || !max);
    setIsInvalid(!isValid);
    return isValid;
  };

  const onChange = async (e) => {
    const value = e.target.value;
    // console.log("validating", min, max, value, validateField())
    if (validateField()) {
      if (searchParamName)
        setSearchParams(prev => { prev.set(searchParamName, value); return prev; });
      callback(Number(value));
    }
  }
  const debouceOnChange = _.debounce(onChange, 300);

  useEffect(() => {
    console.log('--!config chane', config)
    ref.current.value = config.defaultValue;
    validateField();
  }, [config.defaultValue, min, max])

  return (
    <InputGroup>
      <Form.Control ref={ref} type='number' defaultValue={config.defaultValue} min={min} max={max} step={1} onChange={debouceOnChange} isInvalid={isInvalid}></Form.Control>
      <InputGroup.Text>{text}</InputGroup.Text>
    </InputGroup>
  )
}

InputGroupNumber.propTypes = {
  config: PropTypes.shape({
    defaultValue: PropTypes.number.isRequired,

  }).isRequired,
  callback: PropTypes.func,
  searchParamName: PropTypes.string,
  text: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number

}

export default InputGroupNumber;
