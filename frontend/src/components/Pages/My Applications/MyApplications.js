import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';

import { rateJob } from '../../../api/ratingRequests';
import { getApplicantApplications } from '../../../api/applicationRequests';

import { sendError, sort } from '../../../utils/utils';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import Popup from '../../Controls/Popup';

import ApplicationStatusButtons from '../../Status/ApplicationStatus';
import RateButtons from '../../Status/RateStatus';

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
    { label: 'Date of Joining', id: 'createdAt' },
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

  const RatingActionIcons = ({ item }) => {
    const userId = item.applicant;
    const { review } = item.job;
    const ratingExists = review.filter(({ rater }) => rater === userId);
    const hasRated = !ratingExists || !ratingExists.length ? false : true;

    return <RateButtons hasRated={hasRated} status={item.status} onClick={() => onRateClick(item)} />;
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
                <TableCell align="center">{item.status === "Accepted" ? new Date(item.createdAt).toDateString() : "NA"}</TableCell>
                <TableCell align="center">
                  <ApplicationStatusButtons status={item.status} />
                </TableCell>
                <TableCell align="center">
                  <RatingActionIcons item={item} />
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
