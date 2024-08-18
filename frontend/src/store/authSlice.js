import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
