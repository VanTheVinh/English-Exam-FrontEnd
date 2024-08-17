import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

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
    const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
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
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Replace with your actual logo */}
        <img src="/path-to-logo/logo.png" alt="Logo" />
      </div>
      <div
        className={styles.userMenu}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        ref={userMenuRef}
      >
        <button className={styles.userButton}>
          <img src="/path-to-icon/user-icon.png" alt="User" />
        </button>
        {menuOpen && (
          <ul className={styles.menu}>
            <li onClick={handleProfileClick} className={styles.menuItem}>
              Profile
            </li>
            <li onClick={handleLogoutClick} className={styles.menuItem}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
