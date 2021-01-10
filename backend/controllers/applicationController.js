const Application = require('../models/ApplicationModel');

exports.getApplications = async (req, res) => {
	try {
		const doc = await Application.find();
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

exports.createApplication = async (req, res) => {
	try {
		console.log(req.body);
		const doc = await Application.create(req.body);
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
