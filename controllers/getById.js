const axios = require('axios');
const { request, response} = require('express');

const getWeatherByNumberDay = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo by number day");
}

const getWeatherByLastRainyDay = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo by last rainy day");
}

const getWeatherByLastSunnyDay = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo by last sunny day");
}

module.exports = {
    getWeatherByNumberDay,
    getWeatherByLastRainyDay,
    getWeatherByLastSunnyDay
};