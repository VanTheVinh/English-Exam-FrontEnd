import React, { useState, useEffect } from 'react';
import styles from './TaskExam.module.scss';

function Time({ Submitchoice }) {
    const [sogiay, setSG] = useState(0);
    const [sophut, setSP] = useState(0);
    let countdownTime = 25 * 60; // 25 minutes in seconds

    useEffect(() => {
        let countdownInterval;
        
        const updateCountdown = () => {
            const minutes = Math.floor(countdownTime / 60);
            const seconds = countdownTime % 60;
            setSP(minutes);
            setSG(seconds);
            countdownTime--;

            if (countdownTime < 0) {
                clearInterval(countdownInterval);
            }
        };

        if (Submitchoice === 0) {
            countdownInterval = setInterval(updateCountdown, 1000);
        } else {
            setSP(0);
            setSG(0);
        }

        return () => clearInterval(countdownInterval); // Cleanup interval on component unmount or when Submitchoice changes
    }, [Submitchoice]);

    return (
        <div>
            <p className={styles.timeclock}>
                {sophut}:{sogiay < 10 ? '0' + sogiay : sogiay}
            </p>
        </div>
    );
}

export default Time;
