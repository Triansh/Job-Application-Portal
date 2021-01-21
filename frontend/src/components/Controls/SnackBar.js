import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import { setStatus } from '../../features/statusSlice';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  useEffect(() => {
    if (status.status) {
      setOpen(true);
    }
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(setStatus({ status: '', message: '' }));
  };

  const classes = useStyles();

  return status.status ? (
    <div className={classes.root}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.status}>
          {status.message}
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <></>
  );
}
