const axios = require('axios');
const { request, response} = require('express');

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const getListBySunnyDays = async (req = request, res = response) => {  
    console.log("Codigo list by sunny days");
    try {
        const { city, days } = req.query; //Pedir en la query la city
    
        const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                cnt:  days * 8,  // número especificado de días (8 registros por día)
                appid: OPENWEATHERMAP_API_KEY,
                units: 'metric', // temperatura en Celsius
            },
        });
    
        // Filtra los días soleados
        const sunnyDays = response.data.list.filter(day => {
            // Día soleado si la descripción contiene "clear" (despejado)
            return day.weather.some(weather => weather.description.toLowerCase().includes('clear'));
        });
    
        res.json({ sunnyDays });
        } catch (error) {
            console.error('Error al obtener los datos del clima', error);
            res.status(500).json({ error: 'Error al obtener los datos del clima' });
        }
}

const getListByRainyDays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list by rainy days");
}

const getListByCloudyDays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list by cloudy days");
}

module.exports = {
    getListBySunnyDays,
    getListByRainyDays,
    getListByCloudyDays
};