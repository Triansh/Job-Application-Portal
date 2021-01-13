const mongoose = require('mongoose');
const { checkInt, isDateInFuture } = require('../utils/validation');

const { JOB_STATUS, JOB_TYPES } = require('../utils/constants');

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'A job must have a title'],
		},
		recruiter: {
			type: mongoose.Schema.ObjectId,
			ref: 'Recruiter',
		},
		applications: {
			type: Number,
			validate: {
				validator: function (v) {
					return checkInt(v, 1);
				},
				message:
					'The number of applications must be an integer greater than zero',
			},
		},
		positions: {
			type: Number,
			validate: {
				validator: function (v) {
					return checkInt(v, 1);
				},
				message:
					'The number of positions must be an integer greater than zero',
			},
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		deadline: {
			type: Date,
			required: [true, 'A deadline for application is required'],
			validate: {
				validator: function (d) {
					return isDateInFuture(d);
				},
				message: 'The deadline must have a date in future.',
			},
		},
		skills: {
			type: [String],
			default: [],
		},
		type: {
			type: String,
			required: [true, 'A job type must be specified'],
			enum: {
				values: [
					JOB_TYPES.FULL_TIME,
					JOB_TYPES.WORK_FROM_HOME,
					JOB_TYPES.PART_TIME,
				],
				message:
					'Type of job must be among - Full time, Part time, Work from home',
			},
		},
		duration: {
			type: Number,
			required: [true, 'A duration must be specified'],
			validate: {
				validator: function (v) {
					return checkInt(v, 0);
				},
				message: 'The number of months must be an integer atleast zero',
			},
			max: [6, 'The number of months must be an integer less than 7.'],
		},
		salary: {
			type: Number,
			validate: {
				validator: function (v) {
					return checkInt(v, 0);
				},
				message: 'This must be a integer atleast zero',
			},
			required: [true, 'Please specify the salary per month'],
		},
		status: {
			type: String,
			default: JOB_STATUS.AVAILABLE,
			enum: {
				values: [JOB_STATUS.AVAILABLE, JOB_STATUS.FULL],
				message: 'Status must be full or available',
			},
		},
		review: [
			{
				rating: {
					type: Number,
					required: [true, 'A review must have a rating'],
					min: [1, 'Rating must be atleast 1.'],
					max: [5, 'Rating cam be upto 5'],
				},
				rater: {
					type: mongoose.Schema.ObjectId,
					ref: 'Applicant',
				},
			},
		],
	},
	{
		collection: 'Job',
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

jobSchema.virtual('avgRating').get(function () {
	const { review } = this;
	if (!review || !review.length) return 0;

	const avgRating =
		review.reduce((prev, { rating }) => prev + rating, 0) / review.length;
	return Math.round(avgRating * 10) / 10;
});

jobSchema.virtual('allApplications', {
	ref: 'Application',
	foreignField: 'job',
	localField: '_id',
});

jobSchema.virtual('noOfApplicants', {
	ref: 'Application',
	foreignField: 'job',
	localField: '_id',
	count: true,
});

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;
