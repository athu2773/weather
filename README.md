# 🌦 Real-Time Weather App

A responsive web application that allows users to search for any city and view its current weather conditions, a live map, and a 5-day weather forecast.

---

## 🚀 Features

- 🔍 **Search City Weather**
  - Enter a city name to fetch real-time weather data.
  - Debounced input field and throttled search button to prevent API spamming.

- 🌤 **Current Weather Data**
  - City name
  - Temperature (°C)
  - Weather description
  - Humidity
  - Wind speed
  - Weather icon (from OpenWeatherMap)

- 🗺 **Google Map Integration**
  - Display the searched city's location on an interactive map.

- 📆 **5-Day Forecast**
  - View a 5-day forecast on a separate page (`forecast.html`) with daily temperatures and conditions.

- ⚙️ **Error Handling**
  - Graceful handling of invalid city names or API failures.

---

## 🛠 Technologies Used

- HTML5
- Tailwind CSS
- JavaScript (Vanilla)
- OpenWeatherMap API
- Google Maps JavaScript API

---

## 🔑 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
