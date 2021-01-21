import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setStatus } from '../../features/statusSlice';

import { sendError } from '../../utils/utils';

import Button from '../Controls/Button';
import RatingStars from '../Controls/RatingStars';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));
const RateForm = ({ link, itemToRate, fetchAgain, setFetchAgain, setOpenPopup, submitFn, itemName }) => {
  const [rating, setRating] = useState({ rating: 4 });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setRating({ ...rating, id: itemToRate._id });
  }, [itemToRate]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRating({ ...rating, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFn(rating, rating.id);
      setOpenPopup(false);
      history.push(link);
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: `You have successfully rated for this ${itemName}` }));
    } catch (error) {
      sendError(dispatch, error);
    }
  };

  const classes = useStyles();

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.root}>
            <RatingStars name="rating" value={rating.rating} onChange={handleChange} size="large" />
          </div>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button color="primary" type="submit" text="Rate Now" onClick={handleSubmit} />
        </Grid>
      </Grid>
    </form>
  );
};
export default RateForm;
