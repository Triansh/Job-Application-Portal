import React from 'react';

import { Paper, makeStyles, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Button from '../common/Button';
import SearchBox from '../common/SearchBox';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  button: {
    position: 'absolute',
    right: '10px',
  },
}));

const PageHeader = ({ handleSearch, setOpenPopup, children, value, btnDisable, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <SearchBox label="Search Jobs" onChange={handleSearch} value={value} {...rest} className={classes.searchInput} />

          {!btnDisable ? (
            <Button
              text="Add New"
              color="primary"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.button}
              onClick={() => {
                setOpenPopup(true);
              }}
            />
          ) : (
            <></>
          )}
        </Toolbar>
        {children}
      </Paper>
    </>
  );
};

export default PageHeader;
