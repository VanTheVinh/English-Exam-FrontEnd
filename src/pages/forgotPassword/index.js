import React from 'react';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = () => {
    return (
        <div>
            <div className={styles.header}>
                <img src='logo192.png'></img>
                <h5>Name</h5>
            </div>
            <div className={styles.content}>
                <div className={styles.reset_password_form}>
                    <h4>Reset password</h4>
                    <div className={styles.email_label} >
                        <label for='email'>Email Address</label>
                    </div>
                    <input type="email" id="email" name="email" placeholder="john.doe@example.com"></input>
                    <div>
                        <button>
                            SEND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
