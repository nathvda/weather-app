function toCelsius(temp){
    let celsius = Math.floor(temp - 273.15);
    return celsius;
}

function monthOfYear(month){
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return Months[month];
}

function dayOfWeek(day){
    const Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return Days[day];
}
    
function displayElement(type, content, parent, what){
    
    let element = document.createElement(type);
    let elementText = document.createTextNode(content);
    element.appendChild(elementText);
    parent.appendChild(element);
    element.classList.add(what);

}

function cloudOrNot(cloudy, humidity){

    let icone;

    let weatherIcon = ["./assets/svg/cloud.svg", "./assets/svg/drizzle.svg", "./assets/svg/rain.svg", "./assets/svg/sun.svg", "./assets/svg/suncloud.svg"];

    for (let icon of weatherIcon){
       let dada = document.createElement("img");
       dada.src = icon;
    } 

    if (cloudy > 50 && humidity < 100){
        icone = weatherIcon[3];
        console.log(icone);
    }

    return  icone;
} 

export { toCelsius, monthOfYear, dayOfWeek, displayElement, cloudOrNot };