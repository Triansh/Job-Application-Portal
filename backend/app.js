const express = require('express');

const recruiterRoutes = require('./routes/recruiterRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const { handleGlobalError } = require('./utils/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

// PARSING JSON
app.use(express.json());

// ROUTES
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/applications', applicationRoutes);

// NOT FOUND ROUTES
app.all('*', (req, res, next) =>
	next(new AppError(`Unable to find ${req.originalUrl} on the server.`, 404))
);

app.use(handleGlobalError);

module.exports = app;
