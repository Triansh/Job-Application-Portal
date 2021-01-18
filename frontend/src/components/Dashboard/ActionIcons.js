import React from 'react';
import { useSelector } from 'react-redux';

import { IconButton } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import Button from '../common/Button';

const ActionIcons = ({ item }) => {
  const role = useSelector((state) => state.role);

  if (role === 'Recruiter')
    return (
      <>
        <IconButton>
          <CreateIcon />
        </IconButton>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
      </>
    );
  else if (role === 'Applicant') {
    const exist = item.allApplications;
    console.log(item);
    if (!exist.length) return <Button style={{ border: '2px solid #1F75FE', borderRadius: '50px', color: '	#0000CD' }} text="Apply Now" size="medium" variant="outlined" startIcon={<ErrorOutlineIcon />} />;
    else if (exist[0].status === 'Accepted') return <Button style={{ border: '2px solid #50C878', borderRadius: '50px', color: '#008080' }} text="Accepted" size="medium" variant="outlined" startIcon={<CheckIcon />} />;
    else if (exist[0].status === 'Rejected') return <Button style={{ border: '2px solid #ED2939', borderRadius: '50px', color: '#960018' }} text="Rejected" size="medium" variant="outlined" startIcon={<CloseIcon />} />;
    else return <Button style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#DAA520' }} text={exist.status} size="medium" variant="outlined" startIcon={<LoopIcon />} />;
  } else return <></>;
};

export default ActionIcons;
