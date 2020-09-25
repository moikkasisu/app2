const form = document.querySelector(".search-section form");
const input = document.querySelector(".search-section input");
const list = document.querySelector(".fetch-section .cities");
const apiKey = "0768a4e78af72dde6ad5e5ddc1ac8c17";


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
      // const icon = `./icons/${icon}2x.png`
      const icons = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
     
      const city = resJSONed.name;
      const country = resJSONed.sys.country;
      const temp = resJSONed.main.temp;
      const description = resJSONed.weather[0].description;
      const feelsLike = resJSONed.main.feels_like;
          
      // const card = document.createElement('div')
      // card.setAttribute('class', 'card')
      // card.setAttribute("style", "background-color: yellow;")
      // list.appendChild(card)
      // const li = document.createElement("li");
      // li.classList.add("city");
      
      const cityHtml = ` 
      <div class="card" style="width: 18rem;">
      <div class "row d-flex justify-content-center">
      <h5 class="card-header">${name} in ${sys.country}</h5>
      <img class="city-icon" src="${icons}" alt="">
       <div class="card-body">
        <p class="card-text">
        <small>Now is: ${new Date}</small>
        <h6>Temperature: ${Math.round(main.temp)}<sup>°C</sup></h6> <small>feels like ${feelsLike}<sup>°C</sup></small>
        <br>
        <br>
        Condition Now:
        ${weather[0].description} 
        <a href="https://openweathermap.org/"><br>click here for more details</a>
        </p>
      </div>
      </div>`    
              
      document.querySelector('#cityweather').innerHTML = cityHtml;        
      })
      .catch(() => {
           const errorMessage = document.createElement('alert')
           errorMessage.textContent = `Whoops, invalid search!~~ , if the city is in another country, please add country code like '.au' behind the city name"`
           errorMessage.style.color = "red"; 
           list.appendChild(errorMessage);
           });
          
   form.reset();
   input.focus();
   });
   

