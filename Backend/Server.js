const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port = 6150;

try {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  // server.on('error', (err) => {
  //   if (err.code === 'EADDRINUSE') {
  //     console.error(`Port ${port} is already in use.`);
  //   } else {
  //     console.error('Server error:', err);
  //   }
  // });
} catch (listenError) {
  console.error("Error during server startup:", listenError);
}

app.get('/getweather', async (req, res) => {
  try {
    const cityName = req.query.q;
    console.log(`Fetching weather for: ${cityName}`);
    if (!cityName) {
      return res.status(400).json({ error: "City name is required" });
    }
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    };
    res.json(weatherData);
    console.log(`Weather data sent for: ${cityName}`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get('/air-pollution/:city', async (req, res) => {
  try {
    const city = req.params.city;
    console.log(`Fetching air pollution data for: ${city}`);
    const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`);
    if (!geoResponse.data || geoResponse.data.length === 0) {
      console.error(`City not found: ${city}`);
      return res.status(404).json({ error: 'City not found' });
    }
    const { lat, lon } = geoResponse.data[0];
    const pollutionResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
    const PRData = {
      Eindex: pollutionResponse.data.list[0].main.aqi,
      pm2_5: pollutionResponse.data.list[0].components.pm2_5,
      pm10: pollutionResponse.data.list[0].components.pm10,
      no2: pollutionResponse.data.list[0].components.no2,
      so2: pollutionResponse.data.list[0].components.so2,
      o3: pollutionResponse.data.list[0].components.o3,
      co: pollutionResponse.data.list[0].components.co,
    };
    res.json(PRData);
    console.log(`Air pollution data sent for: ${city}`);
  } catch (error) {
    console.error("Error fetching air pollution data:", error);
    res.status(500).json({ error: 'Error fetching air pollution data' });
  }
});