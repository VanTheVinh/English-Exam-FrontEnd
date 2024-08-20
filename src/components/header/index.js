import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faHistory, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuClose = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(false); // Close the menu
    navigate('/profile'); // Navigate to the profile page
  };

  const handleLogoutClick = () => {
    const confirmed = window.confirm('Do you want to Logout?');
    if (confirmed) {
      // Clear tokens from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setMenuOpen(false); // Close the menu
      navigate('/login'); // Navigate to the login page
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleMenuClose);
    return () => {
      document.removeEventListener('mousedown', handleMenuClose);
    };
  }, []);

  return (
    // <header className={styles.header}>
    //   <div className={styles.logo}>
    //       <h3>ENGLISH EXAM </h3>
    //   </div>
    //   <div
    //     className={styles.userMenu}
    //     onMouseEnter={() => setMenuOpen(true)}
    //     onMouseLeave={() => setMenuOpen(false)}
    //     ref={userMenuRef}
    //   >
    //     <button className={styles.userButton}>
    //       <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
    //     </button>
    //     {menuOpen && (
    //       <ul className={styles.menu}>
    //         <li onClick={handleProfileClick} className={styles.menuItem}>
    //           Profile
    //         </li>
    //         <li>
    //         <Link className={styles.menuItem} to="/student/exams-page/exam-results">History</Link>
    //         </li>
    //         <li onClick={handleLogoutClick} className={styles.menuItem}>
    //           Logout
    //         </li>
    //       </ul>
    //     )}
    //   </div>
    // </header>
    <header className={styles.header}>
      <div className={styles.logo}>
        <h3>ENGLISH EXAM </h3>
      </div>
      <div
        className={styles.userMenu}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        ref={userMenuRef}
      >
        <button className={styles.userButton}>
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        </button>
        {menuOpen && (
          <ul className={styles.menu}>
            <li onClick={handleProfileClick} className={styles.menuItem}>
              <FontAwesomeIcon icon={faUser} className={styles.menuIcon} />
              <span>Profile</span>
            </li>
            <li>
              <Link className={styles.menuItem} to="/student/exams-page/exam-results">
                <FontAwesomeIcon icon={faHistory} className={styles.menuIcon} />
                <span>History</span>
              </Link>
            </li>
            <li onClick={handleLogoutClick} className={styles.menuItem}>
              <FontAwesomeIcon icon={faSignOutAlt} className={styles.menuIcon} />
              <span>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
