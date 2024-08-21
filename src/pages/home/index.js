import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    }

  return (
    <div className={styles.home}>
      <h2>Welcome to English Exam !</h2>
        <button onClick={handleClick}>LOGIN</button>
    </div>
  );
};

export default Home;
