import React from 'react';

import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const RatingStars = ({ value, ...rest }) => {
  return (
    <>
      <Rating precision={0.5} value={value}  {...rest} />
      <Typography style={{ color: '#989898' }} variant="body2">
        ( {value} )
      </Typography>
    </>
  );
};

export default RatingStars;
