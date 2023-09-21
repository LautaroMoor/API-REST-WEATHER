const { Router } = require('express');
const {
    getWeatherByCity,
    getWeatherByNextRainyDay,
    getWeatherByLastSunnyDay
} = require('../controllers/getById');

const rutas = Router();

rutas.get('/city', getWeatherByCity);
rutas.get('/next-rainy-day', getWeatherByNextRainyDay);
rutas.get('/next-sunny-day', getWeatherByLastSunnyDay);

module.exports = rutas;