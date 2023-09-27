const axios = require('axios');
const { request, response} = require('express');

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Lautaro
const getListWithDifferentUnits = async (req = request, res = response) => {  
    try {
        const { city, units } = req.query;

        //Segun la API
        // ***Units***: standard, 
        //              metric 
        //              imperial
        // If you do not use the units parameter, standard units will be applied by default.

        // Realiza una solicitud a la API de OpenWeatherMap para obtener el pronóstico extendido
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/forecast', {
            params: {
            q: city,
            cnt: 30,
            lang:"es",
            appid: OPENWEATHERMAP_API_KEY,
            units: units ? units : 'standard' , 
            },
        });
        
        const pronostico = response.data;
        // console.log(response);
        res.status(response.status).json(pronostico.list);
    } catch (error) {
        if (error.response) {
            // Si hay una respuesta de error desde la API de OpenWeatherMap
            res.status(error.response.status).json({
            cod: error.response.data.cod,
            message: error.response.data.message,
            });
        } else {
            // Si ocurre un error durante la solicitud (por ejemplo, problemas de red)
            console.error('Error al obtener el pronóstico:', error.message);
            res.status(500).json({ error: 'Error al obtener el pronóstico' });
        }
    }
    
}

// Pipi
const getListWithDifferentLanguages  = async (req = request, res = response) => {  
    try {
        const { city, lang } = req.query;
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/forecast', {
            params: {
            q: city,
            cnt: 30,
            lang: lang ? lang: 'es',
            appid: OPENWEATHERMAP_API_KEY,
            units:'standard' 
            },
        });
        
        const pronostico = response.data;

        res.status(response.status).json(pronostico.list);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
            cod: error.response.data.cod,
            message: error.response.data.message,
            });
        } else {
            console.error('Error al obtener el pronóstico:', error.message);
            res.status(500).json({ error: 'Error al obtener el pronóstico' });
        }
    }
}

// Gabo
const getListByCloudyDays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list by cloudy days");
}

module.exports = {
    getListWithDifferentUnits,
    getListWithDifferentLanguages ,
    getListByCloudyDays
};