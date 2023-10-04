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

const getListOnlySundays = async (req = request, res = response) => {
  const { city } = req.query;
  console.log("Código para obtener el pronóstico de los próximos domingos en 50 días");

  try {
      // Verifica si se proporcionó el parámetro city
      if (!city) {
          return res.status(400).json({ error: 'Debes proporcionar el parámetro city.' });
      }

      const today = new Date();
      const next50Sundays = [];
      const daysToAdd = 50;

      // Calcula las fechas de los próximos 50 domingos en 50 días
      for (let i = 0; i < daysToAdd; i++) {
          const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
          if (date.getDay() === 0) { // 0 representa el domingo
              next50Sundays.push(date);
          }
      }

      // Realiza una solicitud a la API de OpenWeatherMap para obtener el pronóstico para cada fecha
      const weatherPromises = next50Sundays.map(async (date) => {
          const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
              params: {
                  q: city,
                  dt: Math.floor(date.getTime() / 1000),
                  lang: "es",
                  appid: OPENWEATHERMAP_API_KEY,
                  units: 'metric',
              },
          });
          return {
              date,
              weatherData: response.data.list[0], // Tomamos el primer pronóstico del día
          };
      });

      const weatherResults = await Promise.all(weatherPromises);

      if (weatherResults.length === 0) {
          return res.status(404).json({ message: 'No se encontraron domingos en el pronóstico.' });
      }

      res.status(200).json(weatherResults);
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

module.exports = {
    getList30Weather,
    getList20Weather,
    getListOnlySundays
};