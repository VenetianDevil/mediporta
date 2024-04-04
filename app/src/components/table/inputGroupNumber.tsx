import React, { useEffect, useState, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

var _ = require('lodash');

const InputGroupNumber = ({ config, callback, searchParamName, textStart, textEnd, min = 1, max }) => {
  const [, setSearchParams] = useSearchParams();
  const [isInvalid, setIsInvalid] = useState(false);
  const ref = useRef<HTMLInputElement>() as any;

  const validateField = () => {
    const val = ref.current.value;
    const isValid = val >= min && ((!!max && val <= max) || !max);
    setIsInvalid(!isValid);
    return isValid;
  };

  const onChange = async (e) => {
    const value = e.target.value;
    if (validateField()) {
      if (searchParamName)
        setSearchParams(prev => { prev.set(searchParamName, value); return prev; });
      callback(Number(value));
    }
  }
  const debouceOnChange = _.debounce(onChange, 300);

  useEffect(() => {
    if (!!ref.current) { ref.current.value = config.defaultValue; }
    validateField();
  }, [config.defaultValue, min, max])

  return (
    <InputGroup>
      {!!textStart ? <InputGroup.Text className='align-self-center px-2 m-0'>{textStart}</InputGroup.Text> : null}
      <Form.Control ref={ref} type='number' defaultValue={config.defaultValue} min={min} max={max} step={1} onChange={debouceOnChange} isInvalid={isInvalid}></Form.Control>
      {!!textEnd ? <InputGroup.Text>{textEnd}</InputGroup.Text> : null}
    </InputGroup>
  )
}

InputGroupNumber.propTypes = {
  config: PropTypes.shape({
    defaultValue: PropTypes.number.isRequired,

  }).isRequired,
  callback: PropTypes.func,
  searchParamName: PropTypes.string,
  textStart: PropTypes.string,
  textEnd: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number

}

export default InputGroupNumber;
