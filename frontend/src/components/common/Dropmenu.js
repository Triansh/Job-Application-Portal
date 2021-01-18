import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const Dropmenu = ({ onChange, value, name, options, label }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {options.map(({ label, value }, id) => (
          <MenuItem key={id} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropmenu;
