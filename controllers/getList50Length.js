const axios = require('axios');
const { request, response} = require('express');

const getList50Fridays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list 50 length by fridays");
}

const getList50Saturdays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list 50 length by saturdays");
}

const getList50Sundays = (req = request, res = response) => {  
    const { list, ...resto } = req.query;
    console.log("Codigo list 50 length by sundays");
}

module.exports = {
    getList50Fridays,
    getList50Saturdays,
    getList50Sundays
};