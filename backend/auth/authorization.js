const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.protect = handleAsync(async (req, res, next) => {
	// Check Existence of token
	let token;
	const { authorization } = req.headers;
	if (authorization && authorization.startsWith('Bearer')) {
		token = authorization.split(' ')[1];
	}
	if (!token) return next(new AppError('Please log in for access', 401));

	// Verification of token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	// Check existence of User
	const currentUser = await User.findById(decoded.id);
	if (!currentUser)
		return next(new AppError('This user doesnot exists', 401));

	// GRANT ACCESS
	req.user = currentUser;
	console.log(req.user);
	next();
});

exports.restrictUsers = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return next(new AppError('Permission denied', 403));
		}
		next();
	};
};
