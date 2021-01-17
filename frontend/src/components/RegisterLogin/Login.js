import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Button, Typography, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { setStatus } from '../../features/statusSlice';
import { setRole } from '../../features/roleSlice';
import { loginUser, setHeaders } from '../../api/userRequests';

import Input from '../common/Input';
import useStyles from './styles';
import Copyright from './Copyright';
import { saveError } from '../../utils/utils';

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
      if (status === 'success')
       setHeaders(token);
      history.push('/');
      dispatch(setRole({ role: data.user.role }));
      dispatch(setStatus({ status, message: 'Login successful' }));
    } catch (error) {
      saveError(error, dispatch);
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
            <Input id="email" label="Email Address" name="email" type="email" autoComplete="email" autoFocus value={user.email} onChange={handleChange} />
            <Input id="password" label="Password" name="password" type="password" autoComplete="current-password" value={user.password} onChange={handleChange} />
          </Grid>
          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
          <Button type="submit" onClick={(e) => handleSubmit(e)} fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
