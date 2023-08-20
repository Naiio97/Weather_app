import "../styles/HourlyForecast.scss";

import sun from '../../public/sun-svgrepo-com.svg'

type HourlyForecast = {
  id: React.Key;
  hour: number;
  icon: string;
  temperature: number;
};

const HourlyForecast = (props: HourlyForecast) => {
  const { id, hour, icon, temperature } = props;
  

  return (
      <div key={id} className="hourly-weather-box">
        <span>{hour}</span>
        <img src={sun} />
        <span>{temperature}</span>
      </div>
  );
};

export default HourlyForecast;
