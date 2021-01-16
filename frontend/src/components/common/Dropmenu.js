import React from 'react';

import { Select, InputLabel, FormControl, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const Dropmenu = ({ onChange, value, name, id, options, label }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
        <Select native required value={value} onChange={(e) => onChange(e)} label={label} inputProps={{ name, id }}>
          <option aria-label="None" value="" />

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
