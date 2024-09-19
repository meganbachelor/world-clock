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

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);

  const icons = {
    "Europe/London": "fi-gb",
    "Europe/Paris": "fi-fr",
    "Australia/Sydney": "fi-au",
  };

  let citiesElement = document.querySelector("#cities");

  let iconInc = icons[cityTimeZone] || "";

  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName} <i class="fi ${iconInc}"></i></h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("hh:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  `;
}

updateTime();
setInterval(updateTime, 1000);

let citySelectElement = document.querySelector("#city");
citySelectElement.addEventListener("change", updateCity);
