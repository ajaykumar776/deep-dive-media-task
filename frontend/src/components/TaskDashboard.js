import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/apiService';
import { Container, Typography, CircularProgress, Alert, Button, TextField, MenuItem, Grid, Pagination, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ClearIcon from '@mui/icons-material/Clear'; // Import ClearIcon for reset button

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', dueDate: '', title: '' });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const getTasks = async (page = 1, filters = {}) => {
      try {
        // Check if token exists, otherwise redirect to login
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        setLoading(true);
        const response = await fetchTasks(page, filters);
        setTasks(response.tasks); // Update to access `tasks` array in the response
        setCurrentPage(response.current_page);
        setLastPage(response.last_page);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    getTasks(currentPage, filters);
  }, [currentPage, filters, navigate]); // Add navigate to dependency array

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTaskSubmit = async (task) => {
    try {
      if (task.id) {
        // Update existing task
        const updatedTask = await updateTask(task);
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      } else {
        // Create new task
        const newTask = await createTask(task);
        setTasks([...tasks, newTask]);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError('Failed to save task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleAddTaskClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    // Perform search operation, already handled in the useEffect hook based on filters
    setCurrentPage(1); // Reset to first page
  };

  const handleResetFilters = () => {
    setFilters({ status: '', dueDate: '', title: '' });
    setCurrentPage(1); // Reset to first page
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Task Dashboard
      </Typography>
      {showForm ? (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowForm(false)}
            style={{ marginBottom: '20px' }}
          >
            Back to Task List
          </Button>
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTaskClick}
            style={{ marginBottom: '20px' }}
          >
            Add Task
          </Button>
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            <Grid item xs={4}>
              <TextField
                name="title"
                label="Filter by Title"
                variant="outlined"
                fullWidth
                value={filters.title}
                onChange={handleFilterChange}
                InputProps={{
                  endAdornment: filters.title && (
                    <IconButton onClick={() => setFilters({ ...filters, title: '' })}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="status"
                label="Filter by Status"
                variant="outlined"
                fullWidth
                select
                value={filters.status}
                onChange={handleFilterChange}
                InputProps={{
                  endAdornment: filters.status && (
                    <IconButton onClick={() => setFilters({ ...filters, status: '' })}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dueDate"
                label="Filter by Due Date"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.dueDate}
                onChange={handleFilterChange}
                InputProps={{
                  endAdornment: filters.dueDate && (
                    <IconButton onClick={() => setFilters({ ...filters, dueDate: '' })}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            style={{ marginBottom: '20px' }}
          >
            Reset Filters
          </Button>
          <TaskTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask} 
          />
          <Pagination
            count={lastPage}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px' }}
          />
        </>
      )}
    </Container>
  );
};

export default TaskDashboard;
