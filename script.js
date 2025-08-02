const dateObj = new Date();

const getDayName = (dayType, dateVal = dateObj) =>
  dateVal.toLocaleDateString('en-US', { weekday: dayType });


async function fetchWeatherData(location) {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(`Failed to fetch weather data: ${error.message}`);
  }
}

async function fetchWeatherCondition() {
  const locationInput = document.querySelector('.location-input');
  let location = locationInput.value.trim();

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  await fetchWeatherData(location);
}

function updateWeatherUI(data) {
  try {
    document.querySelector('.location').textContent = `${data.location.name}`;
    document.querySelector('.weather-temp').textContent = `${data.current.temp_c}°C`;
    document.querySelector('.humidity-value').textContent = `${data.current.humidity} %`;
    document.querySelector('.wind-speed-value').textContent = `${data.current.wind_kph} Km/hr`;
    document.querySelector('.weather-icon').src = data.current.condition.icon;
  } catch (error) {
    console.error("Error updating UI:", error);
    alert("Unexpected error while updating weather information.");
  }
}

// Get current location weather
navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`; // Proper comma-separated format for API

    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);

    fetchWeatherData(location);
  },
  error => {
    console.error("Error fetching geolocation:", error);
    alert("Unable to fetch your current location. Please allow location access or search manually.");
  }
);
