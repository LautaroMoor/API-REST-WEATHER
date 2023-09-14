const { Router } = require('express');
const {
    getList50Fridays,
    getList50Saturdays,
    getList50Sundays
} = require('../controllers/getList50Length');

const rutas = Router();

rutas.get('/friday', getList50Fridays);
rutas.get('/saturday', getList50Saturdays);
rutas.get('/sunday', getList50Sundays);

module.exports = rutas;