import "../styles/HourlyForecast.scss";


type HourlyForecast = {
  hourKey: number;
  dt: number;
  temp: number;
  now: boolean;
  icon: string;
};

const HourlyForecast = (props: HourlyForecast) => {
  const { hourKey, dt, temp, now, icon } = props;
  
  
  const formatDtToHour = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    const formattedHour = date.getHours();
    return formattedHour;
  };  

  return (
    <div key={hourKey} className="hourly-weather-box">
      {!now ? <span>{formatDtToHour(dt)}</span> : <span>Now</span>}

      <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
      <span>{Math.round(temp)}</span>
    </div>
  );
};

export default HourlyForecast;
