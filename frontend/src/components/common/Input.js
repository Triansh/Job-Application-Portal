import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';

export const TextInput = ({ sm, type, id, label, name, autoComplete, value, onChange }) => {
  return (
    <Grid item xs={12} sm={sm || 12}>
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

export const DateTimeInput = ({ sm, label, id, name, value, onChange }) => {
  return (
    <Grid item xs={12} sm={sm || 12}>
      <TextField variant="outlined" fullWidth id={id} label={label} name={name} type="datetime-local" value={value} InputLabelProps={{ shrink: true }} onChange={(e) => onChange(e)} />
    </Grid>
  );
};

export default TextInput;
