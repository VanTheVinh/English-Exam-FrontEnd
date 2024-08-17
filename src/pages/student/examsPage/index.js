import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import axios from 'axios';

import styles from './ExamsPage.module.scss';
import Header from '~/components/header';

const StudentExamsPage = () => {
  const { classId } = useParams();
  const { setExamID } = useContext(AppContext);
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/exam/class/${classId}`);
        setExams(response.data.exams);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
        setError('Failed to fetch exams.');
        setLoading(false);
      }
    };

    fetchExams();
  }, [classId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleExamClick = (exam) => {
    setExamID(exam._id);
    navigate('/student/exams-page/take-exam');
  };

  return (
    <div>
      <Header />
      <div className={styles.examsPage}>
        <h1>Exams for Class</h1>
        <div className={styles.examsList}>
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div 
                key={exam._id} 
                className={styles.examCard} 
                onClick={() => handleExamClick(exam)}
              >
                <h2>{exam.examName}</h2>
                <p>{exam.examCode}</p>
                <p>{exam.duration}</p>
                <p>{exam.questionCount} questions</p>
              </div>
            ))
          ) : (
            <p>No exams available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentExamsPage;
