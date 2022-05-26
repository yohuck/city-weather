let cityEntry = document.getElementById('city-search');
let submit = document.getElementById('submit');
let historyList = document.getElementById('history');
let current = document.getElementById('current');
let history = document.getElementById('historyOption')
let historyHistory = [];
let search = document.getElementById('search');
let back = document.getElementById('backIcon');
let toggleEl = false;

let icons = {
    cloudy: "fa-solid fa-cloud",
    rainy: "fa-solid fa-cloud-rain"
}

cityEntry.addEventListener('click', function(){
    if (toggleEl == false) {
        search.style.width = '100%'
        search.style.maxWidth = '10000px'
        search.style.borderRadius = '0';
        search.style.transform = 'translateY(0)';
        history.style.transform = 'scaleY(100%) translateY(0rem)';
        back.style.display = 'inline';
        toggleEl = true;
    } else console.log('okay')
    
})

back.addEventListener('click', function(event){
    if (toggleEl == true)
    {
    search.style.width = '95%';
    search.style.borderRadius = '10px';
    search.style.transform = 'translateY(1rem)'
    history.style.transform = "scaleY(0%) translateY(21px)"
    back.style.display = 'none';
    toggleEl = false;} else console.log('hello')
})


submit.addEventListener('click', function(event){
    event.preventDefault()
    let cityToQuery = cityEntry.value
    fetchCity(cityToQuery)
    if (toggleEl == true)
    {
    search.style.width = '95%';
    search.style.borderRadius = '10px';
    search.style.transform = 'translateY(1rem)'
    history.style.transform = "scaleY(0%) translateY(21px)"
    back.style.display = 'none';
    toggleEl = false;} else console.log('hello')
})

let addHistory = city => {
    
    if (historyHistory.includes(city)){
        return 'Already there'
    } else {
        let searchHistory = document.createElement('li');
        searchHistory.textContent = city;
        history.appendChild(searchHistory);
    }
}
let fetchCity = city => {
    let key = 'f8541dfaff9d2bd38cb28900beab850f'
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q="
    let apiQueryURL = city => {
        apiURL = apiURL + city + '&units=imperial&appid=' + key;
    }
    apiQueryURL(city);
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        getUV(data.coord, city);
        // let returnObject =  {
        //     city: city,
        //     summary: data.weather[0].description,
        //     icon: data.weather[0].icon,
        //     temp: 'Temp: ' + data.main.temp + '°F',
        //     wind: 'Wind speed: ' + data.wind.speed + 'MPH',
        //     humidity: 'Humidity: ' + data.main.humidity + '%',
        //     uv: 'UV Index: '
        // } 
        // displayWeather(returnObject)
    })
}

let fetchCityFiveDay = city => {
    let key = 'f8541dfaff9d2bd38cb28900beab850f'
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q="
    let apiQueryURL = city => {
        apiURL = apiURL + city + '&units=imperial&appid=' + key;
    }
    apiQueryURL(city);
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        let fiveDayArr = data.list;
        console.log(fiveDayArr);
        fiveDay(fiveDayArr, city);
    })
}

let displayWeather = (object, uvPass) => {
    addHistory(object.city);
    addCard(object, uvPass);
}

let fiveDay = (array, city, uvPass) => {
    console.log(uvPass)
    let createFiveDayObject = (object) => {

        let currentCity  = document.getElementById(city.toLowerCase());
        // the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
        let oneDay = document.createElement('div');
        oneDay.classList.add('oneDay');
        let date = document.createElement('p');
        date.textContent = object.date;
        oneDay.append(date);
        let temp = document.createElement('p');
        temp.textContent = object.temp + '°F';
        oneDay.append(temp);
        let wind = document.createElement('p');
        wind.textContent = object.wind + ' MPH';
        oneDay.append(wind)
        let humid = document.createElement('p');
        humid.textContent = object.humidity + '%';
        oneDay.append(humid)
        let icon = document.createElement('img');
        let source = 'http://openweathermap.org/img/wn/' + object.icon + '.png'
        icon.setAttribute('src', source);
        oneDay.append(icon);
        currentCity.append(oneDay);
    
    }
for (let i = 1; i < 6; i++){
    const locals = moment.unix(array[i].dt).format('dd MM/DD ');
    console.log(locals)
    let returnObject =  {
        city: city,
        date: locals,
        summary: array[i].weather[0].description,
        icon: array[i].weather[0].icon,
        temp: array[i].temp.day,
        wind: array[i].wind_speed,
        humidity: array[i].humidity
    }; createFiveDayObject(returnObject);
    // console.log(returnObject)
}
}


let addCard = (object, uvPass) => {
    
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('id',object.city.toLowerCase())
    let title = document.createElement('h3')
    title.textContent = object.city;
    card.append(title);
    let date = document.createElement('p');
    date.textContent = moment().format('dddd MM/DD')
    card.append(date)
    let icon = document.createElement('img')
    let source = 'http://openweathermap.org/img/wn/' + object.icon + '@2x.png'
    icon.setAttribute('src', source)
    card.append(icon)
    let info = document.createElement('div');
    info.setAttribute('class', 'info')
    let temp = document.createElement('p');
    temp.textContent = object.temp;
    info.appendChild(temp);
    let wind = document.createElement('p');
    wind.textContent = object.wind;
    info.appendChild(wind)
    let humid = document.createElement('p');
    humid.textContent = object.humidity;
    info.appendChild(humid);
    let UV = document.createElement('p');
    UV.textContent = object.uv;
    let uvColorAdd = uvColor(uvPass);
    UV.classList.add(uvColorAdd);
    info.appendChild(UV);
    // info.textContent = object.summary.toUpperCase() + ' ' + object.temp + '°F ' + object.wind + ' ' + object.humidity; 
    card.append(info)
    current.append(card)
}




// {lon: -104.9847, lat: 39.7392}

let getUV = (obj, city) => {
    let key = 'f8541dfaff9d2bd38cb28900beab850f'
    let URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + obj.lat + '&lon=' + obj.lon + '&exclude=hourly,minutely&units=imperial&appid=' + key;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        let uvPass = data.current.uvi
        console.log(data)
        let returnObject =  {
            city: city,
            summary: data.current.weather[0].description,
            icon: data.current.weather[0].icon,
            temp: 'Temp: ' + data.current.temp + '°F',
            wind: 'Wind speed: ' + data.current.wind_speed + 'MPH',
            humidity: 'Humidity: ' + data.current.humidity + '%',
            uv: 'UV Index: ' + data.current.uvi
        } 
        displayWeather(returnObject, uvPass)
        let fiveDayArr = data.daily
        console.log(fiveDayArr)
        fiveDay(fiveDayArr, city, uvPass);
    })
    // .then(console.log('hello'))
    // .then(fetchCityFiveDay(city))
}


let uvColor = (index) => {
    console.log(index);
    if (index < 3){
        return 'green'
    } else if (index < 6){
        return 'yellow'
    } else if (index < 8){
        return 'orange'
    } else return 'red'
}