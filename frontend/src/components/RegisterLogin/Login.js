import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Button, Typography, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { loginUser, setHeaders } from '../../api/userRequests';

import { sendError, signIn } from '../../utils/utils';

import { PlainInput } from '../Controls/Input';

import useStyles from './styles';
import Copyright from './Copyright';

export default function SignIn() {
  const classes = useStyles();

  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(user);
      const { token, status } = data;
      if (status === 'success') setHeaders(token);
      signIn(dispatch, data.user.role, 'You are successfully Logged In');
      history.push('/');
    } catch (error) {
      sendError(dispatch, error);
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PlainInput fullWidth label="Email Address" name="email" type="email" value={user.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <PlainInput fullWidth label="Password" name="password" type="password" value={user.password} onChange={handleChange} />
            </Grid>
          </Grid>
          <Button type="submit" onClick={(e) => handleSubmit(e)} fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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
