import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RedirectBasedOnAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
};

const RedirectBasedOnAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/tasks');
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return null; // Render nothing while redirecting
};

export default App;
