const API_KEY = "2b64467a9bd78f29e39ae1cc6bfaf51c";

// Elementos do DOM
const elIconWeather = document.getElementById("icon-weather");
const elTemperature = document.getElementById("temperature");
const elLocal = document.getElementById("local");
const elHumidity = document.getElementById("humidity");
const elSpeedWind = document.getElementById("speed-wind");
const elCard = document.querySelector(".card");

// Função para buscar dados da API
function getData(local) {
  const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`;
  return fetch(route).then((response) => response.json());
}

// Função para carregar informações
function loadInformation() {
  const value = document.querySelector('[name="local"]').value;

  getData(value)
    .then((data) => {
      if (data.cod === "404") {
        elCard.classList.remove("active");
        return;
      }

      // Log para visualizar todos os dados retornados pela API
      elCard.classList.add("active");

      elTemperature.innerHTML = Math.floor(data.main.temp) + "°C";
      elLocal.innerHTML = data.name;
      elHumidity.innerHTML = data.main.humidity + "%";
      elSpeedWind.innerHTML = data.wind.speed + " km/h";

      const icon = data.weather[0].main.toLowerCase();
      const src = `assets/icons/${icon}.png`;
      elIconWeather.setAttribute("src", src);

      fadeIn();
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}

// Função para lidar com o envio do formulário
function handleSubmit(event) {
  event.preventDefault();
  fadeOut();
}

// Animação de entrada
function fadeIn() {
  const timeline = gsap.timeline();
  const configFrom = { y: -50 };
  const configTo = { y: 0, duration: 0.4, opacity: 1, ease: "back" };

  timeline.fromTo("#icon-weather", configFrom, configTo);
  timeline.fromTo("#temperature", configFrom, configTo, 0.1);
  timeline.fromTo("#local", configFrom, configTo, 0.2);
  timeline.fromTo("footer", configFrom, configTo, 0.3);
}

// Animação de saída
function fadeOut() {
  const timeline = gsap.timeline({ onComplete: loadInformation });
  const config = { y: 50, duration: 0.4, opacity: 0, ease: "slow" };

  timeline.to("footer", config);
  timeline.to("#local", config, 0.1);
  timeline.to("#temperature", config, 0.2);
  timeline.to("#icon-weather", config, 0.3);
}

// Event Listener
document.querySelector("form").addEventListener("submit", handleSubmit);
