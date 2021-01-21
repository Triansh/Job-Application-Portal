import React from 'react';
import { useSelector } from 'react-redux';
import ApplicantLayout from './Applicant/Layout';
import RecruiterLayout from './Recruiter/Layout';

const Dashboard = () => {
  const { role } = useSelector((state) => state.user);

  if (role === 'Applicant') return <ApplicantLayout />;
  else if (role === 'Recruiter') return <RecruiterLayout />;
  else return <h1>Page Not Found</h1>;
};

export default Dashboard;
