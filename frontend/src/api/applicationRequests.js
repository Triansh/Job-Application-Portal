import axios from 'axios';

const url = 'http://localhost:5000/api/applications';

export const updateApplicationStatus = (status, appId) => axios.patch(`${url}/${appId}`, status);

export const getAllEmployees = () => axios.get(`${url}/employees`);

export const getApplicantApplications = () => axios.get(url);
