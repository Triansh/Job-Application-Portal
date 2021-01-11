const Job = require('../models/JobModel');
const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.getJobs = handleAsync(async (req, res, next) => {
	const filteredJob = new BasicFilter(Job.find(), req.query).filter().sort();

	const job = await filteredJob.query;
	res.status(201).json({
		status: 'success',
		data: job,
	});
});

exports.createJob = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const job = await Job.create(req.body);
	res.status(201).json({
		status: 'success',
		data: job,
	});
});

exports.updateJob = handleAsync(async (req, res, next) => {
	const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!job)
		return next(new AppError('No such job exists. Update failed.', 404));
	res.status(202).json({
		status: 'success',
		data: job,
	});
});

exports.deleteJob = handleAsync(async (req, res, next) => {
	const job = await Job.findByIdAndDelete(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Delete failed.', 404));
	res.status(204).json({
		status: 'success',
	});
});


exports.getAllActiveJobs = handleAsync(async(req, res, next) => {
	

})