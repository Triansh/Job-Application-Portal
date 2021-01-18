import React from 'react';
import { Button as Btn, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

const Button = ({ text, size, color, variant, onClick, ...rest }) => {
  const classes = useStyles();

  return (
    <Btn variant={variant || 'contained'} size={size || 'large'} color={color || 'default'} onClick={onClick} {...rest} classes={{ root: classes.root, label: classes.label }}>
      {text}
    </Btn>
  );
};

export default Button;
