const express = require('express');
const applicationController = require('../controllers/applicationController');
const { protect, restrictUsers } = require('../auth/authorization');
const { ROLES } = require('../utils/constants');

const router = express.Router();

// FOR DEBUGGING
router.route('/all').get(applicationController.getAllApplications);

router.use(protect);

router
	.route('/')
	.get(
		restrictUsers(ROLES.APPLICANT),
		applicationController.getMyApplications
	)
	.post(
		restrictUsers(ROLES.APPLICANT),
		applicationController.checkOpenApplications,
		applicationController.createApplication
	);

router
	.route('/employees')
	.get(restrictUsers(ROLES.RECRUITER), applicationController.getMyEmployees);

router.route('/my').get();

router
	.route('/:id')
	.get(applicationController.getApplication)
	.patch(
		restrictUsers(ROLES.RECRUITER),
		applicationController.updateApplicationStatus
	);

module.exports = router;
