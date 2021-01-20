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
	);

router.use(restrictUsers(ROLES.RECRUITER));

router.route('/employees').get(applicationController.getMyEmployees);

router
	.route('/:id')
	.get(applicationController.getApplication) // for debugging
	.patch(applicationController.updateApplicationStatus);

module.exports = router;
