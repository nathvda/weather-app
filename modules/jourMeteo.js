import { dayOfWeek, monthOfYear, cloudOrNot } from "./functions.js";

export class jourMeteo{

    constructor(date, temp, min, max, feels, humidity, pressure, wind, winddir, clouds){
    this.fullDate = `${dayOfWeek(date.getDay())} ${date.getDate()} ${monthOfYear(date.getMonth())} ${date.getFullYear()}`;
    this.time = ` ${ ( date.getHours() <= 10 ) ? `0${date.getHours()}` : `${date.getHours()}`}:${ ( date.getMinutes() <= 10 ) ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
    this.temp = `${temp}°C`;
    this.min = `${min}°C`;
    this.max = `${max}°C`;
    this.feels = `${feels}°C`;
    this.humidity = `${humidity}%`;
    this.pressure = `${pressure} hPa`;
    this.wind = `${wind}m/s`;
    this.winddir = winddir;
    this.clouds = `${clouds}%`;
}

}