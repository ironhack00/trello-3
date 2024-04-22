import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import LoginForm from './components/Register/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <div className='background'>
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Agrega más rutas aquí según sea necesario */}
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </div>
  </GoogleOAuthProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();
