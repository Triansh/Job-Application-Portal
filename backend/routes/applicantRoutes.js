const express = require('express');
const applicantController = require('../controllers/applicantController');

const router = express.Router();

router
	.route('/')
	.get(applicantController.getApplicants)
	.post(applicantController.createApplicant);

module.exports = router;
