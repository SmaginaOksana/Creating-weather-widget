const current = document.querySelector(".current");
const forecast = document.querySelector(".forecast");

import { getForecast, hourlyForecast } from "./functions";
forecast.addEventListener("click", hourlyForecast);
getForecast();
