const Application = require('../models/ApplicationModel');
const Job = require('../models/JobModel');

const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');
const { APPLICATION_STATUS, JOB_STATUS } = require('../utils/constants');

// ---------------------------------------------------------------- DEBUGGING
exports.getApplication = handleAsync(async (req, res, next) => {
	const app = await Application.findById(req.params.id);
	if (!app) return next(new AppError('The application doesnot exist.', 404));

	res.status(200).json({
		status: 'success',
		data: { app },
	});
});
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
// --------------------------------------------------------------------

// This is for creating application for a job by applicant
exports.createApplication = handleAsync(async (req, res, next) => {
	const job = await Job.findById(req.params.id);
	if (!job) return next(new AppError('No such job exists', 404));

	if (job.status === JOB_STATUS.FULL)
		return next(
			new AppError(
				'All recruitments are already made.\nUnsuccessful Attempt.',
				403
			)
		);

	const jobApps = await Application.countDocuments({ job: req.params.id });
	if (jobApps >= job.positions)
		return next(
			new AppError(
				'Maximum limit of Applications reached.\nUnsuccessful Attempt.',
				403
			)
		);

	if (new Date(job.deadline) <= Date.now())
		return next(
			new AppError('Deadline for this application has passed', 400)
		);

	if (
		await Application.countDocuments({
			job: req.params.id,
			applicant: req.user._id,
		})
	)
		return next(new AppError('You have already apllied for this job', 400));

	const app = await Application.create({
		job: req.params.id,
		applicant: req.user._id,
		sop: req.body.sop,
		recruiter: job.recruiter,
	});
	res.status(201).json({
		status: 'success',
		data: { app },
	});
});

// This shows all non-rejected applications of a job for recruiter
exports.getActiveApplicationsForJob = handleAsync(async (req, res, next) => {
	const job = await Job.findById(req.params.id);
	if (!job) return next(new AppError('No such job exists', 404));

	if (req.user._id.toString() !== job.recruiter.toString())
		return next(new AppError('Permission denied for this action', 403));

	const filter = {
		job: req.params.id,
		recruiter: req.user._id,
		status: { $ne: APPLICATION_STATUS.REJECTED },
	};

	const apps = await Application.find(filter);

	res.status(200).json({
		status: 'success',
		data: { apps },
	});
});

// This updates the status of application by recruiter
exports.updateApplicationStatus = handleAsync(async (req, res, next) => {
	const app = await Application.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	}).populate({ path: 'job', select: 'positions _id' });

	if (!app) return next(new AppError('The application doesnot exist.', 404));

	newStatus = app.status;
	if (newStatus === APPLICATION_STATUS.ACCEPTED) {
		const applicantId = app.applicant._id;

		// CHECK JOBS TOTAL POSITIONS AND UPDATE STATUS
		accepted = Application.countDocuments({
			job: app.job._id,
			status: APPLICATION_STATUS.ACCEPTED,
		});
		if (accepted >= app.job.positions) {
			await findByIdAndUpdate(app.job._id, { status: JOB_STATUS.FULL });
		}

		// UPDATE REST APPLICATIONS OF APPLICANT TO REJECTED
		const restApps = await Application.updateMany(
			{
				_id: { $ne: app._id },
				applicant: applicantId,
			},
			{ status: APPLICATION_STATUS.REJECTED }
		);
	}

	res.status(201).json({
		status: 'success',
		data: { app },
	});
});

// This gives all the employees of a recruiter
exports.getMyEmployees = handleAsync(async (req, res, next) => {
	const filter = {
		status: APPLICATION_STATUS.ACCEPTED,
		recruiter: req.user._id,
	};

	const employees = await Application.find(filter)
	
	res.status(200).json({
		status: 'success',
		data: { employees },
	});
});

// This gives all type of applications of the applicant
exports.getMyApplications = handleAsync(async (req, res, next) => {
	const apps = await Application.find({ applicant: req.user._id });
	res.status(200).json({
		status: 'success',
		data: { apps },
	});
});

// This is a general middleware to check open applications of an applicant
exports.checkOpenApplications = handleAsync(async (req, res, next) => {
	const len = await Application.countDocuments({
		status: { $ne: APPLICATION_STATUS.REJECTED },
		applicant: req.user._id,
	});

	if (len >= 10)
		return next(new AppError('There are already 10 open applications.'));
	next();
});
