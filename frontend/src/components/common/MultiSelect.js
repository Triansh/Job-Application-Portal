import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Input, InputLabel, MenuItem, FormControl, Select, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      border: theme.spacing(10)
    },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (skill, skillName, theme) => {
  return {
    fontWeight: skillName.indexOf(skill) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
};

const MultiSelect = ({ onChange, value, name, id, options, label }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
          <InputLabel variant="outlined" id="demo-mutiple-chip-label">{label}</InputLabel>
          <Select
            labelId={label}
            id={id}
            multiple
            name={name}
            value={value}
            onChange={(e) => onChange(e)}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {options.map((skill) => (
              <MenuItem key={skill} value={skill} style={getStyles(skill, value, theme)}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
  );
};

export default MultiSelect;
