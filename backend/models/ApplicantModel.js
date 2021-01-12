const mongoose = require('mongoose');

const userModel = require('./UserModel');

const applicantSchema = new mongoose.Schema({
	education: [
		{
			institution: {
				type: String,
				required: [true, 'An Institution is required'],
			},
			startYear: {
				type: Number,
				required: [true, 'A starting year is required'],
				validate: {
					validator: function (v) {
						return isYear(v);
					},
					message: 'Must be a valid year',
				},
			},
			endYear: {
				type: Number,
				validate: {
					validator: function (v) {
						return isYear(v);
					},
					message: 'Must be a valid year',
				},
			},
		},
	],
	skills: {
		type: [String],
	},
});

const applicantModel = userModel.discriminator('Applicant', applicantSchema);

module.exports = applicantModel;
