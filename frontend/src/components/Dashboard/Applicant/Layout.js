import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';

import { getApplicantJobs } from '../../../api/jobRequests';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import { sendError, sort } from '../../../utils/utils';

import Popup from '../../Controls/Popup';
import RatingStars from '../../Controls/RatingStars';

import JobStatusButtons from '../../Status/JobStatus';

import ApplyForm from './ApplyForm';

const Layout = () => {
  const [jobs, setJobs] = useState([]);
  const [searchJobs, setSearchJobs] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ minSalary: '', maxSalary: '', duration: '', type: '', query: '' });
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [applyPopup, setApplyPopup] = useState(false);
  const [jobToApply, setJobToApply] = useState({});

  const dispatch = useDispatch();

  const heads = [
    { label: 'Title', id: 'title' },
    { label: 'Recruiter Name', id: 'recruiter.name' },
    { label: 'Type of Job', id: 'type' },
    { label: 'Salary', id: 'salary' },
    { label: 'Duration', id: 'duration' },
    { label: 'Deadline', id: 'deadline' },
    { label: 'Rating', id: 'avgRating' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getApplicantJobs(filter.query);
        console.log(data);
        setJobs(data);
      } catch (err) {
        sendError(dispatch, err);
      }
    })();
  }, [dispatch, fetchAgain]);

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newJobs = [...jobs];
    newJobs = sort(newJobs, sortBy.term, sortBy.order);
    newJobs = newJobs.filter((item) => item.title.split(' ').join('').toLowerCase().includes(term));
    setSearchJobs(newJobs);
  }, [searchTerm, sortBy, jobs]);

  const onApplyClick = (item) => {
    setApplyPopup(true);
    setJobToApply(item);
  };

  const onFilterClick = () => setFetchAgain(!fetchAgain);

  return (
    <Navbar>
      <PageHeader onFilterClick={onFilterClick} btnDisable setSearchTerm={setSearchTerm} value={searchTerm} filter={filter} setFilter={setFilter}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.recruiter.name}</TableCell>
                <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                  {item.type.split('-').join(' ')}
                </TableCell>
                <TableCell align="center">{item.salary}</TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell align="center">{new Date(item.deadline).toGMTString()}</TableCell>
                <TableCell align="center">
                  <RatingStars readOnly precision={0.5} value={item.avgRating} />
                </TableCell>
                <TableCell align="center">
                  <JobStatusButtons job={item} onClick={() => onApplyClick(item)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageHeader>
      <Popup title="Apply for this job" openPopup={applyPopup} setOpenPopup={setApplyPopup}>
        <ApplyForm jobToApply={jobToApply} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setApplyPopup} />
      </Popup>
    </Navbar>
  );
};

export default Layout;
