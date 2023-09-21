const { Router } = require('express');
const {
    getListWithDifferentUnits,
    getListByRainyDays,
    getListByCloudyDays
} = require('../controllers/getListFiltered');

const rutas = Router();

rutas.get('/next30WeatherUnits', getListWithDifferentUnits);
rutas.get('/rainy', getListByRainyDays);
rutas.get('/cloudy', getListByCloudyDays);

module.exports = rutas;