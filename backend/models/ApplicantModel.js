const mongoose = require('mongoose');

const userModel = require('./UserModel');

const applicantSchema = new mongoose.Schema({
	education: [
		{
			institution: { type: String },
			startYear: { type: Date },
			endYear: { type: Date },
		},
	],
});

const applicantModel = userModel.discriminator('Applicant', applicantSchema);

module.exports = applicantModel;
