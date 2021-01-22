import React from 'react';

import { Typography } from '@material-ui/core';

const Copyright = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '} &nbsp;
        {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Triansh Sharma
      </Typography>
    </div>
  );
};

export default Copyright;
