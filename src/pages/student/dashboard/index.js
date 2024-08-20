// dashboard/index.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Dashboard.module.scss';
import Header from '~/components/header';
import { AppContext } from '~/context/AppContext';

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {studentID} = useContext(AppContext);
  

  useEffect(() => {    
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/class');
        setClasses(response.data.classes);
        setLoading(false);
        
        
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setError('Failed to fetch classes.');
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleClassClick = (classId) => {
    navigate(`/student/exams-page/${classId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(studentID);
  return (
    <div>
      <Header />
      <div className={styles.dashboard}>
        <h1>MY CLASSES</h1>
        <div className={styles.classesList}>
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <div key={classItem._id} className={styles.classCard} onClick={() => handleClassClick(classItem._id)}>
                <h2>{classItem.classCode}</h2>
                <p>{classItem.className}</p>
              </div>
            ))
          ) : (
            <p>No classes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
