import React from 'react';
import styles from './Dashboard.module.scss';
import Header from '~/components/header'; // Adjust the path if Header is in a different directory

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <Header />
            <h1>Teacher Dashboard</h1>
        </div>
    );
};

export default Dashboard;
