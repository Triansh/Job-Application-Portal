import React from 'react';
import { ApplyNowButton, FullButton, AcceptButton, RejectButton, AppliedButton, ShortListButton } from './StatusButtons';

const JobStatusButtons = ({ job, onClick }) => {
  const { status } = job;

  if (status === 'Full') return <FullButton />;

  const exist = job.allApplications;
  if (!exist || !exist.length) return <ApplyNowButton onClick={onClick} />;
  else if (exist[0].status === 'Accepted') return <AcceptButton disabled text="Accepted" />;
  else if (exist[0].status === 'Rejected') return <RejectButton disabled text="Rejected" />;
  else if (exist[0].status === 'Shortlisted') return <ShortListButton disabled text="Shortlisted" />;
  else return <AppliedButton disabled />;
};

export default JobStatusButtons;
