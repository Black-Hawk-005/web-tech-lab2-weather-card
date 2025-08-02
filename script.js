// Contains the JavaScript file for the weather app to fetch the current status of the current location/entered location.

const dateObj = new Date();

const getDayName = (dayType, dateVal = dateObj) =>
  dateVal.toLocaleDateString('en-US', { weekday: dayType });


// This function fetches the data from the api using location input.
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

// This function fetches the input value, checks for the test cases and feeds to function that fetches the weather api.
async function fetchWeatherCondition() {
  const locationInput = document.querySelector('.location-input');
  let location = locationInput.value.trim();

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  await fetchWeatherData(location);
}

// This function update the weather part with the data fetched from API.
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

// Gets current location and get the weather conditions and updates on loading.
navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`;

    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);

    fetchWeatherData(location);
  },
  error => {
    console.error("Error fetching geolocation:", error);
    alert("Unable to fetch your current location. Please allow location access or search manually.");
  }
);
