const iconNameToSizeMap = {
  cloudy: { width: 264, height: 166, viewbox: [264, 166] },
  sunny: { width: 208, height: 213, viewbox: [208, 213] },
  stormy: { width: 246, height: 187, viewbox: [246, 187] },
  snowy: { width: 230, height: 196, viewbox: [230, 196] },
  "partly-cloudy": { width: 230, height: 209, viewbox: [230, 209] },
  rainy: { width: 160, height: 222, viewbox: [160, 222] },
};

const weatherConditions = new Map([
  ["Thunderstorm", "stormy"],
  ["Drizzle", "rainy"],
  ["Rain", "rainy"],
  ["Snow", "snowy"],
  ["Atmosphere", "partly-cloudy"],
  ["Clear", "sunny"],
  ["Clouds", "cloudy"],
]);

const apiKey = "a7a34e08d7e8d06ea7ab2d6f1969bff8";

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=53.32&lon=-6.4&exclude={part}&appid=${apiKey}&units=metric`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.daily[0].weather[0].description);
    data.daily.forEach((value, index) => {
      if (index >= 0) {
        const date = new Date(value.dt * 1000);
        const div = document.createElement("div");
        const markup = `
  <div class="day-of-week">${date.toLocaleDateString("en", {
    weekday: "short",
  })}</div>
  <div class="date">${date.getDate()}</div>
  
  <div class="bar ${weatherConditions.get(value.weather[0].main)}">
    <div class="weather">
    <svg role="img" width="${iconNameToSizeMap[weatherConditions.get(value.weather[0].main)].width}" height="${iconNameToSizeMap[weatherConditions.get(value.weather[0].main)].height}" viewBox="0 0 ${iconNameToSizeMap[weatherConditions.get(value.weather[0].main)].viewbox[0]} ${
          iconNameToSizeMap[weatherConditions.get(value.weather[0].main)].viewbox[1]
        }">
        <use xlink:href="#${weatherConditions.get(value.weather[0].main)}"></use>
      </svg>
    </div>
    <div class="temperature">
      ${Math.round(value.temp.max)}<span class="degrees">&deg;</span>
    </div>
    <div class="content">
      <div class="precipitation">
        <svg role="img" class="icon">
          <use xlink:href="#precipitation"></use>
        </svg>
        ${value.pop * 100}%
      </div>
      <div class="low">
        <svg role="img" class="icon">
          <use xlink:href="#low"></use>
        </svg>
        ${Math.round(value.temp.min)}&deg;
      </div>
    </div>
  </div>
  `;
        div.innerHTML = markup;
        div.classList.add("day");
        document.querySelector(".wrapper").appendChild(div);
      }
    });
  });
