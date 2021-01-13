const jobStatusHandler = async (jobId) => {
	try {
		let job = await Job.findById(jobId).populate('apps');
		const { applications, positions, apps, status } = job;

		const totalAccepted = apps.map(
			(item) => item.status === APPLICATION_STATUS.ACCEPTED
		).length;
		const total = apps.length;

		options = { runValidators: true, new: true };

		if (totalAccepted >= positions || total >= applications) {
			if (status === JOB_STATUS.AVAILABLE) {
				job = await Job.findByIdAndUpdate(
					jobId,
					{ status: JOB_STATUS.FULL },
					options
				);
			}
		} else if (status === JOB_STATUS.FULL) {
			job = await Job.findByIdAndUpdate(
				jobId,
				{ status: JOB_STATUS.AVAILABLE },
				options
			);
		}
		return { status: 'success', data: { job } };
	} catch (error) {
		return { status: 'failure', error };
	}
};

module.exports = jobStatusHandler;
