import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableRow, TableCell, Typography } from '@material-ui/core';

import { getRecruiterJobs } from '../../../api/jobRequests';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import NewJobForm from './CreateJobForm';
import ActionIcons from './ActionIcons';

import Popup from '../../Controls/Popup';
import { sort } from '../utils';
import DialogBox from '../../Controls/DialogBox';
import UpdateJobForm from './UpdateJobForm';

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
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });

  const [fetchAgain, setFetchAgain] = useState(false);

  const dispatch = useDispatch();

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
                <TableCell align="center">{item.noOfApplicants}</TableCell>
                <TableCell align="center">{item.positions}</TableCell>
                <TableCell>
                  <ActionIcons id={item._id} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageHeader>
      <Popup title="Job Form" openPopup={createPopup} setOpenPopup={setCreatePopup}>
        <NewJobForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setCreatePopup} />
      </Popup>
      {/* <DialogBox action="update"  title="Update Job" openPopup={updatePopup} setOpenPopup={setUpdatePopup}>
        <UpdateJobForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setCreatePopup} />
      </DialogBox> */}
      <DialogBox action="delete" fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} title="Delete Job" confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}>
        <Typography variant="body1" >Are you sure, you want to delete this job?</Typography>
      </DialogBox>
    </Navbar>
  );
};

export default Layout;
