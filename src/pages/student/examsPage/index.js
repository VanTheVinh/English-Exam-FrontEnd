import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faList,
  faInfoCircle,
  faCheckCircle,
  faHourglass,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import styles from './ExamsPage.module.scss';
import Header from '~/components/header';

const StudentExamsPage = () => {
  const { classId } = useParams();
  const { setExamID } = useContext(AppContext);
  const [exams, setExams] = useState([]);
  const [className, setClassName] = useState(''); // State to hold the class name

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/exam/class/${classId}`,
        );
        setExams(response.data.exams);

        // Fetch class name using classId
        const classResponse = await axios.get(
          `http://localhost:8000/class/${classId}`,
        );
        setClassName(classResponse.data.class.className);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} color="green" />;
      case 'incomplete':
        return <FontAwesomeIcon icon={faHourglass} color="orange" />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} />;
    }
  };

  const handleExamClick = (exam) => {
    setExamID(exam._id);
    if (exam.status === 'incomplete') {
      navigate('/student/exams-page/take-exam');
    } else if (exam.status === 'completed') {
      alert('You have already completed this exam.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <div className={styles.examsPage}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <h1>{className}</h1>

        <div className={styles.examsList}>
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div
                key={exam._id}
                className={styles.examCard}
                onClick={() => handleExamClick(exam)}
              >
                <h2>{exam.examName}</h2>
                {/* <p><FontAwesomeIcon icon={faTag } /> {exam.examCode}</p> */}
                <p>
                  <FontAwesomeIcon icon={faClock} /> {exam.duration}
                </p>
                <p>
                  <FontAwesomeIcon icon={faList} /> {exam.questionCount}{' '}
                  questions
                </p>
                <p>
                  {getStatusIcon(exam.status)} {exam.status}
                </p>
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
