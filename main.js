const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const query = req.body.location;
    const apiKey = 'ec15138dd4ed127fd7af31fc89d783bc';
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;
    
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = Math.round(weatherData.main.temp);
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png>";

            res.write('<p>The weather is currently: ' + desc + '</p>');
            res.write('<h1 class=\'text-center\'>Temperature in ' + query + ' is: ' + temp + ' degrees celcius.</h1>');
            res.write("<img src=" + imageURL);
            res.send();
        })
    })
})



app.listen(process.env.PORT || '3000', () => {
    console.log('Started on 3000');
});