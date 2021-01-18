import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';

import { getApplicantJobs } from '../../../api/jobRequests';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import ActionIcons from './ActionIcons';
import { sort } from '../utils';

const Layout = () => {
  const heads = [
    { label: 'Title', id: 'title' },
    { label: 'Recruiter Name', id: 'recruiter.name', nested: true },
    { label: 'Salary', id: 'salary' },
    { label: 'Duration', id: 'duration' },
    { label: 'Deadline', id: 'deadline', date: true },
    { label: 'Rating', id: 'avgRating' },
  ];

  const [jobs, setJobs] = useState([]);
  const [searchJobs, setSearchJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  // const [filter, setFilter] = useState({ minSalary: '', maxSalary: '', duration: '0', type: '' });
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [openPopup, setOpenPopup] = useState(false);

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
  }, [dispatch]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <Navbar>
      <PageHeader btnDisable setOpenPopup={setOpenPopup} handleSearch={handleSearch} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.recruiter.name}</TableCell>
                <TableCell align="center">{item.salary}</TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell align="center">{new Date(item.deadline).toDateString()}</TableCell>
                <TableCell align="center">{item.avgRating}</TableCell>
                <TableCell>
                  <ActionIcons item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageHeader>
    </Navbar>
  );
};

export default Layout;
