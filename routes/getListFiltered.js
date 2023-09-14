const { Router } = require('express');
const {
    getListBySunnyDays,
    getListByRainyDays,
    getListByCloudyDays
} = require('../controllers/getListFiltered');

const rutas = Router();

rutas.get('/sunny', getListBySunnyDays);
rutas.get('/rainy', getListByRainyDays);
rutas.get('/cloudy', getListByCloudyDays);

module.exports = rutas;