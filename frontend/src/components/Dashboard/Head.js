import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const Head = ({ heads, sortBy, setSortBy }) => {
  const handleSort = (id) => {
    const checkAsc = sortBy.term === id && sortBy.order === 'asc';
    setSortBy({ term: id, order: checkAsc ? 'desc' : 'asc' });
  };

  return (
    <TableHead>
      <TableRow>
        {heads.map((headCell, id) => (
          <TableCell key={id} align="left" sortDirection={sortBy.term === headCell.id ? sortBy.order : false}>
            <TableSortLabel active={sortBy.term === headCell.id} direction={sortBy.term === headCell.id ? sortBy.order : 'asc'} onClick={() => handleSort(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Head;
