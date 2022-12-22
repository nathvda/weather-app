import Chart from "chart.js/auto";
import { displayElement } from "./functions";
import { dataWeek, dayWeek, dataFeels } from "../assets/main";

let corps = document.getElementById("corps");

displayElement("canvas", "", corps, "cadre");

let canvas = document.querySelector(".cadre");
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
        borderColor: "#0687a88f",
        tension: 0.1,
      },
      {
        label: "Température ressentie",
        data: dataFeels,
        fill: false,
        borderColor: "#54b5ce8f",
        tension: 0.1,
      },
    ],
  },
});
