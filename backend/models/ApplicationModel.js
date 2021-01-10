const mongoose = require('mongoose');
const { APPLICATION_STATUS } = require('../utils/status');

const applicationSchema = new mongoose.Schema({
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
});

applicationSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'recruiter',
	});
	this.populate({
		path: 'applicant',
	});
	next();
});

const applicationModel = mongoose.model('Application', applicationSchema);
module.exports = applicationModel;
