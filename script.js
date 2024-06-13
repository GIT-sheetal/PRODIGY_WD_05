const apiKey = '495e6b7aaec290de86e8b0958f585c8f'; // Replace with your OpenWeatherMap API key

const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    }
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function fetchWeatherDataByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherInfo.style.display = 'block';
    } else {
        alert('Location not found.');
    }
}
