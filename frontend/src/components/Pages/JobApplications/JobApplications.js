import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { TableBody, TableCell, TableRow } from '@material-ui/core';

import { getJobApplications } from '../../../api/jobRequests';
import { updateApplicationStatus } from '../../../api/applicationRequests';

import { setStatus } from '../../../features/statusSlice';

import { sendError, sort } from '../../../utils/utils';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import DisplayEducation from '../../Education/DisplayEducation';

import RatingStars from '../../Controls/RatingStars';
import DialogBox from '../../Controls/DialogBox';

import { ApplicationStatusButtons, ApplicationStatusUpdateButtons } from '../../Status/ApplicationStatus';

const JobApplications = () => {
  const [apps, setApps] = useState([]);
  const [searchApps, setSearchApps] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [rejectDialog, setRejectDialog] = useState({ isOpen: false });
  const [acceptDialog, setAcceptDialog] = useState({ isOpen: false });
  const [shortlistDialog, setShortlistDialog] = useState({ isOpen: false });

  const dispatch = useDispatch();
  const params = useParams();

  const heads = [
    { label: 'Name', id: 'applicant.name' },
    { label: 'Skills', id: 'applicant.skills', nested: true },
    { label: 'Date of Application', id: 'createdAt' },
    { label: 'Education', id: 'applicant.education' },
    { label: 'SOP', id: 'sop' },
    { label: 'Rating', id: 'applicant.avgRating' },
    { label: 'Current Application Status', id: 'status' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getJobApplications(params.id);
        console.log(data);
        setApps(data);
      } catch (error) {
        sendError(dispatch, error);
      }
    })();
  }, [dispatch, fetchAgain]);

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newApps = [...apps];
    newApps = sort(newApps, sortBy.term, sortBy.order);
    newApps = newApps.filter((item) => item.applicant.name.split(' ').join('').toLowerCase().includes(term));
    setSearchApps(newApps);
  }, [searchTerm, sortBy, apps]);

  const handleStatusChange = async (status, idx) => {
    try {
      await updateApplicationStatus(status, idx);
      setRejectDialog({ isOpen: false });
      setAcceptDialog({ isOpen: false });
      setShortlistDialog({ isOpen: false });
      setFetchAgain(!fetchAgain);
      dispatch(setStatus({ status: 'success', message: 'Application status updated successfully' }));
    } catch (error) {
      sendError(dispatch, error);
    }
  };

  const UpdateStatusActionButtons = ({ item: { _id, status } }) => {
    const acceptOnClick = () => setAcceptDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Accepted' }, _id) });
    const rejectOnClick = () => setRejectDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Rejected' }, _id) });
    const shortlistOnClick = () => setShortlistDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Shortlisted' }, _id) });

    return <ApplicationStatusUpdateButtons status={status} acceptOnClick={acceptOnClick} rejectOnClick={rejectOnClick} shortlistOnClick={shortlistOnClick} />;
  };

  return (
    <Navbar>
      <PageHeader searchLabel="Search Applicants" btnDisable setSearchTerm={setSearchTerm} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchApps.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.applicant.name}</TableCell>
                <TableCell align="center">{item.applicant.skills.join(', ')}</TableCell>
                <TableCell align="center">{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell align="center">
                  <DisplayEducation educationList={item.applicant.education} />
                </TableCell>
                <TableCell align="center">{item.sop}</TableCell>
                <TableCell align="center">
                  <RatingStars readOnly precision={0.5} value={item.applicant.avgRating} />
                </TableCell>
                <TableCell align="center">
                  <ApplicationStatusButtons status={item.status} />
                </TableCell>
                <TableCell align="center">
                  <UpdateStatusActionButtons item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageHeader>
      <DialogBox action="Accept" confirmDialog={acceptDialog} setConfirmDialog={setAcceptDialog} />
      <DialogBox action="Shortlist" confirmDialog={shortlistDialog} setConfirmDialog={setShortlistDialog} />
      <DialogBox action="Reject" confirmDialog={rejectDialog} setConfirmDialog={setRejectDialog} />
    </Navbar>
  );
};

export default JobApplications;
