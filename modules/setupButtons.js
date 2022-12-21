import { displayElement } from "../modules/functions.js";

let header = document.querySelector("header");

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

export { setUpButtons }