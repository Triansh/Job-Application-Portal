const Job = require('../models/JobModel');
const { JOB_STATUS } = require('../utils/constants');
const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.getMyActiveJobs = handleAsync(async (req, res, next) => {
	const filter = { recruiter: req.user._id, status: JOB_STATUS.AVAILABLE };
	const filteredJobs = new BasicFilter(Job.find(filter), req.query)
		.filter()
		.sort();

	const jobs = await filteredJobs.query;
	res.status(200).json({
		status: 'success',
		data: jobs,
	});
});

exports.createJob = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const job = await Job.create({ ...req.body, recruiter: req.user._id });
	res.status(201).json({
		status: 'success',
		data: job,
	});
});

exports.updateJob = handleAsync(async (req, res, next) => {
	let job = await Job.findById(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Update failed.', 404));
	if (job.recruiter !== req.user._id)
		return next(new AppError('Permission denied for this action', 403));

	job = await Job.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
		new: true,
	});
	res.status(202).json({
		status: 'success',
		data: job,
	});
});

exports.deleteJob = handleAsync(async (req, res, next) => {
	let job = await Job.findById(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Delete failed.', 404));
	if (job.recruiter !== req.user._id)
		return next(new AppError('Permission denied for this action', 403));

	job = await Job.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
	});
});

exports.getJobs = handleAsync(async (req, res, next) => {
	const filteredJob = new BasicFilter(Job.find(), req.query).filter().sort();

	const job = await filteredJob.query;
	res.status(201).json({
		status: 'success',
		data: job,
	});
});
