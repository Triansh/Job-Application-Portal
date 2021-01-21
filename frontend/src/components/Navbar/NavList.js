import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { signOut } from '../../utils/utils';

const NavItem = ({ path, Icon, label, ...rest }) => {
  return (
    <ListItem {...rest} button to={path} component={Link}>
      <ListItemIcon>
        <Icon />
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
        <NavItem path="/" Icon={ExitToAppIcon} label="Sign Out" onClick={() => signOut(dispatch)} />
      </>
    );
  else if (role === 'Recruiter')
    return (
      <>
        <NavItem path="/profile" Icon={PermIdentityIcon} label="My Profile" />
        <NavItem path="/" Icon={WorkOutlineOutlinedIcon} label="My Active Jobs" />
        <NavItem path="/employees" Icon={GroupAddOutlinedIcon} label="My Employees" />
        <Divider />
        <NavItem path="/" Icon={ExitToAppIcon} label="Sign Out" onClick={() => signOut(dispatch)} />
      </>
    );
  return <></>;
};

export default NavList;
