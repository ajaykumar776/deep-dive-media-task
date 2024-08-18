import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice'; // Adjust path as needed

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Task Management
          </Typography>
          <div>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/tasks" sx={{ marginLeft: 2 }}>
                  Tasks
                </Button>
                <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ marginLeft: 2 }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register" sx={{ marginLeft: 2 }}>
                  Register
                </Button>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
