const mongoose = require('mongoose');

const userModel = require('./UserModel');

const recruiterSchema = new mongoose.Schema(
	{
		contact: {
			type: String,
		},
		bio: {
			type: String,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

recruiterSchema.virtual('jobs', {
	ref: 'Job',
	localField: '_id',
	foreignField: 'recruiter',
});

const recruiterModel = userModel.discriminator('Recruiter', recruiterSchema);

module.exports = recruiterModel;
