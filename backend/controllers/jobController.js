const Job = require('../models/JobModel');
const Application = require('../models/ApplicationModel');

const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');
const jobStatusHandler = require('../utils/jobStatusHandler');

// ---------------------------------------------------------------- DEBUGGING
// -------------------------------------------------------------------

//This gives all job listing for applicant
const getAllJobs = handleAsync(async (req, res, next) => {
	const filter = { deadline: { $gt: Date.now() } };
	const filteredJob = new BasicFilter(Job.find(filter), req.query).filter();

	const jobs = await filteredJob.query
		.populate({ path: 'recruiter', select: 'name' })
		.populate({
			path: 'allApplications',
			match: { applicant: req.user._id },
			select: 'status',
		})
		.select('-applications -positions -skills -__v ');

	res.status(201).json({
		status: 'success',
		data: { data: jobs },
	});
});

// This gives all active jobs of a recruiter
const getMyActiveJobs = handleAsync(async (req, res, next) => {
	const filter = { recruiter: req.user._id };
	const filteredJobs = new BasicFilter(Job.find(filter), req.query).filter();

	const jobs = await filteredJobs.query
		.populate('noOfApplicants')
		.select('title createdAt positions');

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

	const { positions, applications, deadline } = req.body;

	if (positions < job.positions || applications < job.applications)
		return next(
			new AppError(
				'You cannot decrease the maximum number of applications and positions',
				400
			)
		);

	job = await Job.findByIdAndUpdate(
		req.params.id,
		{ positions, applications, deadline },
		{ runValidators: true, new: true }
	);

	if (!job) return next(new AppError('Something went wrong'));

	const jobDetails = await jobStatusHandler(req.params.id);

	res.status(202).json(jobDetails);
});

// This deletes a job with their respective applications by recruiter
const deleteJob = handleAsync(async (req, res, next) => {
	let job = await Job.findById(req.params.id);
	if (!job)
		return next(new AppError('No such job exists. Delete failed.', 404));
	if (job.recruiter.toString() !== req.user._id.toString())
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
