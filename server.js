'use strict';

/*const express = require('express');
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



*/
//////////////////////

'use strict';

// https://api.themoviedb.org/3/search/movie?api_key=${MOVI_API_KEY}&query=${CITY}=&language=en-US

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');


const server = express();
server.use(cors());
const weatherD = require('./data/weather.json');

const PORT = process.env.PORT;
let moviarr =[];
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






function getWeatherHandler(req, res) {
    let citySearchQuery = req.query.cityName;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${citySearchQuery}&days=5&key=${process.env.API_KEY}`



    console.log('before axios');
    try {
        axios.get(url).then((weathwe5days) => {
            console.log('inside axios');

            // console.log(photoResults.data)
            let weatherArray = weathwe5days.data.data.map(days => {
                return new Days(days);
            })
            res.send(weatherArray)
        })
    }
    catch (error) {
        console.log('error from axios', error)
        res.send(error)
    }

    console.log('after axios');

}


function getMoviData(req,res){
    let moviQuery = req.query.moviName;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVI_API_KEY}&query=${moviQuery}=&language=en-US`;
    try {
        axios.get(url).then((resultData)=>{
            console.log('movies',resultData);
            let moviObj = resultData.data.results.map(element=>{
               if (element.poster_path !== null) {
                return new Movies (element);
                   
               }
            })
            res.send(moviarr);
    
        })
    } catch (error) {
        console.log('error from axios', error)
        res.send(error)
    }
        
     
   

}
function notFoundHandler(req, res) {
    res.status(404).send({
        "error": "Unable to get the route"
    })
}

class Days {
    constructor(daysWeatherData) {
        this.Date = daysWeatherData.datetime; 
        this.Description = daysWeatherData.weather.description;
        this.High = daysWeatherData.high_temp;
        this.Low = daysWeatherData.low_temp;
        
       // this.low = daysWeatherData.low_temp;
    }
}
class Movies{
    constructor(moviesData){
        this.title=moviesData.title;
        this.overview=moviesData.overview;
        this.vote_average=moviesData.vote_average;
        this.poster_path=moviesData.poster_path;
        this.popularity=moviesData.popularity;
        this.release_date=moviesData.release_date;
        moviarr.push(this)  }

}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})