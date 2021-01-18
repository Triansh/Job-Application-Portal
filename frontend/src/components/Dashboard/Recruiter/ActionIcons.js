import React from 'react';

import { IconButton } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { deleteJob } from '../../../api/jobRequests';
import { useHistory } from 'react-router';
import { setStatus } from '../../../features/statusSlice';
import { useDispatch } from 'react-redux';

const ActionIcons = ({ id, confirmDialog, setConfirmDialog, setFetchAgain, fetchAgain }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onDelete = async (idx) => {
    try {
      await deleteJob(idx);
      setConfirmDialog({ ...confirmDialog, isOpen: false });
      history.push('/');
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Job deleted successfully' }));
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      dispatch(setStatus({ status: 'error', message }));
    }
  };

  return (
    <>
      <IconButton>
        <CreateIcon />
      </IconButton>
      <IconButton onClick={() => setConfirmDialog({ isOpen: true, onConfirm: () => onDelete(id) })}>
        <DeleteForeverIcon />
      </IconButton>
    </>
  );
};

export default ActionIcons;
