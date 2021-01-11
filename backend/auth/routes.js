const express = require('express');
const authenticationHandlers = require('./authentication');

const router = express.Router();

router.post('/login', authenticationHandlers.login);
router.post('/register', authenticationHandlers.signup);

module.exports = router;
