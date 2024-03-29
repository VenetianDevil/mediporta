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

const DataTable = ({ data, isIndex = true, keyNames, page = 1, pagesize = 0 }) => {
  if (!data) { data = []; };

  if ((!keyNames || keyNames.length === 0)) {
    keyNames = [];
    if (!!data && data.length > 0) {
      Object.keys(data[0]).forEach((data_key: string) => {
        keyNames.push({
          key: data_key,
          name: data_key,
        })
      })
    }
  }

  const thead =
    <thead>
      <tr>
        {isIndex ? <th style={{width: '100px'}}>#</th> : null}
        {keyNames.map((el: KNObject) => {
          // if (el.key in Object(data[0])) {
          //   console.log(el)
          return <th scope='col' key={el.name}>{el.name}</th>
          // }
        })}
      </tr>
    </thead>

  const tbody =
    <tbody>
      {data.map((data_el, idx: number) => <tr key={idx}>
        {isIndex ? <td>{idx + 1 + ((page - 1) * pagesize)}</td> : null}
        {keyNames.map((el: KNObject) => {
          if (el.key in Object(data_el)) {
            const value = data_el[el.key];
            if (typeof value === "boolean") {
              return value ? <td key={el.key} style={{ "color": 'green' }}>&#10003;</td> : <td key={el.key} style={{ "color": 'red' }}>&#10007;</td>
            }
            if (typeof value === undefined) {
              return <td key={el.key}>b.d.</td>
            }
            return <td key={el.key}>{value}</td>
          }
        })}
      </tr>)}
      {data.length === 0 ? <tr><td colSpan={keyNames.length + (isIndex ? 1 : 0)}>Brak danych</td></tr> : null}
    </tbody>


  return (
    <Table striped bordered hover className='mt-3' style={{tableLayout: 'fixed'}}>
      {thead}
      {tbody}
    </Table>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  isIndex: PropTypes.bool,
  keyNames: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    sortable: PropTypes.bool,

  })),
  page: PropTypes.number,
  pagesize: PropTypes.number,

}

export default DataTable;
