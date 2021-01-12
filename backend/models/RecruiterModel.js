const mongoose = require('mongoose');

const userModel = require('./UserModel');
const { checkWords, isContact } = require('../utils/validation');

const recruiterSchema = new mongoose.Schema(
	{
		contact: {
			type: String,
			required: [true, 'A contact number is required'],
			validate: {
				validator: function (v) {
					return isContact(v);
				},
			},
		},
		bio: {
			type: String,
			required: [true, 'A bio is required'],
			validate: {
				validator: function (v) {
					return checkWords(v, 250);
				},
				message: 'Bio must be less than 250 words',
			},
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
