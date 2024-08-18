import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Report from './components/Report';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';

// Main App component
const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<RedirectBasedOnAuth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Component to handle redirection based on authentication
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
