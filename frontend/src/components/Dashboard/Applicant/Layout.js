import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SmsIcon from '@material-ui/icons/Sms';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { getApplicantJobs } from '../../../api/jobRequests';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import { sort } from '../../../utils/utils';
import Popup from '../../Controls/Popup';
import Button from '../../Controls/Button';

import ApplyForm from './ApplyForm';
import RatingStars from '../../Controls/RatingStars';

const Layout = () => {
  const heads = [
    { label: 'Title', id: 'title' },
    { label: 'Recruiter Name', id: 'recruiter.name' },
    { label: 'Type of Job', id: 'type' },
    { label: 'Salary', id: 'salary' },
    { label: 'Duration', id: 'duration' },
    { label: 'Deadline', id: 'deadline' },
    { label: 'Rating', id: 'avgRating' },
  ];

  const [jobs, setJobs] = useState([]);
  const [searchJobs, setSearchJobs] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ minSalary: '', maxSalary: '', duration: '', type: '', query: '' });
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [applyPopup, setApplyPopup] = useState(false);
  const [jobToApply, setJobToApply] = useState({});

  const dispatch = useDispatch();

  const fetchJobs = async () => {
    console.log(filter);
    const {
      data: {
        data: { data },
      },
    } = await getApplicantJobs(filter.query);
    console.log(data);
    setJobs(data);
  };

  const onFilterClick = () => setFetchAgain(!fetchAgain);

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newJobs = [...jobs];
    newJobs = sort(newJobs, sortBy.term, sortBy.order);
    newJobs = newJobs.filter((item) => item.title.split(' ').join('').toLowerCase().includes(term));
    setSearchJobs(newJobs);
  }, [searchTerm, sortBy, jobs]);

  useEffect(() => {
    fetchJobs();
  }, [dispatch, fetchAgain]);

  const onApplyClick = (item) => {
    setApplyPopup(true);
    setJobToApply(item);
  };

  const ActionIcons = ({ item }) => {
    if (item.status === 'Full') return <Button style={{ border: '2px solid 	#BF00FF', borderRadius: '50px', color: '		#7851A9' }} text="Full" size="medium" variant="outlined" startIcon={<AssignmentTurnedInIcon />} />;

    const exist = item.allApplications;
    if (!exist.length) return <Button onClick={() => onApplyClick(item)} style={{ border: '2px solid #1F75FE', borderRadius: '50px', color: '	#0000CD' }} text="Apply Now" size="medium" variant="outlined" startIcon={<ErrorOutlineIcon />} />;
    else if (exist[0].status === 'Accepted') return <Button disabled style={{ border: '2px solid #50C878', borderRadius: '50px', color: '#008080' }} text="Accepted" size="medium" variant="outlined" startIcon={<CheckIcon />} />;
    else if (exist[0].status === 'Rejected') return <Button disabled style={{ border: '2px solid #ED2939', borderRadius: '50px', color: '#960018' }} text="Rejected" size="medium" variant="outlined" startIcon={<CloseIcon />} />;
    else if (exist[0].status === 'Shortlisted') return <Button disabled style={{ border: '2px solid 	#FF7F50', borderRadius: '50px', color: '	#FF4F00' }} text="Rejected" size="medium" variant="outlined" startIcon={<SmsIcon />} />;
    else return <Button disabled style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#DAA520' }} text={exist[0].status} size="medium" variant="outlined" startIcon={<LoopIcon />} />;
  };

  return (
    <Navbar>
      <PageHeader onFilterClick={onFilterClick} btnDisable setSearchTerm={setSearchTerm} value={searchTerm} filter={filter} setFilter={setFilter}>
        {/* <FilterBox /> */}
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
                <TableCell align="center">{new Date(item.deadline).toDateString()}</TableCell>
                <TableCell align="center">
                  <RatingStars readOnly precision={0.5} value={item.avgRating} />
                </TableCell>
                <TableCell align="center">
                  <ActionIcons item={item} />
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
