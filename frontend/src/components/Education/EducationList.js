import React from 'react';
import { Card, Grid, CardContent, IconButton, CardHeader } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import EducationItem from '../Education/EducationItem';

const EducationList = ({ edu, setEdu }) => {
  const AddItem = () => {
    setEdu([...edu, { institution: '', startYear: '', endYear: '' }]);
  };

  return (
    <Card>
      <CardHeader
        action={
          <IconButton color="primary" onClick={AddItem}>
            <AddIcon />
          </IconButton>
        }
        subheader="Education"
      />
      <CardContent>
        <Grid container spacing={2}>
          {edu.map((item, index) => (
            <EducationItem key={index} edu={edu} setEdu={setEdu} index={index} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
export default EducationList;
