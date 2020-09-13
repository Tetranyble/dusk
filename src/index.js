import './assets/css/index.css';
//import './widgitComponent/workerNotification'
const api = {
  key: "10451c9691d994efc824cfee92009ea0",
  base: "https://api.openweathermap.org/data/2.5/weather?",
  onecall: "https://api.openweathermap.org/data/2.5/onecall?"

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

const displayResults = (w) => {

  const weather = w.daily[0]
  // eslint-disable-next-line no-console
  console.log(w)
  let city = document.querySelector('.location .city');
  city.innerText = `${w.timezone}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temperature');
  temp.innerHTML = `${Math.round(weather.temp.max)}<span>C</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.temp.min}C / ${weather.temp.max} C`
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

//&exclude={minutely,hourly}
const getResults = (query, onecall=true) => {
  if(onecall){
    fetch(`${api.base}q=${query}&units=metric&APPID=${api.key}`)
  .then( (weather) => {
    return weather.json()

  }).then(weather =>{
    fetch(`${api.onecall}lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&exclude=minutely,hourly&appid=${api.key}`)
    .then(weather => {
      return weather.json()
    })
    .then(displayResults)
  })

  }else{

    fetch(`${api.onecall}lat=${query.coords.latitude}&lon=${query.coords.longitude}&units=metric&exclude=minutely,hourly&appid=${api.key}`)
  .then( (weather) => {
    return weather.json()
  }).then(displayResults).catch((error) => console.log(error))
  }

}

if(!navigator.geolocation) {
  alert('Geolocation is not supported by your browser')
} else {
    navigator.geolocation.getCurrentPosition((location) => {
      getResults(location, false)

    }, (error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    });
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
      try {
          const registration = await navigator.serviceWorker.register('worker.js',{
            scope: '/'
          });
          console.log('Service worker registration sucessful');
          console.log(`Registered with scope: ${registration.scope}`);
      } catch (e) {

          console.log('Service worker registration failed');
          console.log(e);
      }
  });
}

