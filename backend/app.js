const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const recruiterRoutes = require('./routes/recruiterRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');
const { handleGlobalError } = require('./utils/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

// PARSING JSON
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

// NOT FOUND ROUTES
app.all('*', (req, res, next) =>
	next(new AppError(`Unable to find ${req.originalUrl} on the server.`, 404))
);

app.use(handleGlobalError);

module.exports = app;
