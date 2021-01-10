const express = require('express');
const recruiterRoutes = require('./routes/recruiterRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(express.json());

app.use('/api/recruiters', recruiterRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/applications', applicationRoutes);

module.exports = app;
