const { Router } = require('express');
const {
    getWeatherByCity,
    getWeatherByNextRainyDay,
    getWeatherByNextSunnyDay
} = require('../controllers/getById');

const rutas = Router();

rutas.get('/city', getWeatherByCity);
rutas.get('/next-rainy-day', getWeatherByNextRainyDay);
rutas.get('/next-sunny-day', getWeatherByNextSunnyDay);

module.exports = rutas;