'use strict'

const express = require('express');

const articleControllers = require('../controllers/article');

const router = express.Router();

//Rutas de prueba
router.post('/datos-curso', articleControllers.datosCuros);
router.get('/test-de-controlador', articleControllers.test);

//Rutas utiles
router.post('/save', articleControllers.save);
router.get('/articles', articleControllers.getArticles);


module.exports = router;