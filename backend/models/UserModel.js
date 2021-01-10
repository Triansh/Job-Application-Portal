const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema(
	{
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
		password: {
			type: String,
		},
	},
	{ discriminatorKey: 'role', collection: 'User' }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;