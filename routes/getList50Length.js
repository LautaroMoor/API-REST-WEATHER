const { Router } = require('express');

const {
    getList30Weather,
    getList20Weather,
    getListOnlySundays
} = require('../controllers/getList50Length');

const rutas = Router();

rutas.get('/next30weather', getList30Weather); //Mediante una ciudad, te da el historial de clima de esa ciudad
rutas.get('/next20weather', getList20Weather);
rutas.get('/nextsundays', getListOnlySundays);

module.exports = rutas;