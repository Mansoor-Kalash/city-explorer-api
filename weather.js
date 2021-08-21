const axios = require("axios");
require("dotenv").config();
module.exports = getWeatherHandler;

function getWeatherHandler(req, res) {
  let citySearchQuery = req.query.cityName;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${citySearchQuery}&days=5&key=${process.env.API_KEY}`;

  console.log("before axios");
  try {
    axios.get(url).then((weathwe5days) => {
      console.log("inside axios");

      // console.log(photoResults.data)
      let weatherArray = weathwe5days.data.data.map((days) => {
        return new Days(days);
      });
      res.send(weatherArray);
    });
  } catch (error) {
    console.log("error from axios", error);
    res.send(error);
  }

  console.log("after axios");
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
