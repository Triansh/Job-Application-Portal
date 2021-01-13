const express = require('express');

const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');
const { protect, restrictUsers } = require('../auth/authorization');
const { ROLES } = require('../utils/constants');

const router = express.Router();


router.use(protect);

router
	.route('/all')
	.get(restrictUsers(ROLES.APPLICANT), jobController.getAllJobs);

router
	.route('/:id') // job id
	.post(
		restrictUsers(ROLES.APPLICANT),
		applicationController.checkOpenApplications,
		applicationController.createApplication
	);

router.use(restrictUsers(ROLES.RECRUITER));

router
	.route('/')
	.get(jobController.getMyActiveJobs)
	.post(jobController.createJob);

router
	.route('/:id') // job id
	.get(applicationController.getNRApplicationsForJob)
	.patch(jobController.updateJob)
	.delete(jobController.deleteJob);

module.exports = router;
