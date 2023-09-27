const { Router } = require('express');
const {
    getListWithDifferentUnits,
    getListWithDifferentLanguages,
    getListByCloudyDays
} = require('../controllers/getListFiltered');

const rutas = Router();

rutas.get('/next30WeatherUnits', getListWithDifferentUnits);
rutas.get('/next30WeatherLanguages', getListWithDifferentLanguages);
rutas.get('/cloudy', getListByCloudyDays);

module.exports = rutas;