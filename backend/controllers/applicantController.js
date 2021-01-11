const Applicant = require('../models/ApplicantModel');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');


exports.getApplicants = handleAsync(async (req, res, next) => {
	const doc = await Applicant.find();
	console.log(doc);
	res.status(201).json({
		status: 'success',
		data: doc,
	});
});

exports.createApplicant = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const doc = await Applicant.create(req.body);
	res.status(201).json({
		status: 'success',
		data: doc,
	});
});
