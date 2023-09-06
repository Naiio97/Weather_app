import "../styles/DailyForecast.scss";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

type Props = {
  dailyKey: number;
  day: number;
  timezone: string;
  temp: number;
  min: number;
  max: number;
  icon: string;
  isLastItem: boolean;
  today: boolean;
  lowestTemp: number;
  highestTemp: number;
};

const DailyForecast = (props: Props) => {
  const {
    dailyKey,
    day,
    timezone,
    min,
    max,
    icon,
    isLastItem,
    today,
    lowestTemp,
    highestTemp,
  } = props;

  //const [tempBallPosition, setTempBallPositio] = useState<number>(0);
  const [barWidth, setBarWidth] = useState(0);
  const [barLeft, setBarLeft] = useState(0);

  const getDay = (dt: number, timezone: string): string => {
    const dateTime = DateTime.fromSeconds(dt, { zone: timezone });

    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    return daysOfWeek[dateTime.weekday - 1];
  };

  useEffect(() => {
    const dayMin = Math.round(min);
    const dayMax = Math.round(max);
    const lowestTempWeek = Math.round(lowestTemp);
    const highestTempWeek = Math.round(highestTemp);

    const tempRange = highestTempWeek - lowestTempWeek;
    const minTempPosition = ((dayMin - lowestTempWeek) / tempRange) * 100;
    const maxTempPosition = ((dayMax - lowestTempWeek) / tempRange) * 100;

    setBarLeft(Math.round(minTempPosition));
    setBarWidth(Math.round(maxTempPosition - Math.round(minTempPosition)));
  }, [min, max, lowestTemp, highestTemp]);

  // useEffect(() => {
  //   if (today) {
  //     const actualTemp = Math.round(temp);
  //     const dayMin = Math.round(min);
  //     const dayMax = Math.round(max);
      

  //     const minPosition = 0;
  //     const maxPosition = barWidth + 8;

  //     const normalizedTemp = Math.min(Math.max(actualTemp, dayMin), dayMax);

  //     const barRange = maxPosition - minPosition;
  //     const tempRange = dayMax - dayMin;

  //     const relativePosition =
  //       ((normalizedTemp - dayMin) / tempRange) * barRange + minPosition;

  //     setTempBallPositio(relativePosition);
  //   }
  // }, [temp, barWidth]);

  const colorBars = document.querySelectorAll(".bar .progress-bar");
  colorBars.forEach((colorBar) => {
    colorBar.style.background =
      "linear-gradient(145deg, #c8d190 -40%, #ef752b 40%)";
  });

  return (
    <>
      <div key={dailyKey} className="daily-weather-box">
        {!today ? <span>{getDay(day, timezone)}</span> : <span>Today</span>}

        <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
        <div className="daily-temperature">
          <span className="lowest-temp">{Math.round(min)}</span>
          <div className="bar">
            <div
              style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
              className="progress-bar"
            >
              {/* {today && (
                <div
                  className="outside-ball"
                  style={{ left: `${tempBallPosition}px` }}
                >
                  <div className="ball"></div>
                </div>
              )} */}
            </div>
          </div>
          <span>{Math.round(max)}</span>
        </div>
      </div>
      {!isLastItem && <div className="horisontal-bar"></div>}
    </>
  );
};

export default DailyForecast;
