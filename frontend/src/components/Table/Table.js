import React from 'react';

import { Table as Tb, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#6CB4EE',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

const Table = ({ children }) => {
  const classes = useStyles();
  return <Tb className={classes.table}>{children}</Tb>;
};

export default Table;
