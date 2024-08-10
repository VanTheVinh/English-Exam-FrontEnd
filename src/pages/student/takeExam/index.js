import React, { useState,useEffect, useRef } from 'react';
import styles from './TaskExam.module.scss';
import axios from 'axios';
import Time from './timeline'
function TakeExam(){
    const [QE,setQE] = useState([])
    const getAPI= async()=>{
        await axios
        .get('https://66b334137fba54a5b7ebe5f9.mockapi.io/sanpham')
        .then((res)=>{
            res.data.map((e)=>{
                setQE((t)=>[...t,e])
            })
        })
    }
    useEffect(()=>{
        getAPI()
    },[])
    return (
        <div className={styles.task_exam}>
            <div className={styles.header}>TOEIC EXAM</div>
                <div className={styles.main}>
                    <div className={styles.testquestion}>
                        <ul className={styles.question}>
                            {QE.map((e)=>{
                                return (
                                    <li>{e.exid}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={styles.timeline}>
                        <p>Thời Gian Còn</p>
                        <Time></Time>
                        <button>SUBMIT</button>
                    </div>
                </div>
        </div>
    );
};

export default TakeExam;
