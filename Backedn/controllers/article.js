'use strict'

const validator = require('validator');
const fs = require('fs');
const path = require('path');

const { find } = require('../models/article');
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

        let query = Article.find({});
        let last = req.params.last;
        
        if(last || last != undefined){
            query.limit(5);
        }


        //find
        query.sort('-_id').exec((error, articles)=>{

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
    },//end getarticles

    getArticle: (req, res)=>{

        //recoger el id de la url
        let articleId = req.params.id;

        //comprobar el articulo
        if(!articleId || articleId == null || articleId == undefined){
            return res.status(404).send({
                status: 'error',
                mensaje: 'No existe el articulo !!!'
            });
        }
        //buscar el  articlo
        Article.findById(articleId, (err, article)=>{

            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No existe el articulo !!!'
                });
            }

            //devolver json
            return res.status(200).send({
                status: 'succes',
                article
            });
        })
        
    },

    update: (req, res) => {

        //recoger id del articulo por url
        let articleId = req. params.id;

        //recoger los datos que llegar por put
        let params = req.body;

        //validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(error){
            return res.status(200).send({
                status: 'error',
                mensaje: 'Faltan datos por enviar!!!'
            });
        }

        if(validate_title && validate_content){
              //find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdate)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        mensaje: 'Error al actualizar'
                    });
                }
                if(!articleUpdate){
                    return res.status(404).send({
                        status: 'eNo exixte el articulo!!!'
                    });
                }
                return res.status(200).send({
                    status: 'succes',
                    article: articleUpdate
                });
            });
        }else{
            return res.status(200).send({
                status: 'error',
                mensaje: 'Validacion no es correcta!!!'
            });
        }
    },

    delete: (req, res) => {

        //Recoger id de la url
        let articleId = req.params.id;

        //find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved)=>{
            if(err){
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'Error al eliminar el articulo!!!'
                });
            }

            if(!articleRemoved){
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'No se ha eliminado el articulo, posiblemente no exista!!!'
                });
            }
            return res.status(200).send({
                status: 'Succes',
                article: articleRemoved
            });
        });
    },

    upload: (req, res) =>{
        //configurar el modulo del connect multiparty router/article.js

        //Recoger el fichero de la peticion
        let file_name = 'Imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'Error',
                message: file_name
            });
        }

        //conseguir nombre y extencion del archivo
        let file_path = req.files.file0.path;
        let file_split = file_path.split('\\');

        // ADVERTENCIA EN LINUX O MAC
        // let file_split = file_path.split('/')

        //Nombre del archivo
        let fileName = file_split[2];
        
        //Extencion del fichero
        let extencion_split = fileName.split('\.');
        let file_ext = extencion_split[1];

        // comparar la extension, solo imagenes, si es invalido borrar el fichero.
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            //borrar el arhico subido
            fs.unlink(file_path, (err)=>{
                return res.status(200).send({
                    status: 'Error',
                    message: 'La extencion de la imagen no es valida'
                });
            });

        }else{
            //si todo es valido
            let articleId = req.params.id
            Article.findOneAndUpdate({_id: articleId}, {image: fileName}, {new: true}, (err, articleUpdate)=>{
                
                if(err || !articleUpdate){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al giuardar la imagen del articulo'
                    });
                }
                
                return res.status(200).send({
                    status: 'Sucees',
                    article: articleUpdate
                });
            });
        //buscar el articulo, asignarle el nombre de la imgen y actualizarlo.
        }

        
    }// end upload

}; //end controllers

module.exports = controller;