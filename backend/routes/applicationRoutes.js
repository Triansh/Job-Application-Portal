const express = require('express');
const applicationController = require('../controllers/applicationController');
const { protect } = require('../auth/authorization');

const router = express.Router();

router
	.route('/')
	.get(protect, applicationController.getAllApplications)
	.post(applicationController.createApplication);

router
	.route('/:id')
	.get(applicationController.getApplication)
	.patch(applicationController.updateApplication);

module.exports = router;
