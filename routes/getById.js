const { Router } = require('express');
const {
    getWeatherByNumberDay,
    getWeatherByLastRainyDay,
    getWeatherByLastSunnyDay
} = require('../controllers/getById');

const rutas = Router();

rutas.get('/:number', getWeatherByNumberDay);
rutas.get('/lastRainy', getWeatherByLastRainyDay);
rutas.get('/lastSunny', getWeatherByLastSunnyDay);

module.exports = rutas;