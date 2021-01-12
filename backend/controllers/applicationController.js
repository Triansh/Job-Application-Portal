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

exports.updateApplicationStatus = handleAsync(async (req, res, next) => {
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

exports.getActiveApplicationsForJob = handleAsync(async (req, res, next) => {
	const job = await Job.findById(req.params.id);
	if (!job) return next(new AppError('No such job exists', 404));

	if (req.user._id.toString() !== job.recruiter.toString())
		return next(new AppError('Permission denied for this action', 403));

	// const filter = { job: new ObjectId(req.params.id), recruiter: new ObjectId(req.user._id) };
	const filter = {
		$and: [{ job: req.params.id }, { recruiter: req.user._id }],
	};

	const ap = await Application.find(filter);
	const apps = await Application.aggregate([
		{ $match: { job: req.params.id } },
		// { $unwind: '$applicant' },
		// { $sort: { 'applicant.name': 1 } },
		// { $group: { _id: '$_id', applicant: { $push: '$applicant' } } },
	]);

	// const apps = await filteredApps;
	res.status(200).json({
		status: 'success',
		data: { apps },
		ap,
	});
});

exports.checkOpenApplications = handleAsync(async (req, res, next) => {
	const len = await Application.countDocuments({
		status: { $ne: APPLICATION_STATUS.REJECTED },
		applicant: req.user._id,
	});

	if (len >= 10)
		return next(new AppError('There are already 10 open applications.'));
	next();
});
