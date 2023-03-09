import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import "./Weather.css";
import weather from "../../../assets/images/weather.png";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const searchurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=805617e57ab526c0bde5101d4bd143c0`;

  useEffect(() => {
    axios
      .get(
        url +
          "?q=Barrie&units=imperial&appid=805617e57ab526c0bde5101d4bd143c0"
      )
      .then((response) => {
        setData(response.data);
        setLocation("");
      });
  }, []);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(searchurl).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Weather</h1>
      <div className="weather-content">
        <div className="overlay">
          <div className="search">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
          </div>
          <Container className="pb-3">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img src={weather} width={40} height={30} />
                {data.main ? (
                  <h3 className="text-black mx-2">
                    {data.main.temp.toFixed()}°F
                  </h3>
                ) : null}
              </Card>
              <div>{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
            </div>

            <Container>
              {data.name !== undefined && (
                <div className="bottom">
                  <div className="feels">
                    {data.main ? (
                      <h3 className="bold">{data.main.feels_like.toFixed()}°F</h3>
                    ) : null}
                    <p>Feels Like</p>
                  </div>
                  <div className="humidity">
                    {data.main ? (
                      <h3 className="bold">{data.main.humidity}%</h3>
                    ) : null}
                    <p>Humidity</p>
                  </div>
                  <div className="wind">
                    {data.wind ? (
                      <h3 className="bold">{data.wind.speed.toFixed()} MPH</h3>
                    ) : null}
                    <p>Wind Speed</p>
                  </div>
                </div>
              )}
            </Container>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Weather;
