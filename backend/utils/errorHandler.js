const AppError = require('./AppError');

const handleDuplicateErrors = (err) => {
	const message = `This email already exists.`;
	return new AppError(message, 400);
};

const handleValidationErrors = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message)[0];
	return new AppError(`${errors}`, 400);
};

exports.globalErrorHandler = (e, req, res, next) => {
	// console.log(e.stack);

	e.statusCode = e.statusCode || 500;
	e.status = e.status || 'error';

	let err = { ...e };
	console.log(e, err);

	if (err.code === 11000) err = handleDuplicateErrors(err);
	if (err._message.includes('validation')) {
		err = handleValidationErrors(err);
	}
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

exports.handleAsync = (fun) => {
	return (req, res, next) => {
		fun(req, res, next).catch(next);
	};
};
