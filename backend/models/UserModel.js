const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			required: [true, 'A user must have an email'],
			unique: [true, 'This email already exists. Try with a different one.'],
			lowercase: true,
			validate: [validator.isEmail, 'Please provie a correct email'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
		},
	},
	{ discriminatorKey: 'role', collection: 'User' }
);

userSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(this.password, 12);

	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
