const API_KEY = "2b64467a9bd78f29e39ae1cc6bfaf51c";

const elIconWeather = document.getElementById("icon-weather");
const elTemperature = document.getElementById("temperature");
const elLocal = document.getElementById("local");
const elHumidity = document.getElementById("humidity");
const elSpeedWind = document.getElementById("speed-wind");
const elCard = document.querySelector(".card");

function getData(local) {
  const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`;
  return fetch(route).then((response) => response.json());
}

function handleSubmit(event) {
  event.preventDefault();

  const value = document.querySelector('[name="local"]').value;

  getData(value).then((data) => {
    console.log(data);
    console.log(data);
    elTemperature.innerHTML = Math.floor(data.main.temp) + "°C";
    elLocal.innerHTML = data.name;
    elHumidity.innerHTML = data.main.humidity + "%";
    elSpeedWind.innerHTML = data.wind.speed + " km/h";

    const icon = data.weather[0].main.toLocaleLowerCase();
    const src = `assets/icons/${icon}.png`;
    elIconWeather.setAttribute("src", src);
  });
}

document.querySelector("form").addEventListener("submit", handleSubmit);
