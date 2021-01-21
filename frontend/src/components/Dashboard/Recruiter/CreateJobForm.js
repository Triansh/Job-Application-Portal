import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Grid, makeStyles } from '@material-ui/core';
import { createJob } from '../../../api/jobRequests';

import { setStatus } from '../../../features/statusSlice';
import { skills } from '../../../utils/skills';

import Button from '../../Controls/Button';
import Dropmenu from '../../Controls/Dropmenu';
import { DateTimeInput, PlainInput } from '../../Controls/Input';
import MultiSelect from '../../Controls/MultiSelect';
import RadioButtons from '../../Controls/RadioButtons';
import { sendError } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

const NewJobForm = ({ setOpenPopup, fetchAgain, setFetchAgain, ...rest }) => {
  const classes = useStyles();

  const [job, setJob] = useState({ title: '', applications: '', positions: '', deadline: Date.now(), skills: [], skillText: '', type: 'full-time', duration: 6, salary: '' });

  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moreSkills = job.skillText
      .split(',')
      .map((skill) => skill.trim())
      .filter((s) => s);

    const allSkills = [...new Set([...job.skills, ...moreSkills])];

    try {
      await createJob({ ...job, skills: allSkills });
      setOpenPopup(false);
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Job created successfully' }));
    } catch (error) {
      sendError(dispatch, error);
    }
  };

  return (
    <form className={classes.root} autoComplete="off" {...rest} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <PlainInput name="title" label="Title" value={job.title} onChange={handleChange} />
          <PlainInput label="Applications" name="applications" value={job.applications} onChange={handleChange} />
          <PlainInput label="Positions" name="positions" value={job.positions} onChange={handleChange} />
          <Dropmenu name="duration" label="Duration" value={job.duration} onChange={handleChange} options={durationOptions} />
          <PlainInput name="salary" label="Salary" value={job.salary} onChange={handleChange} />
          <DateTimeInput name="deadline" label="Deadline" value={job.deadline} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <RadioButtons name="type" label="Type of Job" value={job.type} onChange={handleChange} options={jobTypeOptions} />
          <MultiSelect label="Skills" name="skills" value={job.skills} onChange={handleChange} options={skills} />
          <PlainInput label="Add more Skills" name="skillText" value={job.skillText} onChange={handleChange} />
          <div style={{ marginTop: '1.5rem' }}>
            <Button color="primary" type="submit" text="Create Now" onClick={handleSubmit} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewJobForm;
