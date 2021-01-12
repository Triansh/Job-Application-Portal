const mongoose = require('mongoose');
const { APPLICATION_STATUS } = require('../utils/constants');
const { checkWords } = require('../utils/validation');
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

applicationSchema.pre(/^find/, function (next) {
	// this.populate({
	// 	path: 'job',
	// 	select: '-__v',
	// });
	this.populate({
		path: 'applicant',
		select: '-__v ',
	});
	next();
});

// applicationSchema.post(
// 	'findOneAndUpdate',
// 	// { document: true, query: false },
// 	async function () {
// 		const {
// 			applicant: { _id },
// 		} = await this.model.findById(this.getQuery());
// 		const appAC = await this.model.find({
// 			applicant: _id,
// 			status: APPLICATION_STATUS.ACCEPTED,
// 		});
// 		if (appAC.length) {
// 			await this.model.updateMany(
// 				{
// 					applicant: _id,
// 					status: {
// 						$ne: APPLICATION_STATUS.ACCEPTED,
// 						$ne: APPLICATION_STATUS.CANCELLED,
// 					},
// 				},
// 				{ status: APPLICATION_STATUS.REJECTED }
// 			);
// 		}
// 	}
// );

const applicationModel = mongoose.model('Application', applicationSchema);
module.exports = applicationModel;
