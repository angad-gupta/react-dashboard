import React from 'react';
import styles from './CheckList.module.css';
import{ useEffect, useState ,props, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const CheckList = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const addItem = () => {
    if (text) {
      var itms =[...items, { text, completed: false }]
      setItems(itms);
      sessionStorage.setItem("checkList", JSON.stringify(itms))
    }
    setText("");

  };

  const toggleItem = (index) => {
    var itms =  items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    )
    setItems(
     itms
    );
    sessionStorage.setItem("checkList", JSON.stringify(itms))

  };

  const deleteItem = (index) => {
    var itms = items.filter((item, i) => i !== index)
    setItems(itms);
    sessionStorage.setItem("checkList", JSON.stringify(itms))
  };

  useEffect(() => {
    var itms = sessionStorage.getItem("checkList") ? JSON.parse(sessionStorage.getItem("checkList")) : [];
    setItems(itms)
  },[]); 

  const handleChange = (e) => {
    setText(e.target.value)

  }


  
  return <div className="container mt-4">
    <h2>CheckList</h2>
    <div className="row mb-3 mt-4">
      <div className="col-8 col-md-10">
        <input type="text" className="form-control" placeholder="New Task" value={text} onChange={handleChange}/>
      </div>
      <div className="col-4 col-md-2">
        <button className="btn btn-success"  onClick={() => addItem()}> Add Item</button>
      </div>
    </div>
    <div className="row">
      <div className={styles.CheckListItem}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ width: '20px' }}></th>
              <th>Item</th>
              <th className='text-right' style={{ width: '100px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input className="form-check-input" type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem(index)}
                  />
              </td>
              <td>
                <label className="form-check-label" style={{marginLeft:"10px"}}> {item.text}</label>
              </td>
              <td>
                <Button className="rounded-circle" variant="danger" size="sm">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
    </div>
  </div>
};

CheckList.propTypes = {};

CheckList.defaultProps = {};

export default CheckList;
