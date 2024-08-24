const renderCurrent = (data) => {
  const template = `<div><p>${
    data.city.name
  }</p><p>${new Date().toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  })}</p></div>
  <div class='currentData'><img src="./icons/${
    data.list[0].weather[0].icon
  }.png" alt="icon" class='icon'/><p>${
    data.list[0].weather[0].main
  }</p><div class='celsius'><p>${Math.ceil(
    data.list[0].main.temp
  )}</p><img src='./icons/celsius.png' alt='celsius'/></div></div>
  <div class='speed'><div>Speed</div><div>${
    data.list[0].wind.speed
  } m/s</div></div>
  <div class='humidity'><div>Humidity</div><div>${
    data.list[0].main.humidity
  } %</div></div>`;
  current.innerHTML = template;
};

const renderForecast = (data) => {
  for (let i = 0; i < 40; i++) {
    let date = data.list[i].dt_txt.slice(0, 10),
      time = data.list[i].dt_txt.slice(11, 19),
      icon = data.list[i].weather[0].icon,
      celsius = Math.ceil(data.list[i].main.temp);

    if (i % 8 !== 0) {
      let templateForecast = `<div class ='row none' id='${i}'><div><p>${time}</p>
      </div><img src="./icons/${icon}.png" alt="icon" class='icon' id='icon'/>
      <div class='celsius'><p>${celsius}</p><img src='./icons/celsius.png' alt='celsius'/></div></div>`;
      forecast.innerHTML += templateForecast;
    } else if (i % 8 === 0) {
      let templateCurrent = `<div class="row" id='${i}'><div class='date'><p>${date}</p>
      <p>${time}</p></div><img src="./icons/${icon}.png" alt="icon" class='icon' />
      <div class='celsius'><p>${celsius}</p>
      <img src='./icons/celsius.png' alt='celsius'/>
      </div></div>`;
      forecast.innerHTML += templateCurrent;
    }
  }
};

export async function getForecast() {
  try {
    const getData = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247&units=metric"
    );
    const getArr = await getData.json();
    renderCurrent(getArr);
    renderForecast(getArr);
  } catch {
    console.error("error");
  } finally {
    console.log("прогноз выведен на страницу");
  }
}

export function hourlyForecast(event) {
  let id = +event.target.id;
  const noneArray = document.querySelectorAll(".row");
  if (event.target.getAttribute("flag") !== "opened") {
    for (let i = id + 1; i <= id + 7; i++) {
      noneArray[i].style.background = "rgb(17, 55, 76)";
      noneArray[i].classList.remove("none");
    }
    event.target.setAttribute("flag", "opened");
  } else if (event.target.getAttribute("flag") === "opened") {
    for (let i = id + 1; i <= id + 7; i++) {
      noneArray[i].classList.add("none");
    }
    event.target.removeAttribute("flag");
  }
}
