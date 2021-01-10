const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.route('/')
.get(jobController.getJobs)
.post(jobController.createJob);

router
	.route('/:id')
	.patch(jobController.updateJob)
	.delete(jobController.deleteJob);

module.exports = router;
