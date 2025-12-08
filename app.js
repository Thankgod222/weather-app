const apiKey = "a80829a6cb345db29c5175c59edbc828";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-area input");
const searchBtn = document.querySelector(".search-area button");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);

  document.querySelector(".city-name").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "% ";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h ";
  document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa ";

  document.querySelector(".sunrise").innerHTML = new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.querySelector(".sunset").innerHTML = new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  document.querySelector(".description").innerHTML = data.weather[0].description;
  document.querySelector(".weather-icon").src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

  //TO GET THE CURRENT DATE OF EACH SEARCHED CITY
  localTime = (dt + timezone) * 1000;

  function getLocalDateTime(dt, timezone) {
    const local = new Date((dt + timezone) * 1000);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return local.toLocaleString("en-US", options);
  }
  const dt = data.dt; // UTC timestamp
  const timezone = data.timezone; // timezone offset

  const localDate = getLocalDateTime(dt, timezone);

  document.getElementById("date").innerText = localDate;
}
//search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
