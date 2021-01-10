const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

router
	.route('/')
	.get(applicationController.getApplications)
	.post(applicationController.createApplication);

module.exports = router;
