import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Grid, Container, Button, Typography, CssBaseline } from '@material-ui/core';

import avatarImg from '../../assets/avatar.svg';

import { getUserData, updateUser } from '../../api/userRequests';
import { setStatus } from '../../features/statusSlice';

import TextInput from '../Controls/Input';
import Navbar from '../Navbar/Navbar';
import ExtraFields from './ExtraFields';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ name: '', role: 'Applicant', bio: '', contact: '', skills: [], skillText: '' });
  const [edu, setEdu] = useState([]);

  const userSkills = useRef([]);

  useEffect(() => {
    (async () => {
      const {
        data: {
          data: { data },
        },
      } = await getUserData();
      setUser({ ...user, ...data });
      if (data.education) setEdu(data.education);
      if (data.skills) userSkills.current = data.skills;
    })();
  }, [userSkills]);

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
      const { data } = await updateUser({ ...user, skills: allSkills, education: edu });
      console.log(data);
      history.push('/');
      dispatch(setStatus({ status: 'success', message: 'Update successful' }));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(setStatus({ status: 'error', message }));
    }
  };

  return (
    <Navbar id={2}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.large} src={avatarImg} />
          <Typography component="h1" variant="h5">
            Update Your Profile
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <TextInput id="fullName" label="Full Name" name="name" autoComplete="fname" value={user.name} onChange={handleChange} />
              <ExtraFields userSkills={userSkills.current} user={user} edu={edu} setEdu={setEdu} handleChange={handleChange} />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(e) => handleSubmit(e)}>
              Update
            </Button>
          </form>
        </div>
      </Container>
    </Navbar>
  );
};
export default Profile;
