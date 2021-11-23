'use estrict'

//cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');



//Ejecutar express (http)
var app = express();


//Cargar ficheros rutas
const article_routes = require('./routes/article')

//Middlewares
app.use(bodyParser.urlencoded({extended: false})); // --> Carga el body parsel
app.use(bodyParser.json());  //-->Convierte cualquire tipo de dinfo que llegue a modo json

//CORS

//Añadir prefijos a rutas / Cargar rutas
app.use('/api',article_routes);

//Ruta o metodo de prueba para la api rest


// app.get('/datos-curso', (req, res)=>{
//     console.log('hola mundo');
//     return res.status(200).send({
//         curso: 'Primera prueba con node.js',
//         autor: 'Gerson Menjivar',
//         url: 'lopezmenjivar.sv'
//     });
// });

//Exportar modulo (fichero actual)
module.exports = app;