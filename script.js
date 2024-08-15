const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const weatherInfo = document.getElementById('weather-info');
const locationInput = document.getElementById('location-input');
const locationForm = document.getElementById('location-form');
const geoBtn = document.getElementById('geo-btn');

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const { name, main, weather, wind } = data;
                document.getElementById('location').textContent = `Location: ${name}`;
                document.getElementById('temperature').textContent = `Temperature: ${main.temp}°C`;
                document.getElementById('description').textContent = `Weather: ${weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${main.humidity}%`;
                document.getElementById('wind').textContent = `Wind Speed: ${wind.speed} m/s`;
            } else {
                alert('Location not found');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function handleGeoSuccess(position) {
    const { latitude, longitude } = position.coords;
    fetchWeather(`lat=${latitude}&lon=${longitude}`);
}

function handleGeoError() {
    alert('Unable to retrieve your location');
}

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    } else {
        alert('Geolocation is not supported by this browser');
    }
});
