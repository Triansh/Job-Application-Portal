import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

const NavItem = ({ path, Icon, label }) => {
  return (
    <ListItem button to={path} component={Link}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

const NavList = () => {
  const role = useSelector((state) => state.role);

  if (role === 'Applicant')
    return (
      <>
        <NavItem path="/profile" Icon={PermIdentityIcon} label="My Profile" />
        <NavItem path="/" Icon={WorkOutlineOutlinedIcon} label="Job Listings" />
        <NavItem path="/applications" Icon={ReceiptOutlinedIcon} label="My Applications" />
      </>
    );
  else if (role === 'Recruiter')
    return (
      <>
        <NavItem path="/profile" Icon={PermIdentityIcon} label="My Profile" />
        <NavItem path="/add" Icon={NoteAddOutlinedIcon} label="Create a Job" />
        <NavItem path="/" Icon={WorkOutlineOutlinedIcon} label="My Active Jobs" />
        <NavItem path="/applications" Icon={GroupAddOutlinedIcon} label="My Employees" />
      </>
    );
  return <></>;
};

export default NavList;
