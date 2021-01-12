const express = require('express');
const { protect, restrictUsers } = require('../auth/authorization');
const { ROLES } = require('../utils/constants');
const { rateJob, rateEmployee } = require('../controllers/ratingController');

const router = express.Router();

router.use(protect);

router.route('/jobs/:id').patch(restrictUsers(ROLES.APPLICANT), rateJob);
router.route('/users/:id').patch(restrictUsers(ROLES.RECRUITER), rateEmployee);

module.exports = router;
