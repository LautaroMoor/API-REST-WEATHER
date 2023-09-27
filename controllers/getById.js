const axios = require('axios');
const { request, response} = require('express');

const getWeatherByCity = async (req = request, res = response) => { 
    console.log("Codigo by number day");
    try {
        const { city } = req.query;

        // Verifica si se proporcionó el parámetro city
        if (!city) {
            return res.status(400).json({ error: 'Debes proporcionar el parámetro city.' });
        }

        // Realiza una solicitud a la API de OpenWeatherMap para obtener el clima actual
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
            q: city,
            appid: process.env.OPENWEATHERMAP_API_KEY,
            lang:"es",
            units: 'metric', // Opcional: unidades métricas para temperatura en Celsius
            },
        });

        // Extrae los datos del clima actual
        const currentWeather = {
            city: response.data.name,
            temperature: response.data.main.temp,
            weatherDescription: response.data.weather[0].description,
        };

        res.status(response.status).json({ currentWeather });
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

// Cambiar Pipi 
const getWeatherByNextRainyDay = async (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo by last rainy day");
    try {
        const { city } = req.query;

        // Verifica si se proporcionó el parámetro city
        if (!city) {
        return res.status(400).json({ error: 'Debes proporcionar el parámetro city.' });
        }

        // Realiza una solicitud a la API de OpenWeatherMap para obtener el pronóstico extendido
        const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
            q: city,
            appid: process.env.OPENWEATHERMAP_API_KEY,
            lang: "es",
            units: 'metric',
        },
        });

        // Filtra los pronósticos para encontrar el próximo día lluvioso
        const forecasts = response.data.list;
        const rainyDay = forecasts.find((forecast) => {
        return forecast.weather.some((weather) => {
            return weather.main.toLowerCase().includes('rain');
        });
        });

        if (!rainyDay) {
        return res.status(404).json({ message: 'No se encontraron días lluviosos en el pronóstico.' });
        }

        const nextRainyDay = {
        date: new Date(rainyDay.dt * 1000), // Convierte la fecha Unix a formato legible
        temperature: rainyDay.main.temp,
        weatherDescription: rainyDay.weather[0].description,
        };

        res.status(200).json({ nextRainyDay });
    } catch (error) {
        if (error.response) {
        // Si hay una respuesta de error desde la API de OpenWeatherMap
        res.status(error.response.status).json({
            cod: error.response.data.cod,
            message: error.response.data.message,
        });
        } else {
        // Si ocurre un error durante la solicitud (por ejemplo, problemas de red)
        console.error('Error al obtener el pronóstico extendido:', error.message);
        res.status(500).json({ error: 'Error al obtener el pronóstico extendido' });
        }
    }
}

// Cambiar Gabo
const getWeatherByLastSunnyDay = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo by last sunny day");
}

module.exports = {
    getWeatherByCity,
    getWeatherByNextRainyDay,
    getWeatherByLastSunnyDay
};