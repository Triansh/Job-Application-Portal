const Job = require('../models/JobModel');
const Application = require('../models/ApplicationModel');
const Applicant = require('../models/ApplicantModel');

const { JOB_STATUS, APPLICATION_STATUS } = require('../utils/constants');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.rateJob = handleAsync(async (req, res, next) => {
	// application id in params
	const app = await Application.findById(req.params.id);
	if (!app) return next(new AppError('No such application found', 404));

	if (app.applicant._id.toString() !== req.user._id.toString())
		return next(new AppError('Permission Denied to rate', 403));

	if (app.status !== APPLICATION_STATUS.ACCEPTED)
		return next(new AppError('You are not authorized to rate', 403));

	const { review } = await Job.findById(app.job);
	const exists = review.map((rev) => rev.rater === req.user._id).length !== 0;

	if (exists)
		return next(new AppError('You have already rated for this job', 400));

	const newReview = {
		rating: req.body.rating,
		rater: req.user._id,
	};

	const job = await Job.findByIdAndUpdate(
		app.job,
		{ $push: { review: newReview } },
		{ runValidators: true, new: true }
	);
	if (!job) return next(new AppError('No such job found', 404));

	res.status(202).json({
		status: 'success',
		data: { job },
	});
});

exports.rateEmployee = handleAsync(async (req, res, next) => {
	// applicant id in params
	const app = await Application.find({
		applicant: req.params.id,
		status: APPLICATION_STATUS.ACCEPTED,
		recruiter: req.user._id,
	});

	if (!app || app.length === 0)
		return next(new AppError('No such Employee found', 404));

	const { review } = await Applicant.find(req.params.id);
	const exists = review.map((rev) => rev.rater === req.user._id).length;

	if (exists)
		return next(new AppError('You have already rated this employee', 400));

	const newReview = {
		rating: req.body.rating,
		rater: req.user._id,
	};

	const employee = await Applicant.findByIdAndUpdate(
		req.params.id,
		{ $push: { review: newReview } },
		{ runValidators: true, new: true }
	);

	res.status(202).json({
		status: 'success',
		data: { employee },
	});
});
