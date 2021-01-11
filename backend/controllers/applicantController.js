const Applicant = require('../models/ApplicantModel');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');


exports.getApplicants = handleAsync(async (req, res, next) => {
	const user = await Applicant.find();
	console.log(user);
	res.status(201).json({
		status: 'success',
		data: user,
	});
});

exports.createApplicant = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const user = await Applicant.create(req.body);
	res.status(201).json({
		status: 'success',
		data: user,
	});
});
