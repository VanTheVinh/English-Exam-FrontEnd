import React, { useState, useEffect, useRef } from 'react';
import styles from './TaskExam.module.scss';
import axios from 'axios';
function Time(props) {
    const [sogiay, setSG] = useState(0)
    const [sophut, setSP] = useState(0)
    let countdownTime = 25 * 60;

    function updateCountdown() {
        const minutes = Math.floor(countdownTime / 60);
        setSP((e) => e = minutes)
        const seconds = countdownTime % 60;
        setSG((t) => t = seconds)
            countdownTime--;
        if (countdownTime < 0) {
            clearInterval(countdownInterval);
        }
    }
    const countdownInterval = () => { setInterval(updateCountdown, 1000); }
    useEffect(() => {
        if(props.Submitchoice == 0){
            countdownInterval()
        }
        else{
            clearInterval(countdownInterval);
            console.log(props.Submitchoice)
        }
    },[props])

    return (
        <div>
            <p className={styles.timeclock}>{sophut}:{sogiay < 10 ? '0' + sogiay : sogiay}</p>
        </div>
    )
}
export default Time