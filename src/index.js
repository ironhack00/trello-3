import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Importa el componente App desde su archivo correspondiente
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import LoginForm from './components/Register/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Admini from './components/Admini/Admin.jsx'
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
        <Route path="/app" element={<Admini />} />
        <Route path="/board/:boardId" element={<App />} />
      </Routes>
    </Router>
  </div>
  </GoogleOAuthProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();
