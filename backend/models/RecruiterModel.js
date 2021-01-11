const mongoose = require('mongoose');

const userModel = require('./UserModel');

const recruiterSchema = new mongoose.Schema({
	contact: {
		type: String,
	},
	bio: {
		type: String,
	},
});

const recruiterModel = userModel.discriminator('Recruiter', recruiterSchema);

module.exports = recruiterModel;
