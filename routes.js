// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.use('/', controller);

module.exports = router;
