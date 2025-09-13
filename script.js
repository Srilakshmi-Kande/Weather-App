let cityInput = document.getElementById("cityinput");

let checkweatherButton = document.getElementById("checkweatherbutton");

let CityAndCountry = document.getElementById('cityandcountry');
let CurrentTemp = document.getElementById('currenttemp');
let FeelsLike = document.getElementById('feelslike');
let Humidity = document.getElementById('humidity');
let WindSpeed = document.getElementById('windspeed');
let Condition = document.getElementById('condition');
let WeatherImage = document.getElementById('image');

const apiKey = "YOUR_API_KEY";

async function getWeatherDetails(city){

    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);

    const parsedData = await data.json();

    const formattedData = formatWeatherData(parsedData);

    updatedUI(formattedData);

}

checkweatherButton.addEventListener("click", function() {
    let cityName = cityInput.value;

    cityInput.value = "";

    getWeatherDetails(cityName);
})

function formatWeatherData(parsedData){
    return {
        city: parsedData.location.name,
        country: parsedData.location.country,
        currentTemp: parsedData.current.temp_c,
        feelsLike: parsedData.current.feelslike_c,
        humidity: parsedData.current.humidity,
        windSpeed: parsedData.current.wind_kph,
        condition: parsedData.current.condition.text,
        weatherImg: parsedData.current.condition.icon,
    };
}

function updatedUI(data){
    CityAndCountry.innerText = `${data.city}, ${data.country}`;
    CurrentTemp.innerText = `${data.currentTemp}°C`;
    FeelsLike.innerText = `${data.feelsLike}°C`;
    Humidity.innerText = `${data.humidity}%`;
    WindSpeed.innerText = `${data.windSpeed} kph`;
    Condition.innerText = `${data.condition}`;
    WeatherImage.src = `${data.weatherImg}`

}
