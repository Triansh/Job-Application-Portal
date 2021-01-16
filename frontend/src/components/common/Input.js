import React from 'react';

import { Grid, TextField } from '@material-ui/core';

// const height = 70;

export const TextInput = ({ type, id, label, name, autoComplete, value, onChange }) => {
  return (
    <Grid item xs={12} >
      <TextField variant="outlined" fullWidth id={id} label={label} type={type || 'text'} name={name} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e)} />
    </Grid>
  );
};

export const TextArea = ({ rows, id, label, name, autoComplete, value, onChange }) => {
  return (
    <Grid item xs={12}>
      <TextField multiline rows={rows} variant="outlined" fullWidth id={id} label={label} name={name} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e)} />
    </Grid>
  );
};

export default TextInput;
