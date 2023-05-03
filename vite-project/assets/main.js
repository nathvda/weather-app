import { toCelsius, displayElement } from "../modules/functions.js";
import { jourMeteo } from "../modules/jourMeteo.js";
import { setUpButtons } from "../modules/setupButtons.js";
require('dotenv');

export async function weatherMe(city) {
  let meteo = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APPKEY}`
  );

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
  if (newMeteo !== null) {
    displayMeteo(weatherNews);
  }

  if (newMeteo === null) {
    setUpButtons();
  }
});

let header = document.querySelector("header");
let main = document.querySelector("main");

function displayMeteo(meteo) {
  header.innerHTML = "";
  main.innerHTML = "";

  let nomVille = meteo.city.name;
  let paysVille = meteo.city.country;

  displayElement("h1", `${nomVille}`, header, "ville");
  displayElement("div", `${paysVille}`, header, "pays");

  setUpButtons();

  for (let i = 0; i < meteo.list.length; i++) {
    let date = new Date(meteo.list[i].dt_txt);

    let temp = toCelsius(meteo.list[i].main.temp);
    let feels = toCelsius(meteo.list[i].main.feels_like);
    let minT = toCelsius(meteo.list[i].main.temp_min);
    let maxT = toCelsius(meteo.list[i].main.temp_max);

    let humi = meteo.list[i].main.humidity;
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

    let element = document.createElement("article");
    element.setAttribute("id", `weatherLine-${i}`);
    main.appendChild(element);

    for (let key in infos) {
      if (key == "cloudy") {

        displayElement("img", "", element, `images-${i}`);
        let weatherIcon = document.querySelector(`.images-${i}`);
        weatherIcon.classList.add("image-weather");
        weatherIcon.setAttribute("alt", `${key} ${infos[key]}`);
        weatherIcon.src = infos.cloudy;

      } else if (key == "winddir") {

        displayElement("img", "", element, `images-wind-${i}`);
        let windDirIcon = document.querySelector(`.images-wind-${i}`);
        windDirIcon.classList.add("image-wind");
        windDirIcon.src = "./assets/svg/arrow.svg";
        windDirIcon.setAttribute("alt", `${key} ${infos[key]}`);
        windDirIcon.style.transform = `rotate(${0 + infos.winddir}deg)`;

      } else {

        displayElement("div", `${infos[key]}`, element, key);

      }
    }
  }
}

document.getElementById("darkMode").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");
});

let canvas = document.getElementById("cadre");
const ctx = canvas.getContext("2d");

const labels = new Chart(ctx, {
  type: "line",
  data: {
    labels: dayWeek,
    datasets: [
      {
        label: "Température",
        data: dataWeek,
        fill: false,
        borderColor: "rgba(0,0,0,0.5)",
        tension: 0.1,
      },
      {
        label: "Température ressentie",
        data: dataFeels,
        fill: false,
        borderColor: "#54b5ce8f",
        tension: 0.1,
      },
      {
        label: "Température minimales",
        data: dataMin,
        fill: false,
        borderColor: "rgba(98, 83, 201, 0.56)",
        tension: 0.1,
      },
      {
        label: "Température minimales",
        data: dataMax,
        fill: false,
        borderColor: "rgba(217, 113, 38, 0.56)",
        tension: 0.1,
      },
    ],
  },
});

export { dataWeek, dayWeek, dataFeels, dataMax, dataMin };
