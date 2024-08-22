import React, { useEffect, useRef, useState } from 'react';
import styles from './ManageClasses.module.scss';
import axios from 'axios';
import { json } from 'react-router-dom';
import classNames from 'classnames';

const ManageClasses = () => {
  let stt = 0;
  const [cla, setClass] = useState([]);
  const [edi, setEdit] = useState(0);
  const [popup, setPop] = useState(0);
  const [render, setRender] = useState(0);
  const getAPI = async () => {
    await axios
      .get('http://localhost:8000/class')
      .then((res) => {
        if (res.data.classes.length != 0) {
          res.data.classes.map((e) => {
            console.log(e);
            setClass(res.data.classes);
          });
        }
      })
      .catch((err) => {});
  };
  const putAPIclassname = async (id, value) => {
    await axios
      .put('http://localhost:8000/class/' + id, {
        className: value,
      })
      .catch((err) => {
        alert('Bạn đã Submit quá nhanh xin vui lòng chờ trong giây lát');
      });
  };

  const editLisenclassname = (q) => {
    if (q.keyCode == 13) {
      cla.map((t) => {
        if (q.target.value != '') {
          if (t._id == q.target.id) {
            t.__v = 0;
            t.className = q.target.value;
            setEdit(0);
            putAPIclassname(q.target.id, t.className);
          }
        }
      });
    }
  };
  const postAPI = async (value1, value2) => {
    await axios.post('http://localhost:8000/class', {
      classCode: value1,
      className: value2,
    });
  };
  const addclass = () => {
    const ad = document.getElementById('input1').value;
    const bd = document.getElementById('input2').value;
    postAPI(ad, bd);
    setPop(0);
    setTimeout(() => {
      setRender(1);
    }, 500);
  };
  const detele = async (id) => {
    await axios.delete('http://localhost:8000/class/' + id).then((res) => {
      setRender(1);
    });
  };
  useEffect(() => {
    setClass([]);
    getAPI();
  }, [render]);
  return (
    <div className={styles.manage_classes}>
      <table className={styles.tables}>
        <tr className={styles.tr}>
          <th>STT</th>
          <th>ID</th>
          <th>CLASS</th>
          <th>
            <button
              onClick={() => {
                setPop(1);
              }}
            >
              +
            </button>
          </th>
        </tr>
        <p className={styles.line}></p>
        {popup == 1 ? (
          <>
            <tr className={styles.popup}>
              <td></td>
              <td>
                <input id="input1"></input>
              </td>
              <td>
                <input id="input2"></input>
              </td>
              <button onClick={addclass}>OKE</button>
            </tr>
            <p className={styles.line}></p>
          </>
        ) : null}
        {cla.map((e) => {
          {
            stt += 1;
          }
          return (
            <>
              <tr className={styles.tr}>
                <td>{stt}</td>
                <td>{e.classCode}</td>
                <td>
                  {e.__v == 1 && edi == 1 ? (
                    <input
                      onKeyDown={editLisenclassname}
                      id={e._id}
                      defaultValue={e.className}
                    ></input>
                  ) : (
                    e.className
                  )}
                </td>
                <td>
                  <span
                    onClick={() => {
                      e.__v = 1;
                      setEdit(1);
                    }}
                    className="material-symbols-outlined"
                  >
                    edit
                  </span>
                </td>
                <td>
                  <span
                    onClick={() => {
                      detele(e._id);
                    }}
                    className="material-symbols-outlined"
                  >
                    delete
                  </span>
                </td>
              </tr>

              <p className={styles.line}></p>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default ManageClasses;
