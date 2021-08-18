'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherD = require('./data/weather.json');

const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/getweather',(req,res)=>{
  

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

})



server.get('/',(req,res)=>{
    res.send('home route');
})




server.get('*',(req,res)=>{
    res.status(404).send('not found')
})



server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})