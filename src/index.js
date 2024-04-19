import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import LoginForm from './components/Register/LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <div className='background'>
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Agrega más rutas aquí según sea necesario */}
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </div>,
  document.getElementById('root')
);

reportWebVitals();
