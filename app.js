const apiKey = "a80829a6cb345db29c5175c59edbc828";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const coordApiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const coordApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search-area input");
const searchBtn = document.querySelector(".search-area button");
const locationBtn = document.querySelector("#loc-btn");

function formatLocalDate(dt, timezone) {
  const localTime = new Date((dt + timezone) * 1000);

  return localTime.toLocaleString("en-US", {
    timeZone: "UTC", // 🔥 THIS FIXES THE +1 HOUR ISSUE
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateUI(data) {
  document.querySelector(".city-name").innerHTML = data.name;
  // ✅ Local date integration
  document.getElementById("local-date").innerText = formatLocalDate(
    data.dt,
    data.timezone
  );
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
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  updateUI(data);
  console.log(data);

  //TO GET THE CURRENT DATE OF EACH SEARCHED CITY
}

// Search weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
  const response = await fetch(
    `${coordApiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  const data = await response.json();
  updateUI(data);

  console.log(data);
}

// Handle geolocation
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, showError);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Location access denied.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("Location request timed out.");
      break;
    default:
      alert("An unknown error occurred.");
  }
}

// Extract coordinates and fetch weather
function fetchWeatherByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat, lon);

  // Fetch weather data using lat/lon
  fetchWeatherByCoordinates(lat, lon);
}

//search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

locationBtn.addEventListener("click", getUserLocation);
