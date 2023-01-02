// convertir en degrés
function toCelsius(temp){
    let celsius = Math.floor(temp - 273.15);
    return celsius;
}

// convertir mois en texte
function monthOfYear(month){
    const Months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    return Months[month];
}

// convertir jour en texte
function dayOfWeek(day){
    const Days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
    return Days[day];
}

//creation d'element
function displayElement(type, content, parent, what){

    let element = document.createElement(type);
    let elementText = document.createTextNode(content);
    element.appendChild(elementText);
    parent.appendChild(element);
    element.classList.add(what);

}

function cloudOrNot(icon){

    let icone;

    let weatherIcon = ["./assets/svg/cloud.svg", "./assets/svg/drizzle.svg", "./assets/svg/rain.svg", "./assets/svg/sun.svg", "./assets/svg/suncloud.svg", "./assets/svg/snow.svg"];

   switch (icon){
    case "Rain":
        icone = weatherIcon[2];
        break; 
    case "Clouds":
        icone = weatherIcon[0];
        break;
    
    case "Snow":
        icone = weatherIcon[5];
        break;

    case "Clear": 
        icone = weatherIcon[3];
        break;
   }

    return  icone;
   
}

export { toCelsius, monthOfYear, dayOfWeek, displayElement, cloudOrNot };