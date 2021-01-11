exports.handleGlobalError = (error, req, res, next) => {
	console.log(error.stack);

	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';

	res.status(error.statusCode).json({
		status: error.status,
		message: error.message,
		error: error,
	});
};

exports.handleAsync = (fun) => {
	return (req, res, next) => {
		fun(req, res, next).catch((err) => next(err));
	};
};
