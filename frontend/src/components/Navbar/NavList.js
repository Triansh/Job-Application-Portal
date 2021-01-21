import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from '../../utils/utils';

const NavItem = ({ path, Icon, label, ...rest }) => {
  return (
    <ListItem button to={path} component={Link}>
      <ListItemIcon>
        <IconButton {...rest}>
          <Icon />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

const NavList = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);

  if (role === 'Applicant')
    return (
      <>
        <NavItem path="/profile" Icon={PermIdentityIcon} label="My Profile" />
        <NavItem path="/" Icon={WorkOutlineOutlinedIcon} label="Job Listings" />
        <NavItem path="/applications" Icon={ReceiptOutlinedIcon} label="My Applications" />
        <Divider />
        <NavItem path="/" Icon={ExitToAppIcon} label="Sign Out" onClick={() => logout(dispatch, false)} />
      </>
    );
  else if (role === 'Recruiter')
    return (
      <>
        <NavItem path="/profile" Icon={PermIdentityIcon} label="My Profile" />
        <NavItem path="/" Icon={WorkOutlineOutlinedIcon} label="My Active Jobs" />
        <NavItem path="/employees" Icon={GroupAddOutlinedIcon} label="My Employees" />
        <Divider />
        <NavItem path="/" Icon={ExitToAppIcon} label="Sign Out" onClick={() => logout(dispatch, false)} />
      </>
    );
  return <></>;
};

export default NavList;
