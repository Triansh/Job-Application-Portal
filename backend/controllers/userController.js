const User = require('../models/UserModel');
const Recruiter = require('../models/RecruiterModel');
const Applicant = require('../models/ApplicantModel');

const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/AppError');
const { ROLES } = require('../utils/constants');

// --------------------------------------------------------- DEBUGGING
exports.getAllUsers = handleAsync(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		status: 'success',
		data: { users },
	});
});
// --------------------------------------------------------------

// Get Profile of User
exports.getProfile = handleAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id).select('-email -__v');
	res.status(201).json({
		status: 'success',
		data: { data: user },
	});
});

// Any user can update its profile
exports.updateProfile = handleAsync(async (req, res, next) => {
	const options = { new: true, runValidators: true };

	let user;
	if (req.user.role === ROLES.RECRUITER) {
		user = await Recruiter.findByIdAndUpdate(
			req.user._id,
			{
				name: req.body.name,
				contact: req.body.contact,
				bio: req.body.bio,
			},
			options
		).select('-email -__v');
	} else if (req.user.role === ROLES.APPLICANT) {
		user = await Applicant.findByIdAndUpdate(
			req.user._id,
			{
				name: req.body.name,
				skills: req.body.skills,
				education: req.body.education,
			},
			options
		).select('-email -__v');
	}
	if (!user)
		return next(new AppError('The user doesnot exist anymore.', 404));
	res.status(202).json({
		status: 'success',
		data: { user },
	});
});
