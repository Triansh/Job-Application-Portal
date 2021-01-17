import React, { useEffect, useState } from 'react';

import { getApplicantJobs } from '../../api/jobRequests';
import { useDispatch } from 'react-redux';

import { saveError } from '../../utils/utils';

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
  }, [jobs, dispatch]);

  return <div></div>;
};

export default Dashboard;
