const mongoose = require('mongoose');
const { checkInt } = require('../utils/validation');

const { JOB_STATUS } = require('../utils/constants');

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
		},
		skills: {
			type: [String],
			default: [],
		},
		type: {
			type: String,
			required: [true, 'A job type must be specified'],
			enum: {
				values: ['full-time', 'part-time', 'work-from-home'],
				message:
					'Type of job must be among - Full time, Part time, Work from home',
			},
		},
		duration: {
			type: Number,
			required: [true, 'A duration must be specified'],
			validate: {
				validator: function (v) {
					return checkInt(v, 1);
				},
				message:
					'The number of months must be an integer greater than zero',
			},
			max: [6, 'The number of months must be an integer less than 7.'],
		},
		salary: {
			type: Number,
			validate: {
				validator: function (v) {
					return checkInt(v, 1);
				},
				message: 'This must be a integer greater than zero',
			},
			required: [true, 'Please specify the salary per month'],
		},
		status: {
			type: String,
			default: JOB_STATUS.AVAILABLE,
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

// jobSchema.virtual('rating', {
// 	ref: 'Application',
// 	foreignField: 'job',
// 	localField: '_id',
// });

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;
