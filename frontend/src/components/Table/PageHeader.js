import React from 'react';

import { Paper, makeStyles, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Button from '../Controls/Button';
import SearchBox from '../Controls/SearchBox';
import FilterBox from '../Dashboard/Applicant/FilterBox';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    right: '10px',
  },
}));

const PageHeader = ({ filter, setFilter, setSearchTerm, setOpenPopup, children, value, btnDisable, onFilterClick, ...rest }) => {
  const classes = useStyles();

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar className={btnDisable ? '' : classes.toolbar}>
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

          {filter ? <FilterBox filter={filter} setFilter={setFilter} onFilterClick={onFilterClick} {...rest} /> : <></>}
        </Toolbar>
        {children}
      </Paper>
    </>
  );
};

export default PageHeader;
