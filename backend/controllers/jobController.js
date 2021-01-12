const Job = require('../models/JobModel');
const Application = require('../models/ApplicationModel');

const { JOB_STATUS, APPLICATION_STATUS } = require('../utils/constants');
const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

// ---------------------------------------------------------------- DEBUGGING
exports.getJobs = handleAsync(async (req, res, next) => {
	const filteredJob = new BasicFilter(Job.find().populate('apps'), req.query)
		.filter()
		.sort();

	let job = await filteredJob.query;
	res.status(201).json({
		status: 'success',
		data: { job },
	});
});
// -------------------------------------------------------------------

// This gives all active jobs of a recruiter
exports.getMyActiveJobs = handleAsync(async (req, res, next) => {
	const filter = { recruiter: req.user._id, status: JOB_STATUS.AVAILABLE };
	const filteredJobs = new BasicFilter(Job.find(filter), req.query)
		.filter()
		.sort();

	const jobs = await filteredJobs.query;
	res.status(200).json({
		status: 'success',
		data: { jobs },
	});
});

// This creates a job by a recruiter
exports.createJob = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const job = await Job.create({ ...req.body, recruiter: req.user._id });
	res.status(201).json({
		status: 'success',
		data: { job },
	});
});

// This updates a job by recruiter
exports.updateJob = handleAsync(async (req, res, next) => {
	let job = await Job.findById(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Update failed.', 404));
	if (job.recruiter.toString() !== req.user._id.toString())
		return next(new AppError('Permission denied for this action', 403));

	job = await Job.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
		new: true,
	});
	res.status(202).json({
		status: 'success',
		data: { job },
	});
});

// This deletes a job with their respective applications by recruiter
exports.deleteJob = handleAsync(async (req, res, next) => {
	let job = await Job.findById(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Delete failed.', 404));
	if (job.recruiter !== req.user._id)
		return next(new AppError('Permission denied for this action', 403));

	job = await Job.findByIdAndDelete(req.params.id);

	// CASCADE DELETION
	await Application.deleteMany({ job: req.params.id });

	res.status(204).json({
		status: 'success',
	});
});

exports.jobStatusHandler = handleAsync(async (jobId) => {
	const job = await Job.findById(jobId).populate('apps');
	const { applications, positions, apps, status } = job;

	const totalAccepted = apps.map(
		(item) => item.status === APPLICATION_STATUS.ACCEPTED
	).length;
	const total = apps.length;

	options = { runValidators: true, new: true };

	if (totalAccepted >= positions || total >= applications) {
		if (status === JOB_STATUS.AVAILABLE) {
			await Job.findByIdAndUpdate(
				jobId,
				{ status: JOB_STATUS.FULL },
				options
			);
		}
	} else if (status === JOB_STATUS.FULL) {
		await Job.findByIdAndUpdate(
			jobId,
			{ status: JOB_STATUS.AVAILABLE },
			options
		);
	}
});
