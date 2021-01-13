const mongoose = require('mongoose');

const { APPLICATION_STATUS } = require('../utils/constants');
const { checkWords } = require('../utils/validation');

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
		recruiter: {
			type: mongoose.Schema.ObjectId,
			ref: 'Recruiter',
		},
		sop: {
			type: String,
			required: [true, 'A SOP is required for applying.'],
			validate: {
				validator: function (v) {
					return checkWords(v, 250);
				},
				message: 'The SOP must be less than 250 words',
			},
		},
		status: {
			type: String,
			default: APPLICATION_STATUS.APPLIED,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ collection: 'Application' }
);

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });


const applicationModel = mongoose.model('Application', applicationSchema);
module.exports = applicationModel;
