'use strict'

const mongoose = require('mongoose');
const app = require('./app');
let port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true})
        .then(()=> {
            console.log('La conexión a la base de datos se ha realizado bien!!');

            //crear servidor y poder escuhcar peticiones http
            app.listen(port, () => {
                console.log("servidor corriedno en http: //loocalhost", port);
            })
        });