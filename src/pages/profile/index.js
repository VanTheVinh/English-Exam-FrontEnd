import React, { useState } from 'react';
import styles from './Profile.module.scss';
import BuildIcon from '@mui/icons-material/Build'; // Tua vít
import MailIcon from '@mui/icons-material/Mail';   // Lá thư

const Profile = () => {
    const [name, setName] = useState('Huỳnh Trần');
    const [email, setEmail] = useState('J97@60toi.com');
    const [studentId, setStudentId] = useState('J970BAO');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleDayChange = (event) => {
        setDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Student ID:', studentId);
        console.log('Birthday:', `${day}/${month}/${year}`);
    };

    const generateOptions = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => i + start).map(value => (
            <option key={value} value={value}>
                {value}
            </option>
        ));
    };

    return (
        <div className={styles.profile_container}>
            <h1>TÀI KHOẢN CỦA BẠN</h1>
            <div className={styles.profile_info}>
                <div className={styles.profile_avatar}>
                    <div className={styles.circle}>
                        {/* <img /> */}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label htmlFor="student-id">Student ID:</label>
                        <input
                            type="text"
                            id="student-id"
                            value={studentId}
                            onChange={handleStudentIdChange}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className={styles.form_group_column}>
                        <label htmlFor="birthday">Ngày sinh:</label>
                        <div className={styles.birthday_input}>
                            <select
                                id="day"
                                value={day}
                                onChange={handleDayChange}
                            >
                                <option value="">Ngày</option>
                                {generateOptions(1, 31)}
                            </select>
                            <select
                                id="month"
                                value={month}
                                onChange={handleMonthChange}
                            >
                                <option value="">Tháng</option>
                                {generateOptions(1, 12)}
                            </select>
                            <select
                                id="year"
                                value={year}
                                onChange={handleYearChange}
                            >
                                <option value="">Năm</option>
                                {generateOptions(1924, 2024)}
                            </select>
                        </div>
                    </div>
                </form>
                <div className={styles.actions}>
                    <div className={styles.action}>
                        <span className={styles.icon}>
                            <BuildIcon />{/* Tua vít */}
                        </span>
                        <label>Change email</label>
                        <button className={styles.update_button}>Cập nhật</button>
                    </div>
                    <div className={styles.action}>
                        <span className={styles.icon}>
                            <MailIcon /> {/* Lá thư */}
                        </span>
                        <label>Change Pass</label>
                        <button className={styles.update_button}>Cập nhật</button>
                    </div>
                </div>
                <button type="submit" className={styles.update_button}>
                    Cập nhật
                </button>
            </div>
        </div>
    );
};

export default Profile;
