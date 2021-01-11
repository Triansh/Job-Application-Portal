const Application = require('../models/ApplicationModel');
const BasicFilter = require('../utils/BasicFilter');
const { handleAsync } = require('../utils/errorHandler');
const AppError = require('../utils/AppError');

exports.getAllApplications = handleAsync(async (req, res, next) => {
	const filteredApplications = new BasicFilter(Application.find(), req.query)
		.filter()
		.sort();

	const apps = await filteredApplications.query;
	console.log(apps);
	res.status(200).json({
		status: 'success',
		data: apps,
	});
});

exports.createApplication = handleAsync(async (req, res, next) => {
	console.log(req.body);
	const apps = await Application.create(req.body);
	res.status(201).json({
		status: 'success',
		data: apps,
	});
});

exports.updateApplication = handleAsync(async (req, res, next) => {
	const app = await Application.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!app) return next(new AppError('The application doesnot exist.', 404));

	res.status(201).json({
		status: 'success',
		data: app,
	});
});

exports.getApplication = handleAsync(async (req, res, next) => {
	const app = await Application.findById(req.params.id);
	if (!app) return next(new AppError('The application doesnot exist.', 404));

	res.status(200).json({
		status: 'success',
		data: app,
	});
});
