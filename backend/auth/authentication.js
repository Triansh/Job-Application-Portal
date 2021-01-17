const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/UserModel');
const Recruiter = require('../models/RecruiterModel');
const Applicant = require('../models/ApplicantModel');
const AppError = require('../utils/AppError');
const handleAsync = require('../utils/handleAsync');
const { ROLES } = require('../utils/constants');

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
		user,
	});
};

exports.signup = handleAsync(async (req, res, next) => {
	const { role } = req.body;
	if (!role) return next(new AppError('A role must be specified.', 400));

	if (role === ROLES.RECRUITER) {
		const newUser = await Recruiter.create(req.body);
		sendToken(newUser, 201, res);
	} else if (role === ROLES.APPLICANT) {
		const newUser = await Applicant.create(req.body);
		sendToken(newUser, 201, res);
	} else {
		return next(new AppError('This is not a valid role.', 400));
	}
});

exports.login = handleAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError('Please provide email and password', 400));

	const user = await User.findOne({ email }).select('password');
	if (!user) return next(new AppError('Invalid Credentials', 401));

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return next(new AppError('Invalid Credentials', 401));

	sendToken(user, 200, res);
});
