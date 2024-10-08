let intervalCheck;

function updateTime() {
  const cities = [
    { id: "new-york", value: "America/New_York" },
    { id: "bangkok", value: "Asia/Bangkok" },
  ];

  cities.forEach((city) => {
    let cityElement = document.querySelector(`#${city.id}`);
    if (cityElement) {
      let cityDateElement = cityElement.querySelector(".date");
      let cityTimeElement = cityElement.querySelector(".time");
      let cityTime = moment().tz(city.value);

      cityDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
      cityTimeElement.innerHTML = cityTime.format(
        "h:mm:ss [<small>]A[</small>]"
      );
    }
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);

  const icons = {
    "America/Chicago": "fi-us",
    "Europe/Istanbul": "fi-tr",
    "Africa/Lagos": "fi-ng",
    "Europe/London": "fi-gb",
    "Europe/Paris": "fi-fr",
    "Australia/Sydney": "fi-au",
    "Asia/Tokyo": "fi-jp",
  };

  let citiesElement = document.querySelector("#cities");
  let iconInc = icons[cityTimeZone] || "";

  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}  <i class="fi ${iconInc}"></i></h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("hh:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  <br>
  <a href="/">Return to homepage</a>
  `;

  clearInterval(intervalCheck);

  intervalCheck = setInterval(() => {
    let updatedCityTime = moment().tz(cityTimeZone);
    citiesElement.querySelector(".date").innerHTML =
      updatedCityTime.format("MMMM Do YYYY");
    citiesElement.querySelector(".time").innerHTML =
      updatedCityTime.format("hh:mm:ss") +
      " <small>" +
      updatedCityTime.format("A") +
      "</small>";
  }, 1000);
}

updateTime();
setInterval(updateTime, 1000);

let citySelectElement = document.querySelector("#city");
citySelectElement.addEventListener("change", updateCity);
