const mongoose = require('mongoose');
const { JOB_STATUS } = require('../utils/status');

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
		},
		positions: {
			type: Number,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		deadline: {
			type: Date,
		},
		skills: {
			type: [String],
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
			min: [0, 'The number of months should be atleast zero'],
			max: [6, 'The number of months should be atleast zero'],
		},
		salary: {
			type: Number,
			min: [0, 'The number of months should be greater than zero'],
			required: [true, 'Please specify the salary per month'],
		},
		status: {
			type: String,
			default: JOB_STATUS.AVAILABLE,
		},
	},
	{ collection: 'Job' }
);

jobSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'recruiter',
		select: '-__v',
	});
	next();
});

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;
