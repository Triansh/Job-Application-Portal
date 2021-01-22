import React from 'react';

import { Grid } from '@material-ui/core';

import { skills } from '../../utils/skills';

import EducationList from '../Education/EducationList';

import { TextArea, PlainInput } from '../Controls/Input';
import MultiSelect from '../Controls/MultiSelect';

const ExtraFields = ({ user, handleChange, edu, setEdu, userSkills }) => {
  let options = [...skills];
  if (userSkills) options = [...new Set([...skills, ...userSkills])];

  if (user.role === 'Recruiter')
    return (
      <>
        <Grid item xs={12}>
          <PlainInput fullWidth label="Contact Number" name="contact" value={user.contact} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextArea fullWidth rows={6} label="Bio" name="bio" value={user.bio} onChange={handleChange} />
        </Grid>
      </>
    );
  else if (user.role === 'Applicant')
    return (
      <>
        <Grid item xs={12}>
          <MultiSelect fullWidth label="Skills" name="skills" value={user.skills} onChange={handleChange} options={options} />
        </Grid>
        <Grid item xs={12}>
          <PlainInput fullWidth label="Add more Skills" name="skillText" value={user.skillText} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <EducationList edu={edu} setEdu={setEdu} />
        </Grid>
      </>
    );
  else return <></>;
};

export default ExtraFields;
