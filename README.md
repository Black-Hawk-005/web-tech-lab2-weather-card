# Weather App

This is a simple web application that displays current weather information for a specified location. It uses the WeatherAPI to fetch real-time weather data.

## Features

- **Search by Location:** Get weather details for any city or region by typing its name.
- **Current Location Weather:** Automatically detects your current location (with your permission) and displays the weather.
- **Key Weather Metrics:** Shows temperature, humidity, and wind speed.
- **Dynamic Icons:** The weather icon updates to reflect current conditions (e.g., sunny, cloudy, rainy).

## Technologies Used

- **HTML:** Structures the web page.
- **CSS:** Styles the user interface.
- **JavaScript:** Handles fetching data from the API and updating the UI dynamically.
- **WeatherAPI:** Provides the weather data.

## Requirements:
- Install dotenv package using
```
npm install dotenv
```

## How to Use

1.  **Get an API Key:** You'll need to sign up for a free API key from [WeatherAPI](https://www.weatherapi.com/).

2. **.env file:** Create a .env file with APIKEY as variable and store the API key.

3.  **Update the API Key:** Open the `config.js` file and replace `'YOUR_KEY'` with the API key you received.
    
    ```javascript
    const apiKey = 'YOUR_KEY'; 
    ```
    
4.  **Open the Application:** Simply open the `index.html` file in your web browser. The app will prompt you for your location to show the weather for your current city.
5.  **Search for a Location:** To check the weather for a different place, type the city name into the search box and click the search button.

## Files

- `index.html`: The main HTML file for the application structure.
- `styles.css`: The stylesheet for the app's design.
- `script.js`: The core JavaScript file that handles API calls and UI updates.
- `config.js`: Contains the API key.
- `img/`: This directory should contain the image assets for the icons used in the app (e.g., search, cloudy, humidity, wind).

## Geolocation

The app attempts to use the browser's **Geolocation API** to get your current coordinates and fetch the local weather automatically. If you deny permission or if the feature is unavailable, you can still use the search bar to look up a location manually.
