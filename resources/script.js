let cityEntry = document.getElementById('city-search');
let submit = document.getElementById('submit');
let historyList = document.getElementById('history');
let current = document.getElementById('current');
let history = document.getElementById('historyOption')
let search = document.getElementById('search');
let back = document.getElementById('backIcon');
let toggleEl = false;
let historyHistory = []
let isThereCard;

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
    let checkHistory = document.querySelectorAll("Denver");
    console.log(checkHistory)
    
    if ( historyHistory.includes(city)){
        return 'Already there'
    } else {
        historyHistory.push(city)
        let searchHistory = document.createElement('li');
        let searchAnchor = document.createElement('a');
        searchAnchor.addEventListener('click', function(){
            let cityToQuery = city
            fetchCity(cityToQuery)
    if (toggleEl == true)
    {
    search.style.width = '95%';
    search.style.borderRadius = '10px';
    search.style.transform = 'translateY(1rem)'
    history.style.transform = "scaleY(0%) translateY(21px)"
    back.style.display = 'none';
    toggleEl = false;} else console.log('hello')
        } )
        searchAnchor.innerHTML = city;
        searchHistory.appendChild(searchAnchor)
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
        fiveDay(fiveDayArr, city);
    })
}

let displayWeather = (object, uvPass) => {
    addHistory(object.city);
    storageCallback(object.city, object.city)
    addCard(object, uvPass);
}

let fiveDay = (array, city) => {
    let createFiveDayObject = (object) => {

        let currentCity  = document.getElementById(city.toLowerCase());
        // the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
        let oneDay = document.createElement('div');
        oneDay.classList.add('oneDay');
        let date = document.createElement('p');
        date.textContent = object.date;
        oneDay.append(date);
        let temp = document.createElement('p');
        temp.textContent = Math.floor(object.temp) + '°F';
        oneDay.append(temp);
        let wind = document.createElement('p');
        wind.textContent = Math.floor(object.wind) + ' mph';
        oneDay.append(wind)
        let humid = document.createElement('p');
        humid.textContent = object.humidity + '% humidity';
        oneDay.append(humid)
        let icon = document.createElement('img');
        let source = 'http://openweathermap.org/img/wn/' + object.icon + '.png'
        icon.setAttribute('src', source);
        oneDay.append(icon);
        currentCity.append(oneDay);
    
    }
for (let i = 1; i < 6; i++){
    const locals = moment.unix(array[i].dt).format('dddd');
    let returnObject =  {
        city: city,
        date: locals,
        summary: array[i].weather[0].description,
        icon: array[i].weather[0].icon,
        temp: array[i].temp.day,
        wind: array[i].wind_speed,
        humidity: array[i].humidity
    }; createFiveDayObject(returnObject);
}
}


let addCard = (object, uvPass) => {
    if (isThereCard === true){
        let removeCard = document.querySelector(".card");
        removeCard.remove();
        isThereCard = false;
    }
    
    isThereCard = true;
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
        console.log(data.current)
        console.log(uvPass)
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
        fiveDay(fiveDayArr, city, uvPass);
    })
}


let uvColor = (index) => {
    if (index < 3){
        return 'green'
    } else if (index < 6){
        return 'yellow'
    } else if (index < 8){
        return 'orange'
    } else return 'red'
}

let storageCallback = (city) => {
    let storedHistory = localStorage.getItem('storedLocalItems');
    storedHistory = storedHistory? JSON.parse(storedHistory) : [];
    if (storedHistory){
        storedHistory.push(city)
        localStorage.setItem('storedLocalItems',JSON.stringify(storedHistory));
    }
}


const storedHistory = JSON.parse(localStorage.getItem('storedLocalItems'));
if (storedHistory){
    for (let i = 0; i < storedHistory.length; i++){
        addHistory(storedHistory[i])
        historyHistory.push(storedHistory[i])
    }

}
