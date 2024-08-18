import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button, Box } from '@mui/material';

const TaskTable = ({ tasks = [], onEdit, onDelete }) => {
  console.log('Tasks:', tasks); // Debugging line

  const columns = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Due Date', accessor: 'due_date' },
      { Header: 'Priority', accessor: 'priority' },
      { Header: 'Actions', Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="primary" onClick={() => onEdit(row.original)}>Edit</Button>
          <Button variant="contained" color="secondary" onClick={() => onDelete(row.original.id)}>Delete</Button>
        </Box>
      )}
    ],
    [onEdit, onDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    { columns, data: tasks },
    useSortBy
  );

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
