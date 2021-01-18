import React from 'react';
import { TableHead as THead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const TableHead = ({ heads, sortBy, setSortBy }) => {
  const handleSort = (id) => {
    const checkAsc = sortBy.term === id && sortBy.order === 'asc';
    setSortBy({ term: id, order: checkAsc ? 'desc' : 'asc' });
  };

  return (
    <THead>
      <TableRow>
        {heads.map((headCell, id) => (
          <TableCell key={id} align="center" sortDirection={sortBy.term === headCell.id ? sortBy.order : false}>
            <TableSortLabel active={sortBy.term === headCell.id} direction={sortBy.term === headCell.id ? sortBy.order : 'asc'} onClick={() => handleSort(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </THead>
  );
};

export default TableHead;
