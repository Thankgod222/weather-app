const apiKey = "a80829a6cb345db29c5175c59edbc828";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search-area input");
   const searchBtn = document.querySelector(".search-area button");

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city  + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "% ";
    document.querySelector(".wind").innerHTML =
      data.wind.speed + " km/h ";
    document.querySelector(".weather-icon").src =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
//   checkWeather()
