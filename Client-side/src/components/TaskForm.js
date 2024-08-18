import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    if (task) {
      console.log('Received task for editing:', task); // Debugging line
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.due_date ?? ''); // Handle date parsing
      setStatus(task.status || 'pending');
      setPriority(task.priority || '1');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: task ? task.id : null, title, description, dueDate, status, priority });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Status"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Priority"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {task ? 'Update Task' : 'Create Task'}
          </Button>
          <Button 
            type="button" 
            variant="outlined" 
            color="secondary" 
            onClick={onCancel}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
