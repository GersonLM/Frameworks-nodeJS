'use strict'

const express = require('express');

const articleControllers = require('../controllers/article');

const router = express.Router();

router.post('/datos-curso', articleControllers.datosCuros);
router.get('/test-de-controlador', articleControllers.test);

module.exports = router;