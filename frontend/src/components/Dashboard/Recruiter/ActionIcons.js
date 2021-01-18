import React from 'react';

import { IconButton } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ActionIcons = ({ handleUpdate, handleDelete, id }) => {
  return (
    <>
      <IconButton onClick={() => handleUpdate(id)}>
        <CreateIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete(id)}>
        <DeleteForeverIcon />
      </IconButton>
    </>
  );
};

export default ActionIcons;
