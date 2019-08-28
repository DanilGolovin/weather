const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a71b24182468382281a48b420b3adcbe/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)+'?lang=ru&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + '; температура - ' + body.currently.temperature + '; макс. температура - ' + body.daily.data[0].temperatureHigh + '; минималная температура - ' + body.daily.data[0].temperatureLow + '; скорость ветра - ' + body.currently.windSpeed +' м/с; вероятность дождя - ' + body.currently.precipProbability + '%; УФ индекс - ' + body.currently.uvIndex)
        }
    })
}

module.exports = forecast