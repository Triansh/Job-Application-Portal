import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TableBody, TableCell, TableRow } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GradeIcon from '@material-ui/icons/Grade';

import { getAllEmployees } from '../../../api/applicationRequests';
import { rateEmployee } from '../../../api/ratingRequests';

import { sort } from '../../../utils/utils';

import Navbar from '../../Navbar/Navbar';

import PageHeader from '../../Table/PageHeader';
import TableHead from '../../Table/TableHead';
import Table from '../../Table/Table';

import Popup from '../../Controls/Popup';
import Button from '../../Controls/Button';
import RatingStars from '../../Controls/RatingStars';

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
      const {
        data: { data },
      } = await getAllEmployees();
      console.log(data);
      setEmps(data);
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

    if (hasRated) return <Button disabled style={{ border: '2px solid 	#03C03C', borderRadius: '50px', color: '	#1F75FE' }} text="Rated" size="medium" variant="outlined" endIcon={<ThumbUpIcon />} />;
    else
      return (
        <Button
          disabled={item.status !== 'Accepted'}
          onClick={() => onRateClick(item.applicant)}
          style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#0000CD' }}
          text="Rate Now"
          size="medium"
          variant="outlined"
          startIcon={<GradeIcon />}
        />
      );
  };

  return (
    <Navbar>
      <PageHeader searchLabel="Search Employees"  btnDisable setSearchTerm={setSearchTerm} value={searchTerm}>
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
