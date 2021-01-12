const Application = require('../models/ApplicationModel');
const Job = require('../models/JobModel');

const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');
const { APPLICATION_STATUS } = require('../utils/constants');

// FOR DEBUGGING
exports.getAllApplications = handleAsync(async (req, res, next) => {
	const filteredApplications = new BasicFilter(Application.find(), req.query)
		.filter()
		.sort();

	const apps = await filteredApplications.query;
	res.status(200).json({
		status: 'success',
		data: { apps },
	});
});

exports.createApplication = handleAsync(async (req, res, next) => {
	console.log(req.body);

	const job = await Job.findById(req.body.job);
	if (!job) return next(new AppError('No such job exists', 400));

	const app = await Application.create({
		job: req.body.job,
		applicant: req.user._id,
		sop: req.body.sop,
		recruiter: job.recruiter,
	});
	res.status(201).json({
		status: 'success',
		data: { app },
	});
});

exports.updateApplication = handleAsync(async (req, res, next) => {
	const app = await Application.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!app) return next(new AppError('The application doesnot exist.', 404));

	res.status(201).json({
		status: 'success',
		data: { app },
	});
});

exports.getApplication = handleAsync(async (req, res, next) => {
	const app = await Application.findById(req.params.id);
	if (!app) return next(new AppError('The application doesnot exist.', 404));

	res.status(200).json({
		status: 'success',
		data: { app },
	});
});

exports.getMyEmployees = handleAsync(async (req, res, next) => {
	const filter = {
		status: APPLICATION_STATUS.ACCEPTED,
		recruiter: req.user._id,
	};

	const employees = await Application.find(filter).select('applicant');
	res.status(200).json({
		status: 'success',
		data: { employees },
	});
});

exports.getMyApplications = handleAsync(async (req, res, next) => {
	const apps = await Application.find({ applicant: req.user._id });
	res.status(200).json({
		status: 'success',
		data: { apps },
	});
});
