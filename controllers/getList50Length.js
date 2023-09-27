const axios = require('axios');
const { request, response} = require('express');

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const getList30Weather = async (req = request, res = response) => {  
    console.log("Codigo list 30 days by city");
    try {
      const { city } = req.query;
      // Realiza una solicitud a la API de OpenWeatherMap para obtener el pronóstico extendido
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast', {
          params: {
          q: city,
          cnt: 30,
          lang:"es",
          appid: OPENWEATHERMAP_API_KEY,
          units: 'metric', // Opcional: unidades métricas para temperatura en Celsius
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

const getList20Weather = async (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list 50 length by saturdays");
    try {
      const { city } = req.query;
      // Realiza una solicitud a la API de OpenWeatherMap para obtener el pronóstico extendido
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast', {
          params: {
          q: city,
          cnt: 20,
          lang:"es",
          appid: OPENWEATHERMAP_API_KEY,
          units: 'metric', // Opcional: unidades métricas para temperatura en Celsius
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

const getList50Sundays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list 50 length by sundays");
}

module.exports = {
    getList30Weather,
    getList20Weather,
    getList50Sundays
};