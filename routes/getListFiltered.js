const { Router } = require('express');
const {
    getListWithDifferentUnits,
    getListWithDifferentLanguages,
    getWeatherAboveTemperature
} = require('../controllers/getListFiltered');

const rutas = Router();

rutas.get('/next30WeatherUnits', getListWithDifferentUnits);
rutas.get('/next30WeatherLanguages', getListWithDifferentLanguages);
rutas.get('/temperature', getWeatherAboveTemperature);

module.exports = rutas;