import React from 'react';

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const RadioButtons = ({ value, label, onChange, name, options, ...rest }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup  name={name} value={value} onChange={(e) => onChange(e)} {...rest}>
        {options.map((item, id) => (
          <FormControlLabel key={id} value={item.value} control={<Radio />} label={item.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
