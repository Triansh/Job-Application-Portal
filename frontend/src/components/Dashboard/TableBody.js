import React from 'react';
import { TableBody as TBody, TableRow, TableCell } from '@material-ui/core';

import ActionIcons from './ActionIcons';

const TableBody = ({ items }) => {
  return (
    <TBody>
      {items.map((item) => (
        <TableRow key={item._id}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.recruiter.name}</TableCell>
          <TableCell>{item.salary}</TableCell>
          <TableCell>{item.duration}</TableCell>
          <TableCell>{new Date(item.deadline).toDateString()}</TableCell>
          <TableCell>{item.avgRating}</TableCell>
          <TableCell>
            <ActionIcons item={item} />
          </TableCell>
        </TableRow>
      ))}
    </TBody>
  );
};

export default TableBody;
