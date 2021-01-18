import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableRow, TableCell } from '@material-ui/core';

import { getRecruiterJobs } from '../../../api/jobRequests';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import NewJobForm from './NewJobForm';
import ActionIcons from './ActionIcons';

import Popup from '../../Controls/Popup';
import { sort } from '../utils';

const Layout = () => {
  const heads = [
    { label: 'Title', id: 'title' },
    { label: 'Date of Posting', id: 'createdAt' },
    { label: 'Number of Applicants', id: 'noOfApplicants' },
    { label: 'Remaining Positions', id: 'positions' },
  ];

  const [jobs, setJobs] = useState([]);
  const [searchJobs, setSearchJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const [fetchAgain, setFetchAgain] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setDeletePopup(true);
  };

  const handleUpdate = (id) => {
    setUpdatePopup(true);
  };

  const fetchJobs = async () => {
    let {
      data: {
        data: { data },
      },
    } = await getRecruiterJobs();

    setJobs(data);
  };

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newJobs = [...jobs];
    newJobs = sort(newJobs, sortBy.term, sortBy.order);
    newJobs = newJobs.filter((item) => item.title.split(' ').join('').toLowerCase().includes(term));
    setSearchJobs(newJobs);
  }, [searchTerm, sortBy, jobs, setCreatePopup]);

  useEffect(() => {
    console.log('hi');
    fetchJobs();
  }, [dispatch, fetchAgain]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <Navbar>
      <PageHeader setOpenPopup={setCreatePopup} handleSearch={handleSearch} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell align="center">{item.noOfApplications}</TableCell>
                <TableCell align="center">{item.positions}</TableCell>
                <TableCell>
                  <ActionIcons id={item._id} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageHeader>
      <Popup title="Job Form" openPopup={createPopup} setOpenPopup={setCreatePopup}>
        <NewJobForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setCreatePopup} />
      </Popup>
      <Popup title="Update Job" openPopup={updatePopup} setOpenPopup={setUpdatePopup}>
        {/* <NewJobForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setCreatePopup} /> */}
      </Popup>
      <Popup title="Delete Job" openPopup={deletePopup} setOpenPopup={setDeletePopup}>
        {/* <NewJobForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setCreatePopup} /> */}
      </Popup>
    </Navbar>
  );
};

export default Layout;
