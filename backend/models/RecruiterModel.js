const mongoose = require('mongoose');
const validator = require('validator');

const recruiterSchema = new mongoose.Schema({
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
	contact: {
		type: String,
	},
	bio: {
		type: String,
	},
});

const recruiterModel = mongoose.model('Recruiter', recruiterSchema);

module.exports = recruiterModel;
