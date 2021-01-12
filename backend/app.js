const express = require('express');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

const { handleGlobalError } = require('./utils/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

// PARSING JSON
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rating', ratingRoutes);

// NOT FOUND ROUTES
app.all('*', (req, res, next) =>
	next(new AppError(`Unable to find ${req.originalUrl} on the server.`, 404))
);

app.use(handleGlobalError);

module.exports = app;
