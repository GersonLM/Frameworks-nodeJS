'use strict'

const validator = require('validator');
const Article = require('../models/article');


const controller = {
    datosCuros: (req, res) => {
        console.log('hola mundo');
        return res.status(200).send({
            curso: 'Primera prueba con node.js',
            autor: 'Gerson Menjivar',
            url: 'lopezmenjivar.sv'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion testt de mi controlador de articulos'
        });
    },

    save: (req, res) => {
        //recoger parametros por post
        let params = req.body;
        
        //validar datos (validaror)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                mensaje: 'Faltan datos por enviar !!!'
            });  
        }

        if(validate_title && validate_content){
            //crear el objeto guardar
            let article = new Article();

            //asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //guardar el articulo
            article.save((error, articleStored)=>{

                if(error || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                //devolver una respuesta
                return res.status(200).send({
                    status: 'succes',
                    article: articleStored
                });


            });
            
        }else {
            return res.status(200).send({
                status: 'error',
                mensaje: 'Los datos no son validos !!!'
            }); 
        }

        
    },

    getArticles: (req, res) => {
        //find
        Article.find({}).sort('-_id').exec((error, articles)=>{

            if(error){
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error al devolver los Articulos !!!'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No hay articulos para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'Succes',
                articles
            });
        });


    }
}; //end controllers

module.exports = controller;