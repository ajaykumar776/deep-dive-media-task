import React from 'react';
import { TableBody, TableRow, TableCell, Button } from '@mui/material';

const TaskTable = ({ tasks, onEdit, onDelete }) => {

  // Function to get the status text and color
  const getStatusStyle = (status) => {
    switch (status) {
      case 'in_progress':
        return { text: 'In Progress', color: 'orange' };
      case 'completed':
        return { text: 'COMPLETED', color: 'green' };
      case 'pending':
        return { text: 'Pending', color: 'yellow' };
      default:
        return { text: status, color: 'black' }; // Fallback for unexpected status values
    }
  };

  return (
    <TableBody>
      {tasks.map((task) => {
        const { text: statusText, color: statusColor } = getStatusStyle(task.status);

        return (
          <TableRow key={task.id}> 
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell style={{ color: statusColor, fontWeight: 'bold' }}>
              {statusText}
            </TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(task)}>Edit</Button>
              <Button onClick={() => onDelete(task.id)} color="secondary">Delete</Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TaskTable;
