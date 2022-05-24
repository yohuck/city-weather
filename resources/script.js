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
    fetchCityFiveDay(cityToQuery)
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
        // console.log(data)
        let returnObject =  {
            city: city,
            summary: data.weather[0].description,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            wind: data.wind.speed,
            humidity: data.main.humidity
        } 
        displayWeather(returnObject)
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

let displayWeather = object => {
    addHistory(object.city);
    addCard(object);
}

let fiveDay = (array, city) => {
    let createFiveDayObject = (object) => {
        let currentCity  = document.getElementById(city);
        // the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
        let oneDay = document.createElement('div');
        oneDay.classList.add('oneDay');
        let date = document.createElement('p');
        date.textContent = moment(object.date).format('dddd');
        oneDay.append(date);
        let temp = document.createElement('p');
        temp.textContent = object.temp;
        oneDay.append(temp);
        let icon = document.createElement('img');
        let source = 'http://openweathermap.org/img/wn/' + object.icon + '.png'
        icon.setAttribute('src', source);
        oneDay.append(icon);
        currentCity.append(oneDay);
    
    }
for (let i = 4; i < 40; i+=8){
    // let fiveDayContainer = document.createElement('div');
    // fiveDayContainer.classList.add('fiveDay');
    let returnObject =  {
        city: city,
        date: array[i].dt_txt,
        summary: array[i].weather[0].description,
        icon: array[i].weather[0].icon,
        temp: array[i].main.temp + ' °F',
        wind: array[i].wind.speed,
        humidity: array[i].main.humidity
    }; createFiveDayObject(returnObject);
    console.log(returnObject)
}
}



let addCard = (object) => {
    
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('id',object.city)
    let title = document.createElement('h3')
    title.textContent = object.city;
    card.append(title);
    let icon = document.createElement('img')
    let source = 'http://openweathermap.org/img/wn/' + object.icon + '@2x.png'
    icon.setAttribute('src', source)
    card.append(icon)
    let info = document.createElement('p');
    info.textContent = object.summary.toUpperCase() + ' ' + object.temp + '°F ' + object.wind + ' ' + object.humidity; 
    card.append(info)
    current.append(card)
}


