const express = require('express');
const recruiterController = require('../controllers/recruiterController');

const router = express.Router();

router
	.route('/')
	.get(recruiterController.getRecruiters)
	.post(recruiterController.createRecruiter);

module.exports = router;
