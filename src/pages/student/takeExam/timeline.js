import React, { useState,useEffect, useRef } from 'react';
import styles from './TaskExam.module.scss';
import axios from 'axios';
function Time (){
    const [sophut,setSP] = useState(24)
    const [sogiay,setSG] = useState(59)
   
    useEffect(()=>{
        const timeline = setInterval(()=>{
            if(sogiay<0){
                clearInterval(timeline)
                setSP((sp)=>sp-1)
                setSG((sg)=>sg = 59)
            }
            else{
                setSG((sg)=> sg - 1)
            }
        },500) 
    },[])
    return(
        <div>
            <span className={styles.sophut}>{sophut}</span><span className={styles.sogiay}>:{sogiay}</span>
        </div>
    )
}
export default  Time