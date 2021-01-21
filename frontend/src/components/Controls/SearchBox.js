import { InputAdornment, TextField } from '@material-ui/core';

import { Search } from '@material-ui/icons';

const SearchBox = ({ onChange, label, value, name, ...rest }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBox;
