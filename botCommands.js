require("dotenv").config();
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function concertThis(concertName) {
  axios.get("https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp")
  .then((response) => {
    response.data.forEach(function (artist) {
      console.log('-----')
      console.log(artist.venue.name);
      console.log(artist.venue.country + ' ' + artist.venue.city);
      var time = moment(artist.datetime);
      console.log(time.format("MM/DD/YYYY"));
      console.log('\n');
    });
  })
  .catch((error) => {
    console.log(error);
  });
}

function spotifyThisSong(songName) {
  songName = songName ? songName : "The Sign";
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    data.tracks.items.forEach(function (item) {
      console.log(item.name);
      item.album.artists.forEach(function (artist) {
        console.log(artist.name);
      });
      console.log(item.album.uri);
      console.log(item.album.name);
      console.log('\n');
    });
  });
  console.log(songName);
}

function movieThis(movieName) {
  movieName = movieName ? movieName : 'Mr. Nobody.';
  console.log(movieName);
  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName)
  .then((movie) => {
    console.log('-----')
    console.log(movie.data.Title);
    console.log(movie.data.Year);
    console.log(movie.data.imdbRating);
    movie.data.Ratings.forEach(function (rating) {
      if (rating.Source === 'Rotten Tomatoes') {
        console.log("Rotten Tomatoes rating: " + rating.Value);
      }
    })
    console.log(movie.data.Country);
    console.log(movie.data.Language);
    console.log(movie.data.Plot);
    console.log(movie.data.Actors);
    console.log('\n');
  })
  .catch((error) => {
    console.log(error);
  });
}

function doWhatItSays(fileName) {
  console.log(fileName);
  fs.readFile(fileName, 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      return;
    } else {
      console.log(data);
      var commandName = data.split(',')[0].trim();
      console.log(commandName);
      var paramValue = data.split(',')[1].replace(/\"/g, "").trim();
      console.log(paramValue);
      module.exports[commandName]();
      //module.exports[commandName](paramValue);
    }
  });
}

module.exports = {
  "concert-this": concertThis,
  "spotify-this-song": spotifyThisSong,
  "movie-this": movieThis,
  "do-what-it-says": doWhatItSays,
}
