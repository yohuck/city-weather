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
        apiURL = apiURL + city + '&appid=' + key;
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
        for (let i = 4; i < 40; i+=8){
            console.log(fiveDayArr[i])
            let returnObject =  {
                city: city,
                date: fiveDayArr[i].dt_txt,
                summary: fiveDayArr[i].weather[0].description,
                icon: fiveDayArr[i].weather[0].icon,
                temp: fiveDayArr[i].main.temp + ' degrees',
                wind: fiveDayArr[i].wind.speed,
                humidity: fiveDayArr[i].main.humidity
            }; displayWeather(returnObject);
            console.log(returnObject)
        }
        // let returnObject =  {
        //     city: city,
        //     summary: data.weather[0].description,
        //     icon: data.weather[0].icon,
        //     temp: data.main.temp,
        //     wind: data.wind.speed,
        //     humidity: data.main.humidity
        // } 
        // displayWeather(returnObject)
    })
}

let displayWeather = object => {
    addHistory(object.city);
    addCard(object)



}

let addCard = (object) => {
    
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    let title = document.createElement('h3')
    title.textContent = object.city;
    card.append(title);
    let icon = document.createElement('img')
    let source = 'http://openweathermap.org/img/wn/' + object.icon + '@2x.png'
    icon.setAttribute('src', source)
    card.append(icon)
    let info = document.createElement('p');
    info.textContent = object.summary + ' ' + object.temp + ' ' + object.wind + ' ' + object.humidity + ' ' + object.date; 
    card.append(info)
    current.append(card)
}


