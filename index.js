const form = document.querySelector(".search-section form");
const input = document.querySelector(".search-section input");
const list = document.querySelector(".fetch-section .cities");

const apiKey = config.MY_KEY;

// handleSubmit(e){
//   e.preventDefault();
//   e.target.reset();
//  }
 
//  <form onSubmit={this.handleSubmit}>
//    ...
//  </form>

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // e.stopPropagation();
  let inputVal = input.value;
  let myRequest = new Request(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
  );
  

  fetch(myRequest)
    .then((response) => response.json())
    .then((resJSONed) => {
      const {main, name, sys, weather} = resJSONed;
         
      const city = resJSONed.name;
      const country = resJSONed.sys.country;
      const temp = Math.round(resJSONed.main.temp);
      const mainWX = resJSONed.weather[0].main;
      const windspeed = resJSONed.wind.speed;
      const condition = resJSONed.weather[0].description;
      const feelsLike = resJSONed.main.feels_like;
     
 

//  https://openweathermap.org/weather-conditions
const iconCode = resJSONed.weather[0].icon;
const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
windDirection = compassSector[(resJSONed.wind.deg / 22.5).toFixed(0)];

const date = new Date();
const sunriseTime = new Date(resJSONed.sys.sunrise * 1000); //Convert a Unix timestamp to time
const sunsetTime = new Date(resJSONed.sys.sunset * 1000);

//ensure time output is hh:mm:ss
const leadingZero = (num) => `0${num}`.slice(-2);

const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
  .map(leadingZero)
  .join(':');

const sunrise = formatTime(sunriseTime);
const sunset = formatTime(sunsetTime);

 const cityHtml = `  
    
  <div class="card" style="width:18rem";>
  <div class "row d-flex justify-content-center">
   <h4 class="card-header">${city} in ${country}</h4>
    <div class="card-body">   
    <img class="icon bg-info mx-auto text-center" src="${iconUrl}" alt="">   
    <p class="card-text">
    <ul>
   <li>Sunrise ${sunrise}<br> Sunset ${sunset}</li>
   <li>Temp: ${temp}<sup>°C</sup></li>
   <li>Wind speed ${windspeed}, direction ${windDirection}</li>
   <li>It feels like ${feelsLike}<sup>°C</sup></li>
   <li> Weather Condition:<p>${mainWX}, ${condition}</p></li>
   </ul>
   <a href="https://openweathermap.org/"><br>click here for more details on openweathermap</a>
   
   </p>
 </div>
 </div>
 </div>`
      
      document.querySelector('#cityweather').innerHTML = cityHtml;        
      })
      .catch(() => {
                  
          errorMsg=`<span style="color:red;">Whoops, invalid search! If the city is in another country, please add country code like '.au' behind the city name"</span>`;
          
           document.querySelector('#cityweather').innerHTML= errorMsg    
           });
 
    form.reset();
    input.focus(); 
    });


 
 
                   

  

