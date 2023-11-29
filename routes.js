// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Defina suas rotas aqui, por exemplo:
router.use('/', controller);

module.exports = router;
