const Application = require('../models/ApplicationModel');
const BasicFilter = require('../utils/BasicFilter');

exports.getApplications = async (req, res) => {
	const filteredApplications = new BasicFilter(Application.find(), req.query)
		.filter()
		.sort();

	try {
		const apps = await filteredApplications.query;
		console.log(apps);
		res.status(201).json({
			status: 'success',
			data: apps,
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
		const apps = await Application.create(req.body);
		res.status(201).json({
			status: 'success',
			data: apps,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};
