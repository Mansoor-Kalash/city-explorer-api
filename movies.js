const axios = require("axios");
require("dotenv").config();
module.exports = getMoviData;
let moviarr = [];
let dataCash = {};

function getMoviData(req, res) {
  let moviQuery = req.query.moviName;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVI_API_KEY}&query=${moviQuery}=&language=en-US`;
  if (dataCash[moviQuery] !== undefined) {
    res.send(dataCash[moviQuery]);
  } else {
    try {
      axios.get(url).then((resultData) => {
        console.log("movies", resultData);
        let moviObj = resultData.data.results.map((element) => {
          if (element.poster_path !== null) {
            return new Movies(element);
          }
        });
        dataCash[moviQuery] = moviarr;
        res.send(moviarr);
      });
    } catch (error) {
      console.log("error from axios", error);
      res.send(error);
    }
  }
}

class Movies {
  constructor(moviesData) {
    this.title = moviesData.title;
    this.overview = moviesData.overview;
    this.vote_average = moviesData.vote_average;
    this.poster_path = moviesData.poster_path;
    this.popularity = moviesData.popularity;
    this.release_date = moviesData.release_date;
    moviarr.push(this);
  }
}
