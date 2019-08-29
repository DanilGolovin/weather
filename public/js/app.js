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
    fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    parLocation.textContent = data.error
                } else {
                    let elem = document.getElementById("dataContainer")
                    elem.style.background = "-moz-linear-gradient(left, #f1e767 0%, #feb645 100%)";
                    elem.style.background = "-webkit-gradient(left top, right top, color-stop(0%, #f1e767), color-stop(100%, #feb645))";
                    elem.style.background = "-webkit-linear-gradient(left, #f1e767 0%, #feb645 100%)";
                    elem.style.  background = "-o-linear-gradient(left, #f1e767 0%, #feb645 100%)";
                    elem.style.  background = "-ms-linear-gradient(left, #f1e767 0%, #feb645 100%)";
                    elem.style. background = "linear-gradient(to right, #f1e767 0%, #feb645 100%)";
                    elem.style.filter = "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1e767', endColorstr='#feb645', GradientType=1 )";
                    elem.style.width= "18vw";
                    elem.style.height= "16vh";
                    elem.style.margin= "0 auto";
                    elem.style.borderRadius= "10px 10px 10px 10px";
                   parForecast.textContent =  data.forecastData
                   parLocation.textContent =  data.location
                }
            })
        })
})