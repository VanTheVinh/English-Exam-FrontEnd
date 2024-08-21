import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from '~/context/AppContext';
import CountDown from './CountDown';
import styles from '~/pages/student/takeExam/TaskExam.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const TakeExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { examID, studentID } = useContext(AppContext);
  const [examName, setExamName] = useState('');
  const [isCountdownVisible, setIsCountdownVisible] = useState(true);
  const navigate = useNavigate();

  // Create a ref for each question 
  const questionRefs = useRef([]);

  useEffect(() => {
    console.log('studentID: ', studentID);
    console.log('examID: ', examID);
  }, [studentID, examID]);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/exam/${examID}`,
        );
        const { examName } = response.data.exam;
        setExamName(examName);
      } catch (err) {
        console.log('Error fetching exam details');
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/question', {
          params: { examId: examID },
        });

        setQuestions(response.data.questions);
      } catch (err) {
        console.log('Error fetching questions');
      }
    };

    // Khôi phục các đáp án đã lưu từ localStorage
    const savedAnswers = localStorage.getItem(`exam_${examID}_answers`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    fetchExamDetails();
    fetchQuestions();
  }, [examID]);

  // Lưu đáp án vào state và localStorage
  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: answer,
    };

    setAnswers(updatedAnswers);
    localStorage.setItem(
      `exam_${examID}_answers`,
      JSON.stringify(updatedAnswers),
    );
  };

  const handleSubmit = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to submit the exam?',
    );
    if (!isConfirmed) return; // If the user cancels, do nothing

    if (submitted) return;
    setSubmitted(true);
    setIsCountdownVisible(false);

    try {
      const formattedAnswers = Object.keys(answers).map((questionId) => ({
        questionId,
        answer: answers[questionId],
      }));

      const submitResponse = await axios.post(
        'http://localhost:8000/exam/submit',
        {
          studentId: studentID,
          examId: examID,
          answers: formattedAnswers,
        },
      );

      const { score } = submitResponse.data;
      console.log('Score: ', score);

      try {
        await axios.post('http://localhost:8000/result', {
          studentId: studentID,
          examId: examID,
          score: score,
          dateTaken: new Date().toISOString(),
          submitted: true,
        });
        localStorage.removeItem(`exam_${examID}_answers`);
      } catch (err) {
        console.log('Error submitting result');
      }
    } catch (err) {
      console.log('Error submitting exam');
    }
  };

  const scrollToQuestion = (index) => {
    if (questionRefs.current[index]) {
      questionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.takeExamPage}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h1>{examName}</h1>
      <div className={styles.takeExamContent}>
        <div className={styles.questionsContent}>
          {!submitted &&
            questions.map((question, index) => (
              <div
                key={question._id}
                ref={(el) => (questionRefs.current[index] = el)}
                style={{ marginBottom: '20px' }}
              >
                <h3>
                  Question {index + 1}: {question.questionText}
                </h3>

                {question.questionAnswers.map((answer) => (
                  <div
                    key={answer._id}
                    className={
                      answers[question._id] === answer.answerText
                        ? styles.selected
                        : styles.answerOption
                    }
                    onClick={() =>
                      handleAnswerChange(question._id, answer.answerText)
                    }
                  >
                    <label>
                      <input
                        type="radio"
                        name={question._id}
                        value={answer.answerText}
                        onChange={() =>
                          handleAnswerChange(question._id, answer.answerText)
                        }
                        checked={answers[question._id] === answer.answerText}
                      />
                      {answer.answerText}
                    </label>
                  </div>
                ))}

                {/* {question.questionAnswers.map((answer) => (
                  <div
                    key={answer._id}
                    className={`${styles.answerOption} ${
                      answers[question._id] === answer.answerText
                        ? styles.selected
                        : ''
                    }`}
                    onClick={() =>
                      handleAnswerChange(question._id, answer.answerText)
                    }
                  >
                    {answer.answerText}
                  </div>
                ))} */}
              </div>
            ))}
        </div>

        <div className={styles.statusExam}>
          <CountDown
            className={styles.countDown}
            onTimeUp={handleSubmit}
            isVisible={isCountdownVisible}
          />
          {!submitted && (
            <div className={styles.questionButtons}>
              {questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => scrollToQuestion(index)}
                  className={answers[question._id] ? styles.answeredButton : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          {!submitted && (
            <button className={styles.submitButton} onClick={handleSubmit}>
              SUBMIT
            </button>
          )}
        </div>
      </div>

      {submitted && (
        <div className={styles.submittedMessage}>
          <h1>Exam Submitted</h1>
          <p>Your exam has been submitted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default TakeExamPage;
