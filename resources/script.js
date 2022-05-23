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
        history.style.transform = 'translateY(0)';
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
    history.style.transform = "translateY(-120%)"
    back.style.display = 'none';
    toggleEl = false;} else console.log('hello')
})


submit.addEventListener('click', function(event){
    event.preventDefault()
    let cityToQuery = cityEntry.value
    fetchCity(cityToQuery)
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
        let returnObject =  {
            city: city,
            summary: data.weather[0].main,
            temp: data.main.temp,
            wind: data.wind.speed,
            humidity: data.main.humidity
        } 
        displayWeather(returnObject)
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
    let icon = document.createElement('i')
    icon.classList.add('fa-cloud')
    icon.classList.add('fa-solid')
    card.append(icon)
    let info = document.createElement('p');
    info.textContent = object.summary + ' ' + object.temp + ' ' + object.wind + ' ' + object.humidity
    card.append(info)
    current.append(card)
}
