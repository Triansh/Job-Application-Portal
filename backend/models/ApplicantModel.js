const mongoose = require('mongoose');
const validator = require('validator');

const applicantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	email: {
		type: String,
		required: [true, 'A user must have an email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provie a correct email'],
	},
	education: {
		institution: { type: String },
		startYear: { type: Date },
		endYear: { type: Date },
	},
});

const applicantModel = mongoose.model('Applicant', applicantSchema);

module.exports = applicantModel;
