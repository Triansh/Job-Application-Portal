const express = require('express');
const authHandlers = require('./authHandlers');

const router = express.Router();

router.post('/login', authHandlers.login);
router.post('/register', authHandlers.signup);

module.exports = router;
