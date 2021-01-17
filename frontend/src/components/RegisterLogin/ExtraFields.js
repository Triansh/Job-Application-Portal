import React from 'react';
import { skills } from '../../utils/skills';

import { TextInput, TextArea } from '../common/Input';
import MultiSelect from '../common/MultiSelect';
import EducationList from './EducationList';

const ExtraFields = ({ user, handleChange, edu, setEdu, userSkills }) => {

  let options = [...skills];
  if (userSkills) options = [...new Set([...skills, ...userSkills])];

  if (user.role === 'Recruiter')
    return (
      <>
        <TextInput id="contact" label="Contact Number" name="contact" value={user.contact} onChange={handleChange} />
        <TextArea id="bio" rows={6} label="Bio" name="bio" value={user.bio} onChange={handleChange} />
      </>
    );
  else if (user.role === 'Applicant')
    return (
      <>
        <MultiSelect id="skills" label="Skills" name="skills" value={user.skills} onChange={handleChange} options={options} />
        <TextInput id="skillText" label="Add more Skills" name="skillText" value={user.skillText} onChange={handleChange} />
        <EducationList edu={edu} setEdu={setEdu} />
      </>
    );
  else return <></>;
};

export default ExtraFields;
