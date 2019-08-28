

const weatherForm = document.querySelector('form')
const inputData = document.querySelector('input')
const parLocation = document.querySelector('#parLocation')
const parForecast = document.querySelector('#parForecast')


//фу-я запускается при обновлении данных в form
weatherForm.addEventListener('submit', (e) => { //первыйй аргумент - строка, второй - callback f-n
    e.preventDefault()  //preventDefault предотвращает стандартное поведение по умолчанию, тем самым сервер (позволяя серверу рендерить новая страница, и вместо этого он ничего не будет делать)
    const location = inputData.value
    parLocation.textContent = 'Loading...';
    parForecast.textContent = '';
    fetch('http://localhost:3000/weather?address='+location)
        .then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    parLocation.textContent = data.error
                } else {
                    parForecast.textContent = data.forecastData
                    parLocation.textContent = data.location
                }
            })
        })
})