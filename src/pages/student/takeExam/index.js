import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '~/context/AppContext';
import { useParams } from 'react-router-dom';

const TakeExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const { studentID, examID } = useContext(AppContext); // Lấy examID từ Context
  const { examId } = useParams(); // Lấy examId từ URL parameters
  const [localExamID, setLocalExamID] = useState(examId); // Đặt examID từ URL vào trạng thái local

  console.log('ExamID: ', examID);
  console.log('StudentID: ', studentID);

  useEffect(() => {
    if (examID) {
      setLocalExamID(examID);
    }
  }, [examID]); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions for exam ID:', localExamID); // Kiểm tra examID
        const response = await axios.post('http://localhost:8000/question', {
          examId: localExamID,
        });
        console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về từ API
        setQuestions(response.data.questions);
      } catch (err) {
        setError(`Error fetching questions: ${err.response ? err.response.data.message : err.message}`);
        console.error('Fetch error:', err.response ? err.response.data : err.message);
      }
    };
  
    fetchQuestions();
  }, [localExamID]);
  

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    try {
      // Handle submit logic here, e.g., post answers to the server
      console.log(answers);
    } catch (err) {
      setError('Error submitting answers');
      console.error(err);
    }
  };

  return (
    <div className="take-exam-page">
      <h1>Take Exam</h1>
      {error && <p className="error">{error}</p>}
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((question) => (
            <div key={question._id} className="question">
              <p>{question.questionText}</p>
              {question.questionAnswers.map((answer) => (
                <div key={answer._id}>
                  <input
                    type="radio"
                    id={`q${question._id}a${answer._id}`}
                    name={question._id}
                    value={answer.answerText}
                    onChange={() =>
                      handleAnswerChange(question._id, answer.answerText)
                    }
                    checked={answers[question._id] === answer.answerText}
                  />
                  <label htmlFor={`q${question._id}a${answer._id}`}>
                    {answer.answerText}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default TakeExamPage;
