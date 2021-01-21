const AppError = require('./AppError');

const sendError = (err, res) => {
	console.log(err.stack);
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const handleDuplicationErrors = (err) => {
	const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
	const message = `This field with value ${value} already exists. Please try with another value`;
	return new AppError(message, 400);
};

const handleValidationErrors = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message)[0];
	const message = `Invalid data. ${errors}`;
	return new AppError(message, 400);
};
const handleJWTError = () => new AppError('Invlaid token! Please login again', 401);

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	let error = { ...err };

	if (err.code === 11000) error = handleDuplicationErrors(err);
	if (err._message && err._message.includes('validation')) error = handleValidationErrors(err);
	if (err.name === 'JsonWebTokenError') error = handleJWTError(err);

	if (!error.message) error.message = 'Oops! Something went wrong';

	sendError(error, res);
};
