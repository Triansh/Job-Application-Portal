import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Button, Typography, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { registerUser, setHeaders } from '../../api/userRequests';

import { sendError, signIn } from '../../utils/utils';

import { PlainInput } from '../Controls/Input';
import Dropmenu from '../Controls/Dropmenu';

import useStyles from './styles';
import Copyright from './Copyright';
import ExtraFields from './ExtraFields';

export default function SignUp() {
  const classes = useStyles();

  const [user, setUser] = useState({ name: '', email: '', password: '', role: 'Applicant', bio: '', contact: '', skills: [], skillText: '' });
  const [edu, setEdu] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moreSkills = user.skillText
      .split(',')
      .map((skill) => skill.trim())
      .filter((s) => s);

    const allSkills = [...new Set([...user.skills, ...moreSkills])];

    try {
      const { data } = await registerUser({ ...user, skills: allSkills, education: edu });
      const { token, status } = data;
      if (status === 'success') setHeaders(token);
      signIn(dispatch, data.user.role, 'You have successfully registered');
      history.push('/');
    } catch (error) {
      sendError(dispatch, error);
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
            <Grid item xs={12}>
              <PlainInput fullWidth label="Full Name" name="name" value={user.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <PlainInput fullWidth label="Email Address" name="email" type="email" value={user.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <PlainInput fullWidth label="Password" name="password" type="password" value={user.password} onChange={handleChange} />
            </Grid>
            <Grid item xs>
              <Dropmenu id="role" label="Role" name="role" value={user.role} onChange={handleChange} options={roleOptions} />
            </Grid>
            <ExtraFields user={user} edu={edu} setEdu={setEdu} handleChange={handleChange} />
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
