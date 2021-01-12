const User = require('../models/UserModel');
const Recruiter = require('../models/RecruiterModel');
const Applicant = require('../models/ApplicantModel');

const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');
const { ROLES } = require('../utils/constants');

exports.getUser = handleAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	console.log(user);
	res.status(201).json({
		status: 'success',
		data: { user },
	});
});

exports.updateUser = handleAsync(async (req, res, next) => {
	const options = {
		new: true,
		runValidators: true,
	};

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
		);
	} else if (req.user.role === ROLES.APPLICANT) {
		user = await Applicant.findByIdAndUpdate(
			req.user._id,
			{
				name: req.body.name,
				skills: req.body.skills,
				education: req.body.education,
			},
			options
		);
	}
	if (!user)
		return next(new AppError('The user doesnot exist anymore.', 404));
	res.status(202).json({
		status: 'success',
		data: { user },
	});
});

exports.getAllUsers = handleAsync(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		status: 'success',
		data: { users },
	});
});
