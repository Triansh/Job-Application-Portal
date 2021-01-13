const Job = require('../models/JobModel');
const Application = require('../models/ApplicationModel');

const { JOB_STATUS, APPLICATION_STATUS } = require('../utils/constants');
const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');
const jobStatusHandler = require('../utils/jobStatusHandler');

// ---------------------------------------------------------------- DEBUGGING
// -------------------------------------------------------------------

//This gives all job listing for applicant
const getAllJobs = handleAsync(async (req, res, next) => {
	const filteredJob = new BasicFilter(Job.find(), req.query).filter();

	let job = await filteredJob.query;
	res.status(201).json({
		status: 'success',
		data: { job },
	});
});

// This gives all active jobs of a recruiter (active => non deleted)
const getMyActiveJobs = handleAsync(async (req, res, next) => {
	const filter = { recruiter: req.user._id };
	const filteredJobs = new BasicFilter(Job.find(filter), req.query).filter();

	const jobs = await filteredJobs.query;
	res.status(200).json({
		status: 'success',
		data: { jobs },
	});
});

// This creates a job by a recruiter
const createJob = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const job = await Job.create({ ...req.body, recruiter: req.user._id });
	res.status(201).json({
		status: 'success',
		data: { job },
	});
});

// This updates a job by recruiter
const updateJob = handleAsync(async (req, res, next) => {
	let job = await Job.findById(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Update failed.', 404));
	if (job.recruiter.toString() !== req.user._id.toString())
		return next(new AppError('Permission denied for this action', 403));

	job = await Job.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
		new: true,
	});

	if (!job) return next(new AppError('Something went wrong'));

	const jobDetails = await jobStatusHandler(req.params.id);

	res.status(202).json(jobDetails);
});

// This deletes a job with their respective applications by recruiter
const deleteJob = handleAsync(async (req, res, next) => {
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

module.exports = {
	getAllJobs,
	getMyActiveJobs,
	updateJob,
	deleteJob,
	createJob,
};
