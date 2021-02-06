const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('weatherReport', {data: ''});
});

app.post('/', (req, res) => {
    const query = req.body.location ? req.body.location : 'calgary';
    const apiKey = 'ec15138dd4ed127fd7af31fc89d783bc';
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;
    
    https.get(url, (response) => {
        if(response.statusCode === 200){
            response.on('data', (data) => {
                const weatherData = JSON.parse(data);
                res.render('weatherReport', {data: weatherData});
            })
        } else {
            res.render('weatherReport', {data: '0'});
        }
        
    })
})



app.listen(process.env.PORT || '3000', () => {
    console.log('Started on 3000');
});