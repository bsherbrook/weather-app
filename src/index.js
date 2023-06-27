import "./style.scss";

const locationButton= document.getElementById('locationButton');
const locationInput= document.getElementById('locationInput');
const contentBody= document.getElementById('content');
let userLocation='';
let weatherForecast='';
let locationDiv= document.getElementById('location');

locationButton.addEventListener('click', ()=>{
    userLocation= locationInput.value;
    processData();
})
async function getWeather() {
  try {
    const apiKey = "986fa07c03304131bf4135555231806";
    const city = userLocation
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
async function processData() {
  const data = await getWeather();
  console.log(data);
  locationDiv.textContent=`${data.location.name}, ${data.location.region}, ${data.location.country}`;
  contentBody.textContent=`Forecast:${data.current.condition.text} | Temp:${data.current.temp_f}F`
  weatherForecast=data.current.condition.text;
  getGif();
  //console.log(data.current.condition.text);
  //console.log(data.current.temp_f);
}

async function getGif(){
    try {
        const apiKey = "v1JYudhosZXZRTqCmv5JtZTPEpppNnyA";
        const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${weatherForecast}&weirdness=1`;
        const response = await fetch(url);
        const gifData = await response.json();
        const img= document.getElementById('weatherGif');
        img.src= gifData.data.images.original.url;
        console.log(gifData);
        return gifData;
      } catch (error) {
        console.error("Error fetching GIPHY data:", error);
      } 
}