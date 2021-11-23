'use strict'


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
    }
}; //end controllers

module.exports = controller;