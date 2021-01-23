import React from 'react';
import { ApplyNowButton, FullButton, AppliedButton } from './StatusButtons';

const JobStatusButtons = ({ job, onClick }) => {
  const { status } = job;

  if (status === 'Full') return <FullButton />;

  const exist = job.allApplications;
  if (!exist || !exist.length) return <ApplyNowButton onClick={onClick} />;
  else return <AppliedButton disabled />;
};

export default JobStatusButtons;
