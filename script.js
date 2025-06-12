const API_KEY = "f9073de01700c5bcaeb35fc463561ef5";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const errorDiv = document.getElementById("error");
const mapDiv = document.getElementById("map");

let city = "";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const throttle = (func, delay) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      func(...args);
    }
  };
};

const displayWeather = (data) => {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temp").textContent = data.main.temp;
  document.getElementById("desc").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  localStorage.setItem("forecastCity", data.name);
  localStorage.setItem("lat", data.coord.lat);
  localStorage.setItem("lon", data.coord.lon);

  weatherInfo.classList.remove("hidden");

  document.getElementById("forecastBtn").addEventListener("click", () => {
    window.location.href = "forcast.html";
  });
};

const loadMap = (lat, lon) => {
  mapDiv.classList.remove("hidden");
  const map = new google.maps.Map(mapDiv, {
    center: { lat, lng: lon },
    zoom: 10,
  });
  new google.maps.Marker({ position: { lat, lng: lon }, map });
};

const fetchWeather = async (cityName) => {
  errorDiv.textContent = "";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    displayWeather(data);
    loadMap(data.coord.lat, data.coord.lon);
  } catch (err) {
    weatherInfo.classList.add("hidden");
    mapDiv.classList.add("hidden");
    errorDiv.textContent = err.message;
  }
};

searchInput.addEventListener(
  "input",
  debounce((e) => {
    city = e.target.value.trim();
  }, 300)
);

searchBtn.addEventListener(
  "click",
  throttle(() => {
    if (city) fetchWeather(city);
  }, 1000)
);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    city = searchInput.value.trim();
    if (city) fetchWeather(city);
  }
});
