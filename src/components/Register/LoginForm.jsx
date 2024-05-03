import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        // Registro de usuario
        const response = await axios.post('http://localhost:3000/users', formData);
        setData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        navigate('/app');
      } else {
        // Inicio de sesión
        /* console.log(formData) */
        const userResponse = await axios.get('http://localhost:3000/user',{
          params: formData
        });
        // Aquí puedes hacer lo que necesites con la respuesta del usuario, por ejemplo:
        console.log('Usuario logueado:', userResponse.data);
        localStorage.setItem('userData', JSON.stringify(userResponse.data));
        navigate('/app');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const responseMessage = async (responseData) => {
    try {
      const response = await axios.post('http://localhost:3000/users', responseData);
      setData(response.data);
      console.log(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      navigate('/app');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className={styles.ubi}>
      <div className={`${styles.body} ${isSignUp ? styles.slideUp : ''}`}>
        <div className={styles.form}>
          <h2 className={styles.h2}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {isSignUp && (
            <label className={styles.label}>
              <span>Username</span>
              <input
                onChange={handleChange}
                value={formData.username}
                name="username"
                className={styles.input}
                type="text"
                placeholder="Enter your username"
              />
            </label>
          )}
          <label className={styles.label}>
            <span>Email</span>
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              className={styles.input}
              type="email"
              placeholder="Enter your email"
            />
          </label>
          <label className={styles.label}>
            <span>Password</span>
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              className={styles.input}
              type="password"
              placeholder="Enter your password"
            />
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className={`${styles['button-submit']} ${styles['button']}`}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
        <div className={styles.toggle} onClick={handleToggleForm}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </div>
        <div className={styles.google}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
