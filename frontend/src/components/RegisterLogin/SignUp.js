import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Button, Typography, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { registerUser, setHeaders } from '../../api/userRequests';
import { setStatus } from '../../features/statusSlice';
import { setRole } from '../../features/roleSlice';

import { TextInput, TextArea } from '../common/Input';
import Dropmenu from '../common/Dropmenu';
import useStyles from './styles';
import Copyright from './Copyright';
import MultiSelect from '../common/MultiSelect';

import { skills } from '../../utils/skills';
import EducationList from './EducationList';

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

  const addExtraAttr = () => {
    if (user.role === 'Recruiter')
      return (
        <>
          <TextInput id="contact" label="Contact Number" name="contact" value={user.contact} onChange={handleChange} />
          <TextArea id="bio" rows={3} label="Bio" name="bio" value={user.bio} onChange={handleChange} />
        </>
      );
    else if (user.role === 'Applicant')
      return (
        <>
          <MultiSelect id="skills" label="Skills" name="skills" value={user.skills} onChange={handleChange} options={skills} />
          <TextInput id="skillText" label="Add more Skills" name="skillText" value={user.skillText} onChange={handleChange} />
          <EducationList edu={edu} setEdu={setEdu} />
        </>
      );
    else <></>;
  };

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
      dispatch(setRole({ role: data.user.role }));
      dispatch(setStatus({ status, message: 'Registration successful' }));
      history.push('/');
    } catch (error) {
      console.error(error.response.data.message);
      dispatch(setStatus({ status: 'error', message: error.response.data.message}));
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
            <TextInput id="fullName" label="Full Name" name="name" autoComplete="fname" value={user.name} onChange={handleChange} />
            <TextInput id="email" label="Email Address" name="email" type="email" autoComplete="email" value={user.email} onChange={handleChange} />
            <TextInput id="password" label="Password" name="password" type="password" autoComplete="current-password" value={user.password} onChange={handleChange} />
            <Dropmenu id="role" label="Role" name="role" value={user.role} onChange={handleChange} options={roleOptions} />
            {addExtraAttr()}
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
