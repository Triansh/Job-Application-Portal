import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';

import { getAllEmployees } from '../../../api/applicationRequests';
import { rateEmployee } from '../../../api/ratingRequests';

import { sendError, sort } from '../../../utils/utils';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import Popup from '../../Controls/Popup';
import RatingStars from '../../Controls/RatingStars';

import RateButtons from '../../Status/RateStatus';

import RateForm from '../RateForm';

const MyEmployees = () => {
  const [emps, setEmps] = useState([]);
  const [searchEmps, setSearchEmps] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ term: '', order: '' });
  const [ratePopup, setRatePopup] = useState(false);
  const [empToRate, setEmpToRate] = useState({});

  const dispatch = useDispatch();

  const heads = [
    { label: 'Name of Employee', id: 'applicant.name' },
    { label: 'Job Title', id: 'job.title', nested: true },
    { label: 'Type of Job', id: 'job.type' },
    { label: 'Date of Joining', id: 'createdAt' },
    { label: 'Employee Rating', id: 'avgRating' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getAllEmployees();
        console.log(data);
        setEmps(data);
      } catch (error) {
        sendError(dispatch, error);
      }
    })();
  }, [dispatch, fetchAgain]);

  useEffect(() => {
    const term = searchTerm.split(' ').join('').toLowerCase();
    let newEmps = [...emps];
    newEmps = sort(newEmps, sortBy.term, sortBy.order);
    newEmps = newEmps.filter((item) => item.applicant.name.split(' ').join('').toLowerCase().includes(term));
    setSearchEmps(newEmps);
  }, [searchTerm, sortBy, emps]);

  const onRateClick = (item) => {
    setRatePopup(true);
    setEmpToRate(item);
  };

  const ActionIcons = ({ item }) => {
    const userId = item.recruiter;
    const { review } = item.applicant;
    console.log(userId, review, item.applicant._id);
    const ratingExists = review.filter(({ rater }) => rater === userId);
    const hasRated = !ratingExists || !ratingExists.length ? false : true;

    return <RateButtons status="Accepted" hasRated={hasRated} onClick={() => onRateClick(item.applicant)} />;
  };

  return (
    <Navbar>
      <PageHeader searchLabel="Search Employees" btnDisable setSearchTerm={setSearchTerm} value={searchTerm}>
        <Table>
          <TableHead heads={heads} sortBy={sortBy} setSortBy={setSortBy} />
          <TableBody>
            {searchEmps.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.applicant.name}</TableCell>
                <TableCell align="center">{item.job.title}</TableCell>
                <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                  {item.job.type.split('-').join(' ')}
                </TableCell>
                <TableCell align="center">{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell align="center">
                  <RatingStars readOnly precision={0.5} value={item.applicant.avgRating} />
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
        <RateForm link="/employees" itemName="Employee" submitFn={rateEmployee} itemToRate={empToRate} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} setOpenPopup={setRatePopup} />
      </Popup>
    </Navbar>
  );
};

export default MyEmployees;
