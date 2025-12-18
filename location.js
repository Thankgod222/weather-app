const apiKey = "a80829a6cb345db29c5175c59edbc828";

const cityApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const coordApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search-area input");
const searchBtn = document.querySelector(".search-area button:first-of-type");
const locationBtn = document.querySelector("#loc-btn");

// Update the UI
function updateUI(data) {
  document.querySelector(".city-name").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

  document.querySelector(".sunrise").innerHTML = new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.querySelector(".sunset").innerHTML = new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.querySelector(".description").innerHTML =
    data.weather[0].description;
  document.querySelector(
    ".weather-icon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Search weather by city
async function checkWeather(city) {
  try {
    const response = await fetch(`${cityApiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    updateUI(data);
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}

// Search weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
  try {
    const response = await fetch(
      `${coordApiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    if (!response.ok)
      throw new Error("Unable to fetch weather for your location");
    const data = await response.json();
    updateUI(data);
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}

// Handle geolocation
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, showError);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Extract coordinates and fetch weather
function fetchWeatherByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("Latitude:", lat, "Longitude:", lon);
  fetchWeatherByCoordinates(lat, lon);
}

// Handle geolocation errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    default:
      alert("An unknown error occurred.");
      break;
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

locationBtn.addEventListener("click", getUserLocation);
