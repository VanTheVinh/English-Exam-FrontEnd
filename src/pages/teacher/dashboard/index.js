import styles from './Dashboard.module.scss';
import Header from '~/components/header';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUser,
  faChalkboardTeacher,
  faUsers,
  faFileAlt,
  faQuestionCircle,
  faChartLine,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import ManageClasses from '../manageClasses';
import ManageStudents from '../manageStudents';
import ManageExams from '../manageExams';
import ManageQuestions from '../manageQuestions';
import PublishResults from '../publishResults';

const Dashboard = () => {
  const [page, setPage] = useState(0);

  const menuItems = [
    { name: 'Dashboard', icon: faTachometerAlt },
    { name: 'Profile', icon: faUser},
    { name: 'Classes', icon: faChalkboardTeacher, component: <ManageClasses />},
    { name: 'Students', icon: faUsers, component: <ManageStudents /> },
    { name: 'Tests', icon: faFileAlt, component: <ManageExams /> },
    { name: 'Question', icon: faQuestionCircle, component: <ManageQuestions /> },
    { name: 'Scores', icon: faChartLine, component: <PublishResults /> },
    { name: 'Sign Out', icon: faSignOutAlt },
  ];

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.menu}>
            <ul>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={page === index ? styles.active : ''}
                  onClick={() => setPage(index)}
                >
                  <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mainContent}>
            {menuItems[page].component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
