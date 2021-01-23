import React from 'react';
import { AcceptButton, AppliedButton, RejectButton, ShortListButton } from './StatusButtons';

export const ApplicationStatusButtons = ({ status }) => {
  if (status === 'Accepted') return <AcceptButton disabled text="Accepted" />;
  else if (status === 'Rejected') return <RejectButton disabled text="Rejected" />;
  else if (status === 'Shortlisted') return <ShortListButton disabled text="Shortlisted" />;
  else return <AppliedButton disabled />;
};

export const ApplicationStatusUpdateButtons = ({ status, acceptOnClick, rejectOnClick, shortlistOnClick }) => {
  if (status === 'Shortlisted')
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AcceptButton onClick={acceptOnClick} text="Accept" />
        <RejectButton onClick={rejectOnClick} text="Reject" />
      </div>
    );
  else if (status === 'Applied')
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ShortListButton onClick={shortlistOnClick} text="Shortlist" />
        <RejectButton onClick={rejectOnClick} text="Reject" />
      </div>
    );
  else return <></>;
};

export default ApplicationStatusButtons;
