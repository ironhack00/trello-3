import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate ();
  const [data, setData] = useState(null);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async () => {
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:3000/users', formData);
      setData(response.data);
      console.log(data);
      navigate('/app');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Mostrar mensaje de error al usuario
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.ubi}>
      <div className={`${styles.body} ${isSignUp ? styles.slideUp : ''}`}>
        <div className={styles.form}>
          <h2 className={styles.h2}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {isSignUp && (
            <label className={styles.label}>
              <span>Name</span>
              <input 
                onChange={handleChange}
                value={formData.username}  
                name="username"
                className={styles.input} 
                type="text" 
                placeholder="Enter your name" 
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
      </div>
    </div>
  );
};

export default LoginForm;
