import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';

import { TableBody, TableRow, TableCell, Typography, IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { deleteJob, getRecruiterJobs } from '../../../api/jobRequests';
import { setStatus } from '../../../features/statusSlice';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import DialogBox from '../../Controls/DialogBox';
import Popup from '../../Controls/Popup';
import { sort } from '../../../utils/utils';

import NewJobForm from './CreateJobForm';
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
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false });
  const [fetchAgain, setFetchAgain] = useState(false);
  const [jobToEdit, setJobToEdit] = useState({ applications: '', positions: '', deadline: '' });

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchJobs = async () => {
    let {
      data: {
        data: { data },
      },
    } = await getRecruiterJobs();

    setJobs(data);
  };

  const onDelete = async (idx) => {
    try {
      await deleteJob(idx);
      setDeleteDialog({ ...deleteDialog, isOpen: false });
      history.push('/');
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Job deleted successfully' }));
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      dispatch(setStatus({ status: 'error', message }));
    }
  };

  const onEditIconClick = (item) => {
    setUpdatePopup(true);
    setJobToEdit(item);
  };

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newJobs = [...jobs];
    newJobs = sort(newJobs, sortBy.term, sortBy.order);
    newJobs = newJobs.filter((item) => item.title.split(' ').join('').toLowerCase().includes(term));
    setSearchJobs(newJobs);
  }, [searchTerm, sortBy, jobs]);

  useEffect(() => {
    console.log('hi');
    fetchJobs();
  }, [dispatch, fetchAgain]);

  return (
    <Navbar>
      <PageHeader setOpenPopup={setCreatePopup} setSearchTerm={setSearchTerm} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchJobs.map((item) => {
              const { _id, title, createdAt, noOfApplicants, positions } = item;
              return (
                <TableRow key={_id}>
                  <TableCell align="center"  to={`/jobs/${_id}`} component={Link}>{title}</TableCell>
                  <TableCell align="center">{new Date(createdAt).toDateString()}</TableCell>
                  <TableCell align="center">{noOfApplicants}</TableCell>
                  <TableCell align="center">{positions}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onEditIconClick(item)}>
                      <CreateIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeleteDialog({ isOpen: true, onConfirm: () => onDelete(_id) })}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </PageHeader>
      <Popup title="Job Form" openPopup={createPopup} setOpenPopup={setCreatePopup}>
        <NewJobForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setCreatePopup} />
      </Popup>
      <Popup title="Update Job" openPopup={updatePopup} setOpenPopup={setUpdatePopup}>
        <UpdateJobForm jobToEdit={jobToEdit} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setUpdatePopup} />
      </Popup>
      <DialogBox action="delete" title="Delete Job" confirmDialog={deleteDialog} setConfirmDialog={setDeleteDialog}>
        <Typography variant="body1">Are you sure, you want to delete this job?</Typography>
      </DialogBox>
    </Navbar>
  );
};

export default Layout;
