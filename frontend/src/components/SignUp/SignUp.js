import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Checkbox, Button, Typography, CssBaseline, TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { registerUser, setHeaders } from '../../api/userRequests';
import { setStatus } from '../../features/statusSlice';
import { setRole } from '../../features/roleSlice';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

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
      console.log(data);
      const { token, status } = data;
      if (status === 'success') setHeaders(token);
      dispatch(setRole({ role: data.user.role }));
      dispatch(setStatus({ status, message: 'Registration successful' }));
      history.push('/');
    } catch (error) {
      dispatch(setStatus({ status: 'error', message: 'This is an error.' }));
    }
  };

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
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="fullName" label="Full Name" name="name" autoComplete="fname" value={user.name} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={user.email} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={user.password} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
                <Select native required value={user.role} onChange={(e) => handleChange(e)} label="Role" inputProps={{ name: 'role', id: 'role' }}>
                  <option aria-label="None" value="" />
                  <option value="Applicant">Applicant</option>
                  <option value="Recruiter">Recruiter</option>
                </Select>
              </FormControl>
            </Grid>
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
