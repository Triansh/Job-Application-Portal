const express = require('express');
const authenticationHandlers = require('../auth/authentication');
const { protect } = require('../auth/authorization');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', authenticationHandlers.login);
router.post('/register', authenticationHandlers.signup);

router.route('/all').get(userController.getAllUsers); // for debugging

// ALWAYS PROTECT AFTER THIS
router.use(protect);

router
	.route('/')
	.get(userController.getProfile)
	.patch(userController.updateProfile);

module.exports = router;
