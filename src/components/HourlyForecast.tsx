import { DateTime } from "luxon";
import "../styles/HourlyForecast.scss";

type HourlyForecast = {
  hourKey: number;
  dt: number;
  timezone: string;
  temp: number;
  now: boolean;
  icon: string;
};

const HourlyForecast = (props: HourlyForecast) => {
  const { hourKey, dt, timezone, temp, now, icon } = props;

  const getHour = (dt: number, timezone: string): number => {
    const dateTime = DateTime.fromSeconds(dt, { zone: timezone });

    const hour = dateTime.hour;

    return hour;
  };

  return (
    <div key={hourKey} className="hourly-weather-box">
      {!now ? <span>{getHour(dt, timezone)}</span> : <span>Now</span>}
      <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
      <span>{Math.round(temp)}</span>
    </div>
  );
};

export default HourlyForecast;
