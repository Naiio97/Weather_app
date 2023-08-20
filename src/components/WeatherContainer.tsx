import React, { useState } from "react";
import axios from "axios";

import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";

import "../styles/WeatherContainer.scss";
import uv from "../../public/uv.svg";
import wind from "../../public/wind.svg";
import rain from "../../public/rain.svg";
import feelsLike from "../../public/feels-like.svg";
import visibility from "../../public/visibility.svg";

import hourly from "../hourly.json";

type Props = {
  id: React.Key;
  hour: number;
  temperature: number;
};

type Daily = {
  id: React.Key;
  day: string;
  lowest: number;
  higest: number;
  isLastItem: boolean;
};

const WeatherContainer = () => {
  const [articles, setArticles] = useState<Props[]>([]);
  const [daily, setDaily] = useState<Daily[]>([]);

  useState(() => {
    setArticles(hourly.hourly);
  }, []);

  useState(() => {
    setDaily(hourly.daily);
  }, []);

  // useEffect(() => {
  //   // Definujeme asynchronní funkci
  //   const fetchWeather = async () => {
  //     try {
  //       const response = await axios.get<{ items: LocationWeather[] }>(
  //         `https://api.openweathermap.org/data/2.5/weather?q=Prague&appid=f4cc83065087980bbfad37e8558f7712`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response.data);

  //       setLocations(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchWeather();
  // }, []);

  // console.log(location);

  return (
    <div>
      <div className="weather-window">
        <header>
          <div className="search">
            <input id="city" name="city" type="text" placeholder="Hledat" />
            <BsSearch />
          </div>
          <div className="header-info">
            <h1>Prague</h1>
            <div className="actual-temp">
              <span>31°</span>
              <img></img>
            </div>
            <span>Clear sky</span>
            <div className="low-hig">
              <span>
                <BsArrowDown />
                18°
              </span>
              <span>
                <BsArrowUp />
                31°
              </span>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="hourly-for">
              <h3 style={{ display: "block", marginBottom: 10 }}>
                HOURLY FORECAST
              </h3>
              <div className="horisontal-bar"></div>
              <div className="hourly-weather-window">
                {articles.length >= 1
                  ? articles.map(
                      (article: {
                        id: React.Key;
                        hour: number;
                        temperature: number;
                      }) => {
                        return (
                          <HourlyForecast
                            key={article.id}
                            hour={article.hour}
                            temperature={article.temperature}
                            id={""}
                            icon={""}
                          />
                        );
                      }
                    )
                  : null}
              </div>
            </div>
            <div className="daily-for">
              <h3>DAILY FORECAST</h3>
              <div className="horisontal-bar"></div>
              <div className="daily-weather-window">
                {daily.length >= 1
                  ? daily.map(
                      (
                        day: {
                          id: React.Key;
                          day: string;
                          lowest: number;
                          higest: number;
                        },
                        index: number
                      ) => {
                        const isLastItem = index === daily.length - 1;
                        return (
                          <DailyForecast
                            key={day.id}
                            day={day.day}
                            lowest={day.lowest}
                            higest={day.higest}
                            isLastItem={isLastItem}
                            id={""}
                          />
                        );
                      }
                    )
                  : null}
              </div>
            </div>
            <div className="weather-details">
              <div className="uv-index">
                <div className="name-tile">
                  <img src={uv} />
                  <h3>UV INDEX</h3>
                </div>
                <div className="uv-value">
                  <span>2</span>
                  <span>Low</span>
                </div>
                <div className="uv-bar">
                  <div className="ball"></div>
                </div>
              </div>
              <div className="wind">
                <div className="name-tile">
                  <img src={wind} />
                  <h3>WIND</h3>
                </div>
                <div className="wind-value">
                  <span> 2.2m/s </span>
                </div>
              </div>
              <div className="rain">
                <div className="name-tile">
                  <img src={rain} />
                  <h3>RAIN</h3>
                </div>
                <div className="rain-value">
                  <span>2mm</span>
                  <span>in last 24 hours</span>
                </div>
              </div>
              <div className="feels-like">
                <div className="name-tile">
                  <img src={feelsLike} />
                  <h3>FEELS LIKE</h3>
                </div>
                <div className="feels-like-value">
                  <span> 33° </span>
                </div>
              </div>
              <div className="visibility">
                <div className="name-tile">
                  <img src={visibility} />
                  <h3>VISIBILITY</h3>
                </div>
                <div className="visibility-value">
                  <span>10 km</span>
                </div>
              </div>
              <div className="humidity">
                <div className="name-tile">
                  <img src={uv} />
                  <h3>Humidity</h3>
                </div>
                <div className="humidity-value">
                  <span>43%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeatherContainer;
