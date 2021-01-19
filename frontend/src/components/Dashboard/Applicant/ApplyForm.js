import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createApplication, updateJob } from '../../../api/jobRequests';
import { setStatus } from '../../../features/statusSlice';
import Button from '../../Controls/Button';
import { DateTimeInput, PlainInput, TextArea } from '../../Controls/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

const ApplyForm = ({ jobToApply, fetchAgain, setFetchAgain, setOpenPopup }) => {
  const [sop, setSop] = useState({ sop: '' });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSop({ ...sop, [name]: value });
  };

  useEffect(() => {
    console.log(jobToApply);
    setSop({ ...sop, id: jobToApply._id });
  }, [jobToApply]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApplication(sop, sop.id);
      setOpenPopup(false);
      history.push('/');
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Application created successfully' }));
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
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Please enter a Statement of Purpose (SOP) to apply
          </Typography>
          <TextArea rows={7} label="SOP" name="sop" value={sop.sop} onChange={handleChange} />
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <div style={{ marginTop: '1rem' }}>
            <Button color="primary" type="submit" text="Apply Now" onClick={handleSubmit} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default ApplyForm;
