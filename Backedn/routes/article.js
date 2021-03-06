'use strict'

const express = require('express');

const articleControllers = require('../controllers/article');

const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload/articles'});

//Rutas de prueba
router.post('/datos-curso', articleControllers.datosCuros);
router.get('/test-de-controlador', articleControllers.test);

//Rutas utiles
router.post('/save', articleControllers.save);
router.get('/articles/:last?', articleControllers.getArticles);
router.get('/article/:id', articleControllers.getArticle);
router.put('/article-update/:id', articleControllers.update);
router.delete('/article-delete/:id', articleControllers.delete);

router.post('/upload-image/:id?', md_upload, articleControllers.upload);
router.get('/get-image/:image', articleControllers.getImage);
router.get('/search/:search?', articleControllers.search);

module.exports = router;