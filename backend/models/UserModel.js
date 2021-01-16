const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is a required field.'],
		},
		email: {
			type: String,
			required: [true, 'Email is a required field.'],
			unique: [
				true,
				'This email already exists. Try with a different one.',
			],
			lowercase: true,
			validate: [validator.isEmail, 'Please provie a correct email.'],
		},
		password: {
			type: String,
			required: [true, 'Password is a required field.'],
			minlength: [8, 'Password should have atleast 8 characters.'],
			select: false,
		},
	},
	{ discriminatorKey: 'role', collection: 'User' }
);

userSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 12);
	this.password = hash;
	next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
