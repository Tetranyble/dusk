import './index.css';

const api = {
  key: "10451c9691d994efc824cfee92009ea0",
  base: "https://api.openweathermap.org/data/2.5/weather?"
}

const setQuery = (evt) =>{

  if(evt.keyCode == 13){
    getResults(searchbox.value)
  }
}
const dateBuilder = (now) => {
  let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
}
const displayResults = (weather) => {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temperature');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>C</span>`;
  console.log(weather)
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.main.temp_min}C / ${weather.main.temp_max} C`
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

//&exclude={minutely,hourly}
const getResults = (query) => {
  fetch(`${api.base}q=${query}&units=metric&APPID=${api.key}`)
  .then( (weather) => {
    return weather.json()
  }).then(displayResults)
}


