const Recruiter = require('../models/RecruiterModel');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.getRecruiters = handleAsync(async (req, res, next) => {
	const doc = await Recruiter.find();
	console.log(doc);
	res.status(201).json({
		status: 'success',
		data: doc,
	});
});

exports.createRecruiter = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const doc = await Recruiter.create(req.body);
	res.status(201).json({
		status: 'success',
		data: doc,
	});
});
