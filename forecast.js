const API_KEY = "f9073de01700c5bcaeb35fc463561ef5";
const forecastContainer = document.getElementById("forecastContainer");

const city = localStorage.getItem("forecastCity");

if (!city) {
  forecastContainer.innerHTML = "<p class='text-red-500'>City not found. Please go back and search again.</p>";
} else {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const daily = data.list.filter((item, index) => item.dt_txt.includes("12:00:00"));

      forecastContainer.innerHTML = daily.map(item => {
        const date = new Date(item.dt_txt).toDateString();
        const icon = item.weather[0].icon;
        const desc = item.weather[0].description;
        const temp = item.main.temp;

        return `
          <div class="bg-white shadow rounded p-4 text-center">
            <h3 class="font-bold">${date}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="mx-auto" />
            <p class="capitalize">${desc}</p>
            <p class="font-semibold">${temp} °C</p>
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      forecastContainer.innerHTML = `<p class="text-red-500">Error fetching forecast data.</p>`;
    });
}
