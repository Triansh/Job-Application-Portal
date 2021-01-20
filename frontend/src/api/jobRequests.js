import axios from 'axios';

const url = 'http://localhost:5000/api/jobs';

export const createJob = (job) => axios.post(url, job);

export const updateJob = (job, jobId) => axios.patch(`${url}/${jobId}`, job);

export const deleteJob = (jobId) => axios.delete(`${url}/${jobId}`);

export const getApplicantJobs = (query = '') => axios.get(`${url}/all?${query}`);

export const getRecruiterJobs = () => axios.get(url);

export const getJobApplications = (jobId) => axios.get(`${url}/${jobId}`);

export const createApplication = (app, jobId) => axios.post(`${url}/${jobId}`, app);
