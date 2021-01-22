const { APPLICATION_STATUS, JOB_STATUS } = require('./constants');
const AppError = require('./AppError');

const jobStatusHandler = async (jobId) => {
	try {
		let job = await Job.findById(jobId)
			.populate({
				path: 'allApplications',
				match: { status: APPLICATION_STATUS.ACCEPTED },
			})
			.populate('noOfApplicants');

		options = { runValidators: true, new: true };

		const { noOfApplicants, positions, applications, allApplications } = job;
		totalAccepted = allApplications.length;

		console.log(noOfApplicants, applications, totalAccepted, positions);

		if (noOfApplicants >= applications || totalAccepted >= positions) {
			if (status === JOB_STATUS.AVAILABLE) {
				job = await Job.findByIdAndUpdate(jobId, { status: JOB_STATUS.FULL }, options);
			}
		} else if (status === JOB_STATUS.FULL) {
			job = await Job.findByIdAndUpdate(jobId, { status: JOB_STATUS.AVAILABLE }, options);
		}

		return { status: 'success', data: { job } };
	} catch (error) {
		return new AppError('Something went terribly wrong...', 500);
	}
};

module.exports = jobStatusHandler;
