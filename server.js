'use strict';

// https://api.themoviedb.org/3/search/movie?api_key=${MOVI_API_KEY}&query=${CITY}=&language=en-US

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const PORT = process.env.PORT;

const server = express();
server.use(cors());
const weatherD = require('./data/weather.json');
const getWeatherHandler = require('./weather.js')
const getMoviData = require('./movies.js')

// ROUTES
// lab-07
server.get('/getweather',(req,res)=>{
  
try {
    let city = req.query.cityName;
    console.log("sss",city);

    let weather =  weatherD.find(element => {

        if (element.city_name.toLowerCase() === city.toLowerCase()) {
        console.log('object :>> ', element);
           return element;
        }

    })

    res.send(weather);
    console.log(weather);

} catch (error) {
    console.log('error from axios', error)
        res.send(error)
}
   
})
// lab-08
server.get('/weather', getWeatherHandler);
server.get(`/movies`,getMoviData);




server.get('/', homeHandler);
server.get('*', notFoundHandler);


// Function Handlers
function homeHandler(req, res) {
    res.send('all good')
}







function notFoundHandler(req, res) {
    res.status(404).send({
        "error": "Unable to get the route"
    })
}



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})