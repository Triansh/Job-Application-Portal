const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/UserModel');
const Recruiter = require('../models/RecruiterModel');
const Applicant = require('../models/ApplicantModel');
const AppError = require('../utils/AppError');
const { handleAsync } = require('../utils/errorHandler');

const createSignToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
};

const sendToken = (user, statusCode, res) => {
	const token = createSignToken(user._id);

	// user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		token,
		data: { user },
	});
};

exports.signup = handleAsync(async (req, res, next) => {
	const { role } = req.body;
	if (!role) return next(new AppError('A role must be specified.', 400));

	if (role === 'Recruiter') {
		const newUser = await Recruiter.create(req.body);
		sendToken(newUser, 201, res);
	} else if (role === 'Applicant') {
		const newUser = Applicant.create(req.body);
		sendToken(newUser, 201, res);
	} else {
		return next(new AppError('This is not a valid role.', 400));
	}
});

exports.login = handleAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError('Please provide email and password', 400));

	const user = await User.findOne({ email });
	if (!user) return next(new AppError('Invalid Credentials', 401));

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return next(new AppError('Invalid Credentials', 401));

	sendToken(user, 200, res);
});
