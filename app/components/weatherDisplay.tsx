"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);

  useEffect(() => {
    async function fetchCurrentWeather() {
      const response = await fetch("/api/weather");
      const data = await response.json();
      setWeatherData(data);
    }
    fetchCurrentWeather();
  }, []);

  useEffect(() => {
    async function fetchForecast() {
      const response = await fetch("/api/weather/forecast");
      const data = await response.json();
      setForecastData(data);
    }
    fetchForecast();
  }, []);

  if (!weatherData || !forecastData) return <div>Loading...</div>;

  return (
    <div className={styles.currentWeather}>
      <h2>
        Current Weather in {weatherData.name}, {weatherData.sys.country}
      </h2>

      <div className={styles.currentWeather}>
        <h3>Current Weather</h3>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Feels like: {weatherData.main.feels_like}°C</p>
        <p>
          Min/Max: {weatherData.main.temp_min}°C / {weatherData.main.temp_max}°C
        </p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>
          Wind: {weatherData.wind.speed} m/s, {weatherData.wind.deg}°
        </p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>

      <div className={styles.forecast}>
        <h3>5-Day Forecast</h3>
        <div className={styles.forecastGrid}>
          {forecastData.list
            .filter((item: any, index: number) => index % 8 === 0)
            .slice(0, 5)
            .map((day: any, index: number) => (
              <div key={index} className={styles.forecastDay}>
                <p>
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <p>{Math.round(day.main.temp)}°C</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}
