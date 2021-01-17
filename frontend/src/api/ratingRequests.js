import axios from 'axios';

const url = 'http://localhost:5000/api/rating';

export const rateEmployee = (body, applicantId) => axios.patch(`${url}/users/${applicantId}`, body);

export const rateJob = (body, applicationId) => axios.patch(`${url}/jobs/${applicationId}`, body);
