const { Router } = require('express');

const {
    getList30Weather,
    getList50Saturdays,
    getList50Sundays
} = require('../controllers/getList50Length');

const rutas = Router();

rutas.get('/next30weather', getList30Weather); //Mediante una ciudad, te da el historial de clima de esa ciudad
rutas.get('/saturday', getList50Saturdays);
rutas.get('/sunday', getList50Sundays);

module.exports = rutas;