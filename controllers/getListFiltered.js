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
const getWeatherAboveTemperature = async (req = request, res = response) => {
    try {
        const { city, temperature } = req.query;
        const lang = req.query.lang || 'es';

        if (!city || !temperature) {
            return res.status(400).json({ error: 'Debes proporcionar los parámetros city y temperature.' });
        }

        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                cnt: 30,
                lang,
                appid: OPENWEATHERMAP_API_KEY,
                units: 'metric', // Utilizamos unidades métricas para temperatura en Celsius
            },
        });

        const forecasts = response.data.list;

        // Filtra los pronósticos para encontrar los días con temperatura por encima del valor proporcionado
        const daysAboveTemperature = forecasts.filter((forecast) => {
            return forecast.main.temp > parseFloat(temperature);
        });

        if (daysAboveTemperature.length === 0) {
            return res.status(404).json({ message: 'No se encontraron días con temperatura por encima de la especificada.' });
        }

        res.status(200).json({ daysAboveTemperature });
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

module.exports = {
    getListWithDifferentUnits,
    getListWithDifferentLanguages ,
    getWeatherAboveTemperature
};