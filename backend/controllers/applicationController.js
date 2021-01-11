const Application = require('../models/ApplicationModel');
const BasicFilter = require('../utils/BasicFilter');

exports.getAllApplications = async (req, res) => {
	const filteredApplications = new BasicFilter(Application.find(), req.query)
		.filter()
		.sort();

	try {
		const apps = await filteredApplications.query;
		console.log(apps);
		res.status(200).json({
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

exports.updateApplication = async (req, res) => {
	try {
		const apps = await Application.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
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

exports.getApplication = async (req, res) => {
	console.log(req.params.id);
	try {
		const app = await Application.findById(req.params.id);
		if (!app) {
			return res.status(404).json({
				status: 'fail',
				error: 'No such application',
			});
		}
		res.status(200).json({
			status: 'success',
			data: app,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};
