import Chart from 'chart.js/auto';
import { displayElement } from './functions';
import { dataWeek, dayWeek } from '../assets/main';

let corps = document.getElementById("corps");

displayElement("canvas", "", corps, "cadre");

let canvas = document.querySelector('.cadre')
const ctx = canvas.getContext("2d");

console.log(dayWeek);
console.log(dataWeek);

const labels = new Chart( ctx, {
   type: 'line',
   data : {
      labels : dayWeek,
      datasets: [{
         label : 'Température selon tranches horaires',
         data : dataWeek,
         fill : true,
         borderColor: 'rgba(0,0,0,0.5)',
         tension: 0.1
            }]
   }
});