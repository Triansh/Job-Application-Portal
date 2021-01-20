import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Button from '../../Controls/Button';
import Dropmenu from '../../Controls/Dropmenu';
import { PlainInput } from '../../Controls/Input';
import RadioButtons from '../../Controls/RadioButtons';

const FilterBox = ({ filter, setFilter, onFilterClick }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    let { type, minSalary, maxSalary, duration } = newFilter;

    let query = '';
    if (type) query = `${query}type=${type}&`;
    if (duration) query = `${query}duration[lt]=${duration}&`;
    if (minSalary) query = `${query}salary[gte]=${minSalary}&`;
    if (maxSalary) query = `${query}salary[lte]=${maxSalary}&`;

    setFilter({ ...newFilter, query });
  };

  const jobTypeOptions = [
    { value: '', label: 'None' },
    { value: 'full-time', label: 'Full time' },
    { value: 'part-time', label: 'Part time' },
    { value: 'work-from-home', label: 'Work from Home' },
  ];

  const durationOptions = [
    { value: '', label: 'None' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
  ];

  return (
    <Container style={{ margin: '3rem 0rem 3rem 4rem' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <RadioButtons row name="type" value={filter.type} label="Type of Job" options={jobTypeOptions} onChange={(e) => handleChange(e)} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Dropmenu name="duration" value={filter.duration} label="Duration" options={durationOptions} onChange={(e) => handleChange(e)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <PlainInput name="minSalary" value={filter.minSalary} label="Minimum salary" onChange={(e) => handleChange(e)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <PlainInput name="maxSalary" value={filter.maxSalary} label="Maximum salary" onChange={(e) => handleChange(e)} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Button color="primary" text="Filter" onClick={onFilterClick} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterBox;
