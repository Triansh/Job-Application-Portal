const Applicant = require('../models/ApplicantModel');

exports.getApplicants = async (req, res) => {
	try {
		const doc = await Applicant.find();
		console.log(doc);
		res.status(201).json({
			status: 'success',
			data: doc,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};

exports.createApplicant = async (req, res) => {
	try {
		console.log(req.body);
		const doc = await Applicant.create(req.body);
		res.status(201).json({
			status: 'success',
			data: doc,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};
