import React from 'react';

import { Select, InputLabel, FormControl, Grid } from '@material-ui/core';

const Dropmenu = ({ onChange, value, name, id, options, label }) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
        <Select native required value={value} onChange={(e) => onChange(e)} label={label} inputProps={{ name, id }}>
          {options.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default Dropmenu;
