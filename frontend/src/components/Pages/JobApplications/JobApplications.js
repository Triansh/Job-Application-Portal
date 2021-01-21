import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { Grid, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import SmsIcon from '@material-ui/icons/Sms';

import { getJobApplications } from '../../../api/jobRequests';
import { updateApplicationStatus } from '../../../api/applicationRequests';

import { setStatus } from '../../../features/statusSlice';

import { sendError, sort } from '../../../utils/utils';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import Button from '../../Controls/Button';
import RatingStars from '../../Controls/RatingStars';
import DialogBox from '../../Controls/DialogBox';

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
    { label: 'skills', id: 'applicant.skills', nested: true },
    { label: 'Date of Application', id: 'createdAt' },
    { label: 'Education', id: 'applicant.education' },
    { label: 'SOP', id: 'sop' },
    { label: 'Rating', id: 'applicant.avgRating' },
    { label: 'Current Application Status', id: 'status' },
  ];

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await getJobApplications(params.id);
      console.log(data);
      setApps(data);
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

  const DisplayEducation = ({ educationList }) => {
    return (
      <Grid container spacing={1}>
        {educationList.map(({ institution, startYear, endYear, _id }) => {
          return (
            <Grid item xs={12} key={_id}>
              <Typography variant="body2">
                <strong>Institution: </strong> {institution}
              </Typography>
              <Typography variant="body2">
                <strong>Period: </strong> {startYear} - {endYear ? endYear : 'Present'}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const ActionIcons = ({ item: { _id, status } }) => {
    if (status === 'Shortlisted')
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            onClick={() => setAcceptDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Accepted' }, _id) })}
            style={{ border: '2px solid #50C878', borderRadius: '50px', color: '#008080' }}
            text="Accept"
            size="medium"
            variant="outlined"
            startIcon={<CheckIcon />}
          />
          <Button
            onClick={() => setRejectDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Rejected' }, _id) })}
            style={{ border: '2px solid #ED2939', borderRadius: '50px', color: '#960018' }}
            text="Reject"
            size="medium"
            variant="outlined"
            startIcon={<CloseIcon />}
          />
        </div>
      );
    else if (status === 'Applied')
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            onClick={() => setShortlistDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Shortlisted' }, _id) })}
            style={{ border: '2px solid 	#FF7F50', borderRadius: '50px', color: '	#FF4F00' }}
            text="Shortlist"
            size="medium"
            variant="outlined"
            startIcon={<SmsIcon />}
          />
          <Button
            onClick={() => setRejectDialog({ isOpen: true, onConfirm: () => handleStatusChange({ status: 'Rejected' }, _id) })}
            style={{ border: '2px solid #ED2939', borderRadius: '50px', color: '#960018' }}
            text="Reject"
            size="medium"
            variant="outlined"
            startIcon={<CloseIcon />}
          />
        </div>
      );
    else return <></>;
  };

  const StatusIcons = ({ item }) => {
    if (item.status === 'Accepted') return <Button disabled style={{ border: '2px solid #50C878', borderRadius: '50px', color: '#008080' }} text="Accepted" size="medium" variant="outlined" startIcon={<CheckIcon />} />;
    else if (item.status === 'Rejected') return <Button disabled style={{ border: '2px solid #ED2939', borderRadius: '50px', color: '#960018' }} text="Rejected" size="medium" variant="outlined" startIcon={<CloseIcon />} />;
    else if (item.status === 'Shortlisted') return <Button disabled style={{ border: '2px solid 	#FF7F50', borderRadius: '50px', color: '	#FF4F00' }} text="Shortlisted" size="medium" variant="outlined" startIcon={<SmsIcon />} />;
    else return <Button disabled style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#DAA520' }} text={item.status} size="medium" variant="outlined" startIcon={<LoopIcon />} />;
  };

  return (
    <Navbar>
      <PageHeader btnDisable setSearchTerm={setSearchTerm} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchApps.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.applicant.name}</TableCell>
                <TableCell align="center">{item.applicant.skills.join(', ')}</TableCell>
                <TableCell align="center">{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell align="left">
                  <DisplayEducation educationList={item.applicant.education} />
                </TableCell>
                <TableCell align="center">{item.sop}</TableCell>
                <TableCell align="center">
                  <RatingStars readOnly precision={0.5} value={item.applicant.avgRating} />
                </TableCell>
                <TableCell align="center">
                  <StatusIcons item={item} />
                </TableCell>
                <TableCell align="center">
                  <ActionIcons item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageHeader>
      <DialogBox action="Accept" title="Accept Applicant" confirmDialog={acceptDialog} setConfirmDialog={setAcceptDialog}>
        <Typography variant="body1">
          Are you sure, you want to <b>Accept</b> this applicant?
        </Typography>
      </DialogBox>
      <DialogBox action="Shortlist" title="Shortlist Applicant" confirmDialog={shortlistDialog} setConfirmDialog={setShortlistDialog}>
        <Typography variant="body1">
          Are you sure, you want to <b>Shortlist</b> this applicant?
        </Typography>
      </DialogBox>
      <DialogBox action="Reject" title="Reject Applicant" confirmDialog={rejectDialog} setConfirmDialog={setRejectDialog}>
        <Typography variant="body1">
          Are you sure, you want to <b>Reject</b> this applicant?
        </Typography>
      </DialogBox>
    </Navbar>
  );
};

export default JobApplications;
