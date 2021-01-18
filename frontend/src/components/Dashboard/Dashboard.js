import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, Table } from '@material-ui/core';

import { getApplicantJobs } from '../../api/jobRequests';

import Navbar from '../Navbar/Navbar';

import { sort } from './utils';
import Popup from '../common/Popup';

import PageHeader from './PageHeader';
import Head from './Head';
import TableBody from './TableBody';
import NewJobForm from './NewJobForm';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#6CB4EE',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

const Dashboard = () => {
  const heads = [
    { label: 'Title', id: 'title' },
    { label: 'Recruiter Name', id: 'recruiter.name' },
    { label: 'Salary', id: 'salary' },
    { label: 'Duration', id: 'duration' },
    { label: 'Deadline', id: 'deadline' },
    { label: 'Rating', id: 'avgRating' },
    { label: 'Actions', id: 'actions' },
  ];

  const [jobs, setJobs] = useState([]);
  const [searchJobs, setSearchJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  // const [filter, setFilter] = useState({ minSalary: '', maxSalary: '', duration: '0', type: '' });
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [openPopup, setOpenPopup] = useState(false);
  // const [jobCreated, setJobCreated] = useState(false);

  const dispatch = useDispatch();

  const fetchJobs = async () => {
    const {
      data: {
        data: { data },
      },
    } = await getApplicantJobs();
    console.log(data);
    setJobs(data);
  };

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newJobs = [...jobs];
    newJobs = sort(newJobs, sortBy.term, sortBy.order);
    newJobs = newJobs.filter((item) => item.title.split(' ').join('').toLowerCase().includes(term));
    setSearchJobs(newJobs);
  }, [searchTerm, sortBy, jobs, openPopup]);

  useEffect(() => {
    fetchJobs();
    // setJobCreated(false)
  }, [dispatch]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const classes = useStyles();

  return (
    <Navbar>
      <PageHeader setOpenPopup={setOpenPopup}  handleSearch={handleSearch} value={searchTerm}>
        <Table className={classes.table}>
          <Head heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody items={searchJobs} />
        </Table>
      </PageHeader>
      <Popup title="Job Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <NewJobForm />
      </Popup>
    </Navbar>
  );
};

export default Dashboard;
