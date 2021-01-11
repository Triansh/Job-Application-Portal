const Recruiter = require('../models/RecruiterModel');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.getRecruiters = handleAsync(async (req, res, next) => {
	const user = await Recruiter.find().populate('jobs');
	res.status(201).json({
		status: 'success',
		data: user,
	});
});

exports.createRecruiter = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const user = await Recruiter.create(req.body);
	res.status(201).json({
		status: 'success',
		data: user,
	});
});

