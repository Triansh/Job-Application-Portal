import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Checkbox, Button, Typography, CssBaseline, TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { registerUser, setHeaders } from '../../api/userRequests';
import { setStatus } from '../../features/statusSlice';
import { setRole } from '../../features/roleSlice';

import Input from '../common/Input';
import Dropmenu from '../common/Dropmenu';
import useStyles from './styles';
import Copyright from './Copyright';

export default function SignUp() {
  const classes = useStyles();

  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser(user);
      const { token, status } = data;
      if (status === 'success') setHeaders(token);
      dispatch(setRole({ role: data.user.role }));
      dispatch(setStatus({ status, message: 'Registration successful' }));
      history.push('/');
    } catch (error) {
      dispatch(setStatus({ status: 'error', message: 'This is an error.' }));
    }
  };

  const roleOptions = [
    { value: 'Recruiter', label: 'Recruiter' },
    { value: 'Applicant', label: 'Applicant' },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Input id="fullName" label="Full Name" name="name" autoComplete="fname" value={user.name} onChange={handleChange} />
            <Input id="email" label="Email Address" name="email" type="email" autoComplete="email" value={user.email} onChange={(e) => handleChange(e)} />
            <Input id="password" label="Password" name="password" type="password" autoComplete="current-password" value={user.password} onChange={(e) => handleChange(e)} />
            <Dropmenu name="role" id="role" label="Role" value={user.role} onChange={handleChange} options={roleOptions} />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(e) => handleSubmit(e)}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
