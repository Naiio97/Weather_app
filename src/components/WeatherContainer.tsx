import { ChangeEvent, useState, useEffect, useRef } from "react";

import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";

import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import Search from "./Search";

import { optionType, forecastType } from "../types/index";
import {
  uvInfo,
  getWindDirection,
  firstLetterUppercase,
  feelsLikeInfo,
  visibilityKm,
  visibilityInfo,
} from "../helpers/index";

import "../styles/WeatherContainer.scss";
import uv from "../../public/uv.svg";
import wind from "../../public/wind.svg";
import rain from "../../public/rain.svg";
import feelsLike from "../../public/feels-like.svg";
import visibility from "../../public/visibility.svg";
import arrowLeft from "../../public/arrow-left.svg";
import arrowRight from "../../public/right-arrow.svg";

const WeatherContainer = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const api_key = import.meta.env.VITE_REACT_APP_API_KEY;

  const getSearchOptions = (cityName: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((e) => console.log({ e }));
  };

  const getForecast = (data: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const extractedData = {
          ...data,
          hourly: data.hourly.slice(0, 25),
        };

        setForecast(extractedData);
      });
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchCity(e.target.value);

    if (value !== "") {
      getSearchOptions(value);
    }
  };

  useEffect(() => {
    if (city) {
      setSearchCity(city.name);
      setOptions([]);
      getForecast(city);
    }
  }, [city]);

  const hourlyWeatherWindowRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (hourlyWeatherWindowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        hourlyWeatherWindowRef.current;

      const showRight = scrollLeft + clientWidth < scrollWidth - 1;

      const leftArrow = document.querySelector(".arrow.left") as HTMLElement;
      const rightArrow = document.querySelector(".arrow.right") as HTMLElement;

      if (scrollLeft === 0) {
        leftArrow.style.display = "none";
      } else {
        leftArrow.style.display = "block";
      }

      if (showRight) {
        rightArrow.style.display = "block";
      } else {
        rightArrow.style.display = "none";
      }
    }
  };

  const handleMouseLeave = () => {
    const leftArrow = document.querySelector(".arrow.left") as HTMLElement;
    const rightArrow = document.querySelector(".arrow.right") as HTMLElement;

    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
  };

  const handleMouseEnter = () => {
    handleScroll();
  };

  useEffect(() => {
    if (hourlyWeatherWindowRef.current) {
      hourlyWeatherWindowRef.current.addEventListener("scroll", handleScroll);
      hourlyWeatherWindowRef.current.addEventListener(
        "mouseleave",
        handleMouseLeave
      );
      hourlyWeatherWindowRef.current.addEventListener(
        "mouseenter",
        handleMouseEnter
      );
    }
  }, []);

  return (
    <div>
      {forecast && city ? (
        <div className="weather-window">
          <header>
            <Search
              options={options}
              handleSearch={handleSearch}
              onOptionSelect={onOptionSelect}
              searchCity={searchCity}
            />
            <div className="header-info">
              <h1>{city.name}</h1>

              <span className="actual-temp">
                {Math.round(forecast.current.temp)}°
              </span>

              <span>
                {firstLetterUppercase(forecast.current.weather[0].description)}
              </span>
              <div className="low-hig">
                <span>
                  <BsArrowDown />
                  {Math.floor(forecast.daily[0].temp.min)}°
                </span>
                <span>
                  <BsArrowUp />
                  {Math.round(forecast.daily[0].temp.max)}°
                </span>
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              <div className="hourly-for">
                <img className="arrow left" src={arrowLeft} />
                <img className="arrow right" src={arrowRight} />
                <h3 style={{ display: "block", marginBottom: 10 }}>
                  {forecast.daily[0].summary}.
                </h3>
                <div className="horisontal-bar"></div>
                <div
                  className="hourly-weather-window"
                  ref={hourlyWeatherWindowRef}
                >
                  {forecast.hourly.length >= 1
                    ? forecast.hourly.map(
                        (
                          hour: {
                            dt: number;
                            temp: number;
                            weather: {
                              icon: string;
                            }[];
                          },
                          index
                        ) => {
                          const isCurrentHour = index === 0;
                          return (
                            <HourlyForecast
                              key={hour.dt}
                              hourKey={index}
                              dt={hour.dt}
                              temp={hour.temp}
                              now={isCurrentHour}
                              icon={hour.weather[0].icon}
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
                  {forecast.daily.length >= 1
                    ? forecast.daily.map(
                        (
                          day: {
                            dt: number;
                            temp: {
                              min: number;
                              max: number;
                            };
                            weather: {
                              icon: string;
                            }[];
                          },
                          index: number
                        ) => {
                          const isLastItem =
                            index === forecast.daily.length - 1;
                          const today = index === 0;
                          return (
                            <DailyForecast
                              key={day.dt}
                              dailyKey={index}
                              day={day.dt}
                              min={day.temp.min}
                              max={day.temp.max}
                              icon={day.weather[0].icon}
                              isLastItem={isLastItem}
                              today={today}
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
                  <div>
                    <div className="uv-value">
                      <span>{Math.round(forecast.current.uvi)}</span>
                      <span>
                        {uvInfo(forecast.current.uvi, forecast.hourly).level}
                      </span>
                    </div>
                    <div className="uv-bar">
                      <div className="ball"></div>
                    </div>
                    <div className="uv-info">
                    <p>{uvInfo(forecast.current.uvi, forecast.hourly).info}</p>
                    </div>
                    
                  </div>
                </div>
                <div className="wind">
                  <div className="name-tile">
                    <img src={wind} />
                    <h3>WIND</h3>
                  </div>
                  <div className="wind-value">
                    <span>{Math.round(forecast.current.wind_speed)} km/h</span>
                    <span>{getWindDirection(forecast.current.wind_deg)}</span>
                  </div>
                  
                  {forecast.current.wind_gust && (
                    <div className="wind-info">
                    <p>
                      In gusts up to {Math.round(forecast.current.wind_gust)}
                    </p>
                    </div>
                  )}

                </div>
                <div className="rain">
                  <div className="name-tile">
                    <img src={rain} />
                    <h3>RAIN</h3>
                  </div>
                  <div className="rain-value">
                    <span>
                      {forecast.daily[0].rain
                        ? Math.round(forecast.daily[0].rain)
                        : 0}{" "}
                      mm
                    </span>
                    <span>in last 24 hours</span>
                  </div>
                    <div className="rain-info">
                      <p>
                        {forecast.daily[1].rain ? Math.round(forecast.daily[1].rain) : 0 } mm expected in next 24h.
                      </p>
                    </div>
                </div>
                <div className="feels-like">
                  <div className="name-tile">
                    <img src={feelsLike} />
                    <h3>FEELS LIKE</h3>
                  </div>
                  <div className="feels-like-value">
                    <span> {Math.round(forecast.current.feels_like)}° </span>
                  </div>
                  <div className="feels-like-info">
                    <p>
                      {feelsLikeInfo(
                        forecast.current.feels_like,
                        forecast.current.temp
                      )}
                    </p>
                  </div>
                </div>
                <div className="visibility">
                  <div className="name-tile">
                    <img src={visibility} />
                    <h3>VISIBILITY</h3>
                  </div>
                  <div className="visibility-value">
                    <span>{visibilityKm(forecast.current.visibility)} km</span>
                  </div>
                  <div className="visibility-info">
                    <p>{visibilityInfo(forecast.current.visibility)}</p>
                  </div>
                </div>
                <div className="humidity">
                  <div className="name-tile">
                    <img src={uv} />
                    <h3>Humidity</h3>
                  </div>
                  <div className="humidity-value">
                    <span>{forecast.current.humidity}%</span>
                  </div>
                  <div className="humidity-info">
                        <p>The dew point is {Math.round(forecast.current.dew_point)}° right now.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="search-weather">
          <div className="search-container">
            <Search
              options={options}
              handleSearch={handleSearch}
              onOptionSelect={onOptionSelect}
              searchCity={searchCity}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherContainer;
