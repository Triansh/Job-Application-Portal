const mongoose = require('mongoose');
const { APPLICATION_STATUS } = require('../utils/status');
const userModel = require('./UserModel');

const applicationSchema = new mongoose.Schema(
	{
		job: {
			type: mongoose.Schema.ObjectId,
			ref: 'Job',
		},
		applicant: {
			type: mongoose.Schema.ObjectId,
			ref: 'Applicant',
		},
		status: {
			type: String,
			default: APPLICATION_STATUS.NONE,
		},
	},
	{ collection: 'Application' }
);

applicationSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'job',
		select: '-__v',
	});
	this.populate({
		path: 'applicant',
		select: '-__v',
	});
	next();
});

const applicationModel = mongoose.model('Application', applicationSchema);
module.exports = applicationModel;
