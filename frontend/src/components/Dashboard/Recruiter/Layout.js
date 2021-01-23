import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
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
import { sendError, sort } from '../../../utils/utils';

import NewJobForm from './CreateJobForm';
import UpdateJobForm from './UpdateJobForm';

const Layout = () => {
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

  const heads = [
    { label: 'Title', id: 'title' },
    { label: 'Date of Posting', id: 'createdAt' },
    { label: 'Number of Applicants', id: 'noOfApplicants' },
    { label: 'Remaining Positions', id: 'remainingPositions' },
    { label: 'Deadline', id: 'deadline' },
  ];

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newJobs = [...jobs];
    newJobs = sort(newJobs, sortBy.term, sortBy.order);
    newJobs = newJobs.filter((item) => item.title.split(' ').join('').toLowerCase().includes(term));
    setSearchJobs(newJobs);
  }, [searchTerm, sortBy, jobs]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getRecruiterJobs();
        console.log(data);
        setJobs(data);
      } catch (error) {
        sendError(dispatch, error);
      }
    })();
  }, [dispatch, fetchAgain]);

  const onDelete = async (idx) => {
    try {
      await deleteJob(idx);
      setDeleteDialog({ ...deleteDialog, isOpen: false });
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Job deleted successfully' }));
    } catch (error) {
      sendError(dispatch, error);
    }
  };

  const onEditIconClick = (item) => {
    setUpdatePopup(true);
    setJobToEdit(item);
  };

  return (
    <Navbar>
      <PageHeader setOpenPopup={setCreatePopup} setSearchTerm={setSearchTerm} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchJobs.map((item) => {
              const { _id, title, createdAt, noOfApplicants, remainingPositions, deadline } = item;
              return (
                <TableRow key={_id}>
                  <TableCell align="center" to={`/jobs/${_id}`} component={Link}>
                    {title}
                  </TableCell>
                  <TableCell align="center">{new Date(createdAt).toDateString()}</TableCell>
                  <TableCell align="center">{noOfApplicants}</TableCell>
                  <TableCell align="center">{remainingPositions}</TableCell>
                  <TableCell align="center">{new Date(deadline).toGMTString()}</TableCell>
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
      <DialogBox action="Delete" confirmDialog={deleteDialog} setConfirmDialog={setDeleteDialog} item="Job" />
    </Navbar>
  );
};

export default Layout;
