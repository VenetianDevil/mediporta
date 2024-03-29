import React, { createRef, useState } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

var _ = require('lodash');

type KNObject = {
  key: string,
  name: string,
  sortable: boolean
};

const ThSortable = ({ name, onClick }) => {
  return (
    <th onClick={onClick}>
      {name}
    </th>
  )
}

ThSortable.propTypes = {
  name: PropTypes.string,

}

export default ThSortable;
