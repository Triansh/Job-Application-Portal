import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const DisplayEducation = ({ educationList }) => {
  return (
    <Grid container spacing={1}>
      {educationList.map(({ institution, startYear, endYear, _id }) => {
        return (
          <Grid item xs={12} key={_id}>
            <Typography variant="body2">
              <strong>Institution: </strong> {institution}
            </Typography>
            <Typography variant="body2">
              <strong>Period: </strong> {startYear} - {endYear ? endYear : 'Present'}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
  
};
export default DisplayEducation;
