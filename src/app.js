const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000 //порт будет равен первому значению если он будет существовать, и наоборот = 3000
// определение path для Express config
const publicDirectoryPath = path.join(__dirname, '../public')// получает каталог просмотров
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')               // сообщает Express, что мы используем движок вида hbs
                                            // возвращает корневую страницу req, res и response отображает файл index.hbs с корневым установленным в viewsPath выше
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// установка статического каталога для обслуживания
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Danil'
    })
})
app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About us',
        name: 'Danil'
    })
})
app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Help',
        name: 'Danil'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        res.send({
            error: 'no address! '
        })
    } else {
        const address = req.query.address
        geocode(address, (error, {latitude, longitude, location} = {}) => {  // не забывать про деструктуризацию
            if(error) {
                return res.send({ error })
            }
            forecast( latitude, longitude, (error, forecastData) => {
                if(error) {
                   return  res.send({ error })
                }
                res.send({
                    address,
                    location,
                    forecastData
                })
            })
        })
    }
})


 //передача json обьекта. можно и html: '<h1> html </h1>'

app.get('/products', (req, res) => {
    if (!req.query.search) { // код будет запускатся только тогда, когда будет отсутствует поисковый запрос
        res.send({
            error: 'you must provide a search term.'
        });
    } else {
        res.send({
            products: []
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up!' + port)
})