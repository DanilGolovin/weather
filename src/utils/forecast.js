const request = require('request')

const  forecast = (latitude, longitude, callback) => {
    const  url = 'https://api.darksky.net/forecast/a71b24182468382281a48b420b3adcbe/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'temperature : ' + body.currently.temperature + ', rainchance : ' + body.currently.precipProbability
            )
        }
    })
}

module.exports = forecast