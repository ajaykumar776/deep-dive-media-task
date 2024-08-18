import axiosInstance from './axiosInstance';

// Task CRUD operations
export const fetchTasks = async (page, filters) => {
    try {
      // Construct query string from filters
      const queryString = new URLSearchParams({
        page,
        ...filters,
      }).toString();
      
      const response = await axiosInstance.get(`/tasks?${queryString}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };
export const createTask = async (task) => {
    try {
        const response = await axiosInstance.post('/tasks', task);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateTask = async (task) => {
    try {
        const response = await axiosInstance.put(`/tasks/${task.id}`, task);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Authentication operations
export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        localStorage.setItem('token', response.data.token); // Save token on successful login
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const register = async (user) => {
    try {
        const response = await axiosInstance.post('/register', user);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const logout = async () => {
    try {
        await axiosInstance.post('/logout');
        localStorage.removeItem('token'); // Remove token on logout
    } catch (error) {
        handleError(error);
    }
};

export const getUser = async () => {
    try {
        const response = await axiosInstance.get('/user');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Error handling utility function
const handleError = (error) => {
    console.error('API call error:', error);
    throw error;
};
