import { toCelsius, displayElement } from "../modules/functions.js";
import { jourMeteo } from "../modules/jourMeteo.js";
import { setUpButtons } from "../modules/setupButtons.js";

export async function weatherMe(city){
    let meteo = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=77cf7509f6657d267e637e6c2a540ddf`);
    let meteofetched = await meteo.json();
    displayMeteo(meteofetched);
    console.log("requête envoyée");

    localStorage.setItem("meteo", city);
    localStorage.setItem("meteostored", JSON.stringify(meteofetched));

}

let weather = localStorage.getItem("meteostored");
let weatherNews = JSON.parse(weather);

let newMeteo = localStorage.getItem("meteo");

const dataWeek = [];
const dayWeek = [];
const dataMin = [];
const dataMax = [];
const dataFeels = [];

window.addEventListener("load", () => {
  
   if ( weatherNews !== null) {
      displayMeteo(weatherNews);
   }

   if ( newMeteo === "null") {
      setUpButtons();
   }

  
});

let header = document.querySelector("header");


let main = document.querySelector("main");

function displayMeteo(meteo){

header.innerHTML="";
main.innerHTML="";

let nomVille = meteo.city.name;
let paysVille = meteo.city.country;

displayElement("h1",`${nomVille}`,header, "ville");
displayElement("div", `${paysVille}`, header, "pays"); 

setUpButtons();

for (let i = 0 ; i < 5 ; i++){
  displayElement("article", "", main, `day-${i}`);
  document.querySelector(`.day-${i}`).setAttribute("id",`day-${i}`);
  }  

let j = 0;

for (let i = 0 ; i < meteo.list.length ; i++){
  let averageDay = [];
let hoursofDay = new Date(`${meteo.list[i].dt_txt}`).getHours();

hoursofDay <= 0
  if ( (meteo.list[i].dt) > (meteo.list[0].dt + (86400 * j)) && hoursofDay >= 21){
  averageDay = [];
  let date = new Date(meteo.list[i].dt_txt);
  
  let temp = toCelsius(meteo.list[i].main.temp);
  let feels = toCelsius(meteo.list[i].main.feels_like);
  let minT = toCelsius(meteo.list[i].main.temp_min);
  let maxT = toCelsius(meteo.list[i].main.temp_max);

  let humi = meteo.list[i].main.humidity
  let press = meteo.list[i].main.pressure;
  let windS = meteo.list[i].wind.speed;
  let windO = meteo.list[i].wind.deg;
  let clouds = meteo.list[i].clouds.all;
  let special = meteo.list[i].weather[0].main;

  let infos = new jourMeteo(
   date,
   temp,
   minT,
   maxT,
   feels,
   humi,
   press,
   windS,
   windO,
   clouds,
   special
   );


   dataWeek.push(temp);
   dataFeels.push(feels);
   dataMin.push(minT);
   dataMax.push(maxT);
   dayWeek.push(`${infos.fullDate} - ${infos.time}`);

   averageDay.push(temp);

   let day = document.getElementById(`day-${j}`);
   displayElement("section", "", day, `weatherline-${i}`);
   let weath = document.querySelector(`.weatherline-${i}`);

    for (let key in infos) {
      if (key == "cloudy") {
        displayElement("img", "", weath, `images-${i}`);
        let weatherIcon = document.querySelector(`.images-${i}`);
        weatherIcon.classList.add("image-weather");
        weatherIcon.src = infos.cloudy;
      } else if (key == "winddir") {
        displayElement("img", "", weath, `images-wind-${i}`);
        let weatherIcon = document.querySelector(`.images-wind-${i}`);
        weatherIcon.classList.add("image-wind");
        weatherIcon.src = "./assets/svg/arrow.svg";
        weatherIcon.style.transform = `rotate(${0 + infos.winddir}deg)`;
      } else {
        displayElement("div", `${infos[key]}`, weath, key);
      }
    }
j++;
  } else {let date = new Date(meteo.list[i].dt_txt);

    let temp = toCelsius(meteo.list[i].main.temp);
    let feels = toCelsius(meteo.list[i].main.feels_like);
    let minT = toCelsius(meteo.list[i].main.temp_min);
    let maxT = toCelsius(meteo.list[i].main.temp_max);
  
    let humi = meteo.list[i].main.humidity
    let press = meteo.list[i].main.pressure;
    let windS = meteo.list[i].wind.speed;
    let windO = meteo.list[i].wind.deg;
    let clouds = meteo.list[i].clouds.all;
    let special = meteo.list[i].weather[0].main;
  
    let infos = new jourMeteo(
     date,
     temp,
     minT,
     maxT,
     feels,
     humi,
     press,
     windS,
     windO,
     clouds,
     special
     );

     dataWeek.push(temp);
     dataFeels.push(feels);
     dataMin.push(minT);
     dataMax.push(maxT);
     dayWeek.push(`${infos.fullDate} - ${infos.time}`);

     averageDay.push(temp);

     let day = document.getElementById(`day-${j}`);
     displayElement("section", "", day, `weatherline-${i}`);
     let weath = document.querySelector(`.weatherline-${i}`);
     
      for (let key in infos) {
        if (key == "cloudy") {
          displayElement("img", "", weath, `images-${i}`);
          let weatherIcon = document.querySelector(`.images-${i}`);
          weatherIcon.classList.add("image-weather");
          weatherIcon.src = infos.cloudy;
        } else if (key == "winddir") {
          displayElement("img", "", weath, `images-wind-${i}`);
          let weatherIcon = document.querySelector(`.images-wind-${i}`);
          weatherIcon.classList.add("image-wind");
          weatherIcon.src = "./assets/svg/arrow.svg";
          weatherIcon.style.transform = `rotate(${0 + infos.winddir}deg)`;
        } else {
          displayElement("div", `${infos[key]}`,weath, key);
        }
      }
    }

  }
}

document.getElementById("darkMode").addEventListener("click", () => {
   document.documentElement.classList.toggle("dark-mode");
})


export { dataWeek, dayWeek, dataFeels, dataMax, dataMin }