require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
//get data from weather.json
const weatherData = require('./data/weather.json');

//middleware
//What is middleware?
//Middleware is a function that runs in between the request and response
//Middleware is used to do things like authentication, logging, and other tasks
const PORT = process.env.PORT || 3005;

//forecast Function
function Forecast(day) {
    this.date = day.valid_date
    this.description = day.weather.description
}

//set up middleware
app.get('/weather', (req, res) => {
    const {lat, lon, searchQuery} = req.query;

    //find the city in the weatherData
    const cityData = weatherData.find(data => data.lat === lat && data.lon === lon && data.city_name === searchQuery);
    
    try {
        console.log('try block started');
        const weatherArray = cityData.map(day => new Forecast(day));
        console.log('I am in the try block');
        console.log(weatherArray);
        res.status(200).json(weatherArray);
        console.log('Success');
    } catch (error) {
        res.status(500).json({error: error.message});
    }

    console.log(lat, lon, searchQuery, cityData);

    res.status(200).json(cityData);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
} );