import axios from 'axios';

const url = 'http://localhost:5000/api/applications';


export const updateApplicationStatus = (app, appId) => axios.patch(`${url}/${appId}`, app);

export const getAllEmployees = () => axios.get(`${url}/employees`);

export const getApplicantApplications = () => axios.get(url);
