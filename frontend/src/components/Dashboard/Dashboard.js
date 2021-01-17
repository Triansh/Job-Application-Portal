import React, { useEffect, useState } from 'react';

import { getApplicantJobs } from '../../api/jobRequests';
import { useDispatch } from 'react-redux';

import { saveError } from '../../utils/utils';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const {
          data: { data },
        } = await getApplicantJobs();
        setJobs(data);
      } catch (e) {
        saveError(e, dispatch);
      }
    };
    fetchJobs();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
