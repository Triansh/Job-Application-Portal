import React from 'react';
import { Card, Grid, CardContent, CardActionArea, IconButton, CardHeader } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import EducationItem from './EducationItem';

const EducationList = ({ edu, setEdu }) => {
  const AddItem = () => {
    setEdu([...edu, { institution: '', startYear: '', endYear: '' }]);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={AddItem}>
              <AddIcon />
            </IconButton>
          }
          subheader="Education"
        />
        <CardActionArea>
          <CardContent>
            <Grid container spacing={2}>
              {edu.map((item, index) => (
                <EducationItem key={index} edu={edu} setEdu={setEdu} index={index} />
              ))}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default EducationList;
