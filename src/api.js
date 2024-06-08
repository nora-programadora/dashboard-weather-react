async function getWeather(name, lat, lng) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely&appid=cf0f236d99f05f78766736970398dfe2`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    populatePage(name, data);
    createChart(data.hourly);
    input.value = "";
  } catch (error) {
    apiFetchErrHandler();
  }
}

const apiFetchErrHandler = () => {
  //show user that city can not be found
  input.placeholder = "could not find";
  input.value = "";
  input.classList.add("input-error");
};
