const Job = require('../models/JobModel');

exports.getJobs = async (req, res) => {
	try {
		const job = await Job.find();
		console.log(job);
		res.status(201).json({
			status: 'success',
			data: job,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};

exports.createJob = async (req, res) => {
	try {
		console.log(req.body);
		const job = await Job.create(req.body);
		res.status(201).json({
			status: 'success',
			data: job,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};

exports.updateJob = async (req, res, next) => {
	try {
		const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!job)
			return res.status(404).json({
				status: 'failure',
				error: e,
			});
		res.status(202).json({
			status: 'success',
			data: job,
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};

exports.deleteJob = async (req, res, next) => {
	try {
		const job = await Job.findByIdAndDelete(req.params.id);
		if (!job) {
			return res.status(404).json({
				status: 'failure',
				error: 'Page Not found',
			});
		}
		res.status(204).json({
			status: 'success',
		});
	} catch (e) {
		res.status(400).json({
			status: 'failure',
			error: e,
		});
	}
};
