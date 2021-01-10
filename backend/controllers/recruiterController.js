const Recruiter = require('../models/RecruiterModel')

exports.getRecruiters = async (req, res) => {

    try {
        const doc = await Recruiter.find();
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

exports.createRecruiter = async (req, res) => {
	try {
        console.log(req.body)
		const doc = await Recruiter.create(req.body);
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
