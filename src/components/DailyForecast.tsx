import React from "react";

import "../styles/DailyForecast.scss";
import sun from "../../public/sun-svgrepo-com.svg";

type Props = {
  id: React.Key;
  day: string;
  lowest: number;
  higest: number;
  isLastItem: boolean;
};

const DailyForecast = (props: Props) => {
    const { id, day, lowest, higest, isLastItem } = props;

  return (
    <>
      <div key={id} className="daily-weather-box">
        <span>{day}</span>
        <img src={sun} />
        <div className="daily-temperature">
          <span className="lowest-temp">{lowest}</span>
          <div className="progress-bar">
            <div className="bar"></div>
          </div>
          <span>{higest}</span>
        </div>
      </div>
      {!isLastItem && <div className="horisontal-bar"></div>}
    </>
  );
};

export default DailyForecast;
