require('dotenv').config();

import { toCelsius, displayElement } from "../modules/functions.js";
import { jourMeteo } from "../modules/jourMeteo.js";

// async function weatherMe(city){
//     let meteo = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.TOKEN}`);
//     let meteofetched = await meteo.json();
//     displayMeteo(meteofetched);

//     localStorage.setItem("meteo", city);
//     localStorage.setItem("meteostored", JSON.stringify(meteofetched));

// }

let plop = localStorage.getItem("meteostored");
let plopInfos = JSON.parse(plop);

let newMeteo = localStorage.getItem("meteo");

window.addEventListener('load', () => {

setUpButtons();
//  weatherMe(newMeteo);
 displayMeteo(plopInfos);
 console.log(plopInfos);
    }
 )

let header = document.querySelector("header");
let main = document.querySelector("main");

function setUpButtons(){
displayElement("label", "Enter a city name", header , "townToCheckLabel");
displayElement("input", "", header , "townToCheck");
displayElement("button", "Get weather forecasts", header, "forecast__Button"); 


let forecast = document.querySelector(".forecast__Button");
forecast.setAttribute("aria-label", "get new weather forecast");

let forecastInput = document.querySelector(".townToCheck");
forecastInput.setAttribute("id", "townToCheck");

let label = document.querySelector(".townToCheckLabel");
label.setAttribute("for", "townToCheck");

let town;

forecastInput.addEventListener("keyup", (e) => {
     town = e.target.value;

     if (e.code == "Enter"){

        weatherMe(town);

     }

} )


forecast.addEventListener("click", ()=> {
   weatherMe(town);
   setUpButtons();
} )
}


function displayMeteo(meteo){

header.innerHTML="";
main.innerHTML="";


let nomVille = meteo.city.name;
let paysVille = meteo.city.country;

displayElement("div",`${nomVille}`,header, "ville");
displayElement("div", `${paysVille}`, header, "pays"); 

setUpButtons();

for (let i = 0 ; i < meteo.list.length ; i++){
  let date = new Date(meteo.list[i].dt_txt);

  let temp = toCelsius(meteo.list[i].main.temp);
  let feels =  toCelsius(meteo.list[i].main.feels_like);
  let minT = toCelsius(meteo.list[i].main.temp_min);
  let maxT = toCelsius(meteo.list[i].main.temp_max);

  let humi = meteo.list[i].main.humidity
  let press = meteo.list[i].main.pressure;
  let windS = meteo.list[i].wind.speed;
  let windO = meteo.list[i].wind.deg;
  let clouds = meteo.list[i].clouds.all;
  let special = meteo.list[i].weather[0].main;

  let infos = new jourMeteo(date, temp, minT, maxT, feels, humi, press, windS, windO, clouds, special);

  let element = document.createElement("article");
  element.setAttribute("id",`weatherLine-${i}`);
  main.appendChild(element);

  for (let key in infos){

   if (key == "cloudy") {
      displayElement("img", "", element, `images-${i}`);
      let weatherIcon = document.querySelector(`.images-${i}`);
      weatherIcon.classList.add("image-weather");
      weatherIcon.src = infos.cloudy;

   } else if (key =="winddir") {
      displayElement("img", "", element, `images-wind-${i}`);
      let weatherIcon = document.querySelector(`.images-wind-${i}`);
      weatherIcon.classList.add("image-wind");
      weatherIcon.src = "./assets/svg/arrow.svg";
      weatherIcon.style.transform = `rotate(${0 + infos.winddir}deg)`;

   } else {

   displayElement("div", `${infos[key]}`, element, key);

   }
    
}

}

}