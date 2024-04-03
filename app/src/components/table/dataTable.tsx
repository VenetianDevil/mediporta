import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

type KNObject = {
  key: string,
  name: string,

};

const DataTable = ({ data, isIndex = true, keyNames, page = 1, pagesize = 0 }) => { //saver to pass keyNames for table head
  const [isLoading, setIsLoading] = useState(true);
  const [_keyNames, setKeyNames] = useState<KNObject[]>(keyNames || []);

  useEffect(() => {
    if (!data) { data = []; };

    if (!keyNames || keyNames.length === 0) {
      keyNames = [];
      if (!!data && data.length > 0) {
        console.log("setting keys", data[0])
        const templ_item = data[0];
        Object.keys(templ_item).forEach((data_key: string) => {
          const item_value_type = typeof templ_item[data_key];
          if (["boolean", "number", "string"].includes(item_value_type)) { //don't show fileds with complex value type: object, array etc.
            console.log('pushing key', data_key)
            keyNames.push({
              key: data_key,
              name: data_key,
            });
            setKeyNames(keyNames)
          }
        })
      }
    }

    setIsLoading(false);

  }, [isLoading])

  const thead =
    <thead>
      <tr>
        {isIndex ? <th style={{ width: '100px' }}>#</th> : null}
        {_keyNames.map((el: KNObject) => {
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
        {_keyNames.map((el: KNObject) => {
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
      {data.length === 0 ? <tr><td colSpan={_keyNames.length + (isIndex ? 1 : 0)}>Brak danych</td></tr> : null}
    </tbody>

  if (isLoading) return;

  return (
    <Table striped bordered hover className='mt-3' style={{ tableLayout: 'fixed' }}>
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

  })),
  page: PropTypes.number,
  pagesize: PropTypes.number,

}

export default DataTable;
