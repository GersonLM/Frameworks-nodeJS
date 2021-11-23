'use strict'

const { Schema, mongo } = require("mongoose");

var mongoose = require('mongoose');
var schema = mongoose.schema;

var articleSchema = Schema({
    titulo: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String
})

module.exports = mongoose.model('Article', articleSchema);
//MongoDB --> articles --> guarda documentos de este tipo y con estrctura dentro de la coleccion
