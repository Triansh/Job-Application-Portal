import React from 'react';

import { Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

export const TextArea = ({ rows, label, name, value, onChange, ...rest }) => {
  return <TextField multiline rows={rows} variant="outlined" fullWidth label={label} name={name} value={value} onChange={(e) => onChange(e)} {...rest} />;
};

export const DateTimeInput = ({ sm, label, id, name, value, onChange }) => {
  return (
    <Grid item xs={12} sm={sm || 12}>
      <TextField variant="outlined" fullWidth id={id} label={label} name={name} type="datetime-local" value={value} InputLabelProps={{ shrink: true }} onChange={(e) => onChange(e)} />
    </Grid>
  );
};

export const TextInputWithIcon = ({ id, label, value, onChange }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        labelWidth={92}
      />
    </FormControl>
  );
};

export const PlainInput = ({ name, label, value, onChange, ...rest }) => {
  return <TextField variant="outlined" label={label} name={name} value={value} onChange={onChange} {...rest} />;
};
