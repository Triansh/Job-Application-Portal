const Job = require('../models/JobModel')

exports.getJobs = async (req, res) => {

    try {
        const doc = await Job.find();
        console.log(doc)
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

exports.createJob = async (req, res) => {
	try {
        console.log(req.body)
		const doc = await Job.create(req.body);
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
