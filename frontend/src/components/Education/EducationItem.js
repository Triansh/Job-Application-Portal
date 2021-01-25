import React from 'react';
import { Card, Grid, TextField, CardContent, IconButton, CardHeader } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const EducationItem = ({ edu, setEdu, index }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newList = [...edu];
    let newItem = { ...newList[index], [name]: value };
    newList[index] = newItem;
    setEdu(newList);
  };

  const deleteItem = () => {
    let newList = [...edu];
    newList.splice(index, 1);
    setEdu(newList);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          disableTypography={true}
          title={<TextField fullWidth label="Name of Institution" name="institution" onChange={(e) => handleChange(e)} value={edu[index].institution} />}
          onChange={(e) => handleChange(e)}
          action={
            <IconButton color="secondary" onClick={(e) => deleteItem(index)}>
              <DeleteIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Start Year" name="startYear" onChange={(e) => handleChange(e)} value={edu[index].startYear} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="End Year" name="endYear" onChange={(e) => handleChange(e)} value={edu[index].endYear} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EducationItem;
