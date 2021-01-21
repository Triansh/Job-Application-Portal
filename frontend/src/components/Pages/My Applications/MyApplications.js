import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GradeIcon from '@material-ui/icons/Grade';
import SmsIcon from '@material-ui/icons/Sms';

import { rateJob } from '../../../api/ratingRequests';
import { getApplicantApplications } from '../../../api/applicationRequests';

import { sendError, sort } from '../../../utils/utils';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import Popup from '../../Controls/Popup';
import Button from '../../Controls/Button';

import RateForm from '../RateForm';

const MyApplications = () => {
  const [apps, setApps] = useState([]);
  const [searchApps, setSearchApps] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [ratePopup, setRatePopup] = useState(false);
  const [jobToRate, setJobToRate] = useState({});

  const dispatch = useDispatch();

  const heads = [
    { label: 'Job Title', id: 'job.title' },
    { label: 'Recruiter Name', id: 'recruiter.name', nested: true },
    { label: 'Salary', id: 'job.salary' },
    { label: 'Date of posting', id: 'createdAt' },
    { label: 'Status', id: 'status' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getApplicantApplications();
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
    newApps = newApps.filter((item) => item.job.title.split(' ').join('').toLowerCase().includes(term));
    setSearchApps(newApps);
  }, [searchTerm, sortBy, apps]);

  const onRateClick = (item) => {
    setRatePopup(true);
    setJobToRate(item);
  };

  const ActionIcons = ({ item }) => {
    const userId = item.applicant;
    const { review } = item.job;
    const ratingExists = review.filter(({ rater }) => rater === userId);
    const hasRated = !ratingExists || !ratingExists.length ? false : true;

    if (hasRated) return <Button disabled style={{ border: '2px solid 	#03C03C', borderRadius: '50px', color: '	#1F75FE' }} text="Rated" size="medium" variant="outlined" endIcon={<ThumbUpIcon />} />;
    else
      return (
        <Button disabled={item.status !== 'Accepted'} onClick={() => onRateClick(item)} style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#0000CD' }} text="Rate Now" size="medium" variant="outlined" startIcon={<GradeIcon />} />
      );
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
                <TableCell align="center">{item.job.title}</TableCell>
                <TableCell align="center">{item.recruiter.name}</TableCell>
                <TableCell align="center">{item.job.salary}</TableCell>
                <TableCell align="center">{new Date(item.createdAt).toDateString()}</TableCell>
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
      <Popup title="Rate this job" openPopup={ratePopup} setOpenPopup={setRatePopup}>
        <RateForm link="/applications" itemName="Job" submitFn={rateJob} itemToRate={jobToRate} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setRatePopup} />
      </Popup>
    </Navbar>
  );
};

export default MyApplications;
