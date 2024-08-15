import React, { useState,useEffect, useRef } from 'react';
import styles from './TaskExam.module.scss';
import axios from 'axios';
import Time from './timeline'
function TakeExam(){
    const [QE,setQE] = useState([])
    const [popup,setPopup]= useState(0)
    const diem = useRef(0)
    const [submitchoice,setSU] = useState(0)
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

    const checktrueflase =(id,value,rightasw)=>{
        QE.map((e)=>{
            if(e.id == id){
                if(value == rightasw){
                    e.point = 1
                }
                else{
                    e.point = 0
                }
            }
        })
    }
    const Submit = ()=>{
        setPopup((e)=>e = 1)
        
    }   
    let x = {opacity: 0.1}
    return (
        <div>
            {popup == 1? 
                <div className={styles.Popup}>
                    <p>Do you want to submit</p>
                    <button onClick={()=>{
                            QE.map((e)=>{
                            diem.current= diem.current + e.point
                            })
                            setSU((e)=>e = 1)
                            setPopup((e)=>e = 0)

                    }}>Yes</button>
                    <button onClick={()=>{
                    setPopup((e)=>e = 0)
                    }}>No</button>
                </div>:null
            }
        <div className={styles.task_exam} style={popup == 1?x:null}>
            <div className={styles.header}>TOEIC EXAM</div>
            
                <div className={styles.main}>
                    <div className={styles.testquestion}>
                        <ul className={styles.question}>
                            {QE.map((e)=>{
                                return (
                                    <li>
                                        <div>{e.question}</div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw1} onChange={(t)=>{checktrueflase(e.id,t.target.value,e.rightasw)}}></input>
                                            <label>{e.asw1}</label>
                                         </div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw2} onChange={(t)=>{checktrueflase(e.id,t.target.value,e.rightasw)}} ></input>
                                            <label>{e.asw2}</label>
                                        </div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw3} onChange={(t)=>{checktrueflase(e.id,t.target.value,e.rightasw)}} ></input>
                                            <label>{e.asw3}</label>
                                        </div>
                                        <div>
                                            <input type='radio' name={e.id} value={e.asw4} onChange={(t)=>{checktrueflase(e.id,t.target.value,e.rightasw)}} ></input>
                                            <label>{e.asw4}</label>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>  
                    <div className={styles.timeline}>
                        {submitchoice == 1?<p>Kết Quả</p>:<p>Thời Gian Còn</p>}
                            {submitchoice == 1 ?<div className={styles.Diem}>{diem.current}/25</div>:<Time Submitchoice ={submitchoice==1?1:0}></Time>}
                            
                        <div>
                            <button onClick={()=>{Submit()}}>SUBMIT</button></div>
                    </div>
                </div>
                
        </div>
        </div>
    );
};

export default TakeExam;
;