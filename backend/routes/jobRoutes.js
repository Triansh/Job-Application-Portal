const express = require('express');

const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');
const { protect, restrictUsers } = require('../auth/authorization');
const { ROLES } = require('../utils/constants');

const router = express.Router();

// FOR DEBUGGING PURPOSES
router.route('/all').get(jobController.getJobs);

router.use(protect);
router.use(restrictUsers(ROLES.RECRUITER));

router.route('/').post(jobController.createJob);

router.route('/active').get(jobController.getMyActiveJobs);

router
	.route('/:id')
	.patch(jobController.updateJob)
	.delete(jobController.deleteJob)
	.get(applicationController.getActiveApplicationsForJob);

module.exports = router;
