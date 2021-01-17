import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Avatar, Box, Grid, Link, Container, Button, Typography, CssBaseline } from '@material-ui/core';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import useStyles from './styles';

import { createJob } from '../../api/jobRequests';
import { setStatus } from '../../features/statusSlice';

import { DateTimeInput, TextInput } from '../common/Input';
import MultiSelect from '../common/MultiSelect';
import Dropmenu from '../common/Dropmenu';
import { skills } from '../../utils/skills';

const JobForm = () => {
  const classes = useStyles();

  const [job, setJob] = useState({ title: '', applications: '', positions: '', deadline: '', skills: [], skillText: '', type: 'full-time', duration: 6, salary: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moreSkills = job.skillText
      .split(',')
      .map((skill) => skill.trim())
      .filter((s) => s);

    const allSkills = [...new Set([...job.skills, ...moreSkills])];

    try {
      await createJob({ ...job, skills: allSkills });
      history.push('/');
      dispatch(setStatus({ status: 'success', message: 'Job created successfully' }));
    } catch (error) {
        const { message } = error.response.data;
        dispatch(setStatus({ status: 'error', message }));
    }
  };

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full time' },
    { value: 'part-time', label: 'Part time' },
    { value: 'work-from-home', label: 'Work from Home' },
  ];
  const durationOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalMallOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a New Job
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <TextInput id="title" label="Job title" name="title" autoComplete="title" value={job.tite} onChange={handleChange} />
            <TextInput sm={6} id="applications" label="Maximum Applications" name="applications" type="applications" autoComplete="applications" value={job.applications} onChange={handleChange} />
            <TextInput sm={6} id="positions" label="Maximum Positions" name="positions" type="positions" autoComplete="positions" value={job.positions} onChange={handleChange} />
            <DateTimeInput id="deadline" label="Deadline for Applications" name="deadline" type="deadline" autoComplete="deadline" value={job.deadline} onChange={handleChange} />
            <Dropmenu sm={6} id="type" label="Type of Job" name="type" value={job.type} onChange={handleChange} options={jobTypeOptions} />
            <Dropmenu sm={6} id="duration" label="Duration" name="duration" value={job.duration} onChange={handleChange} options={durationOptions} />
            <TextInput  id="salary" label="Salary" name="salary" type="salary" autoComplete="salary" value={job.salary} onChange={handleChange} />
            <MultiSelect id="skills" label="Skills" name="skills" value={job.skills} onChange={handleChange} options={skills} />
            <TextInput id="skillText" label="Add more Skills" name="skillText" value={job.skillText} onChange={handleChange} />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(e) => handleSubmit(e)}>
            create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default JobForm;
