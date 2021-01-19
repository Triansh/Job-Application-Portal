import { Grid, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateJob } from '../../../api/jobRequests';
import { setStatus } from '../../../features/statusSlice';
import Button from '../../Controls/Button';
import { DateTimeInput, PlainInput } from '../../Controls/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

const UpdateJobForm = ({ jobToEdit, fetchAgain, setFetchAgain, setOpenPopup }) => {
  const [job, setJob] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setJob({ ...job, [name]: value });
  };

  useEffect(() => {
    setJob({ ...jobToEdit });
  }, [jobToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(job, job._id);
      setOpenPopup(false);
      history.push('/');
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Job Updated successfully' }));
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      dispatch(setStatus({ status: 'error', message }));
    }
  };

  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PlainInput label="Maximum Applications" name="applications" value={job.applications} onChange={handleChange} />
          <DateTimeInput label="Deadline" name="deadline" value={job.deadline} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <PlainInput label="Maximum Positions" name="positions" value={job.positions} onChange={handleChange} />
          <div style={{ marginTop: '1rem' }}>
            <Button color="primary" type="submit" text="Update Now" onClick={handleSubmit} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateJobForm;
