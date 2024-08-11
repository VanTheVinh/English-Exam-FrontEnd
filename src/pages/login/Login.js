import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Link,
} from '@mui/material';
import axios from 'axios';
import styles from './Login.module.scss';
import img from '../../images/image 1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        userName: email,
        password: password,
      });

      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert(`Welcome, ${user.fullName}!`);
      
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };
  
  return (
    <Container maxWidth="md" className={styles.login}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} className={styles.image}>
          <img className={styles.img} src={img} alt="Exam readiness" />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <Box sx={{ width: '100%' }}>
            <Typography variant="h8" component="h1" gutterBottom display="flex" justifyContent="center">
              Welcome to join English Exam
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <Link href="#" variant="body8">
                Forgot password?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
