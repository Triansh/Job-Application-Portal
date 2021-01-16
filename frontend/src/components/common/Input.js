import React from 'react';

import { Grid, TextField } from '@material-ui/core';

export const Input = ({ type, id, label, name, autoComplete, value, onChange }) => {
  return (
    <Grid item xs={12}>
      <TextField variant="outlined" required fullWidth id={id} label={label} type={type || 'text'} name={name} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e)} />
    </Grid>
  );
};
export default Input;
