//Sets variables and finds HTML elements
let cityEntry = document.getElementById('city-search');
let submit = document.getElementById('submit');
let historyList = document.getElementById('history');
let current = document.getElementById('current');
let history = document.getElementById('historyOption')
let search = document.getElementById('search');
let back = document.getElementById('backIcon');
let toggleEl = false;
let historyHistory = ['animation']
let isThereCard
let lastIcon = 'start';
let icons = ['fa-cloud', 'fa-cloud-rain', 'fa-cloud-bolt', 'fa-cloud-sun', 'fa-sun', 'fa-rainbow', 'fa-snowflake', 'fa-wind' ]
let rotate = 0;

//Generates a random icon for the home state
let randomIcon = () => {
    if (isThereCard === true){
        return;
    }
    let iconChoice = document.getElementById('animation');
    iconChoice.classList.remove(lastIcon)
    let random = Math.floor(Math.random()*icons.length);
    lastIcon = icons[random];
    iconChoice.classList.add(icons[random])
    setTimeout(() => {
        rotate = rotate + 360;
        rotatestr = 'rotate(' + rotate + 'deg)'
        iconChoice.style.transform = rotatestr
        randomIcon();
    }, 1500)
}
// Sets the first random icon & kicks off recursive function
randomIcon()

// Search UI
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

// Back Button
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

// Submit Button
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

// Adds city to search history
let addHistory = city => {
    if ( historyHistory.includes(city)){
        return 'Already there'
    } else {
        historyHistory.push(city)
        let searchHistory = document.createElement('li');
        let searchAnchor = document.createElement('a');
        searchAnchor.addEventListener('click', function(){
            let cityToQuery = city
            fetchCity(cityToQuery)
            if (toggleEl == true) {
                search.style.width = '95%';
                search.style.borderRadius = '10px';
                search.style.transform = 'translateY(1rem)'
                history.style.transform = "scaleY(0%) translateY(21px)"
                back.style.display = 'none';
                toggleEl = false;} else console.log('hello')
        })
        searchAnchor.innerHTML = city;
        searchHistory.appendChild(searchAnchor)
    history.appendChild(searchHistory);
    }
}

//Fetches the city to get the coordinates 
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
        getData(data.coord, city);
    })
}

// Adds the history, adds to storage, adds the info card
let displayWeather = (object, uvPass) => {
    addHistory(object.city);
    storageCallback(object.city, object.city)
    addCard(object, uvPass);
}

// Adds the 5-do the info card
let fiveDay = (array, city) => {
    let createFiveDayObject = (object) => {
        let currentCity  = document.getElementById(city.toLowerCase());
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

// Adds the card with city weather information to HTML
let addCard = (object, uvPass) => {
    let removeCard = document.querySelector(".card");
    removeCard.remove();
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
    card.append(info)
    current.append(card)
}

// Main API call
let getData = (obj, city) => {
    let key = 'f8541dfaff9d2bd38cb28900beab850f'
    let URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + obj.lat + '&lon=' + obj.lon + '&exclude=hourly,minutely&units=imperial&appid=' + key;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        let uvPass = data.current.uvi
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


// Callback to get color for UV index class
let uvColor = (index) => {
    if (index < 3){
        return 'green'
    } else if (index < 6){
        return 'yellow'
    } else if (index < 8){
        return 'orange'
    } else return 'red'
}

// local storage function
let storageCallback = (city) => {
    let storedHistory = localStorage.getItem('storedLocalItems');
    storedHistory = storedHistory? JSON.parse(storedHistory) : [];
    if (storedHistory){
        storedHistory.push(city)
        localStorage.setItem('storedLocalItems',JSON.stringify(storedHistory));
    }
}

//local storage handling
const storedHistory = JSON.parse(localStorage.getItem('storedLocalItems'));
if (storedHistory){
    for (let i = 0; i < storedHistory.length; i++){
        addHistory(storedHistory[i])
        historyHistory.push(storedHistory[i])
    }

}
