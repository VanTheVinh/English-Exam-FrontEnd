import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import styles from '~/pages/student/takeExam/TaskExam.module.scss';

const CountDown = ({ onTimeUp, isVisible }) => {
  const { examID } = useContext(AppContext); 
  const [timeLeft, setTimeLeft] = useState(null); 

  useEffect(() => {
    const savedTimeLeft = localStorage.getItem(`exam_${examID}_timeLeft`);

    if (savedTimeLeft) {
      setTimeLeft(parseInt(savedTimeLeft, 10));
    } else {
      // Fetch exam data using examID if there's no saved time
      const fetchExamData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/exam/${examID}`);
          const data = await response.json();
          const durationInMinutes = extractMinutes(data.exam.duration);
          setTimeLeft(durationInMinutes * 60); // Set time in seconds
        } catch (error) {
          console.error('Error fetching exam data:', error);
        }
      };

      fetchExamData();
    }
  }, [examID]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp(); // Trigger submission when time runs out
          return 0;
        }
        const newTimeLeft = prev - 1;
        localStorage.setItem(`exam_${examID}_timeLeft`, newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  if (!isVisible || timeLeft === null || timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.countDown}>
      <h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
    </div>
  );
};

// Helper function to extract minutes from a string like "30 minutes"
const extractMinutes = (duration) => {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

export default CountDown;
