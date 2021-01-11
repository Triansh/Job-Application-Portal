const express = require('express');
const authenticationHandlers = require('../auth/authentication');
const { protect, restrictUsers } = require('../auth/authorization');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', authenticationHandlers.login);
router.post('/register', authenticationHandlers.signup);

// FOR DEBUGGING
router.route('/all').get(userController.getAllUsers);

// ALWAYS PROTECT AFTER THIS
router.use(protect);

router.route('/').get(userController.getUser).patch(userController.updateUser);

module.exports = router;
