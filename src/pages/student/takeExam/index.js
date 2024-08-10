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

    const checktrueflase =(value,rightasw,id)=>{
        if(value === rightasw){
            
        }
    }
    return (
        <div className={styles.task_exam}>
            <div className={styles.header}>TOEIC EXAM</div>
                <div className={styles.main}>
                    <div className={styles.testquestion}>
                        <ul className={styles.question}>
                            {QE.map((e)=>{
                                return (
                                    <li>
                                        <div>{e.question}</div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw1} onChange={(e)=>{checktrueflase(e.target.value,e.rightasw,e.point)}}></input>
                                            <label>{e.asw1}</label>
                                         </div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw2} onChange={(e)=>{console.log(e.target.value)}} ></input>
                                            <label>{e.asw2}</label>
                                        </div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw3} onChange={(e)=>{console.log(e.target.value)}} ></input>
                                            <label>{e.asw3}</label>
                                        </div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw4} onChange={(e)=>{console.log(e.target.value)}} ></input>
                                            <label>{e.asw4}</label>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={styles.timeline}>
                        <p>Thời Gian Còn</p>
                        <Time></Time>
                        <div><button>SUBMIT</button></div>
                    </div>
                </div>
        </div>
    );
};

export default TakeExam;
