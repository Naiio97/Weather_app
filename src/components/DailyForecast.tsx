import "../styles/DailyForecast.scss";

type Props = {
  dailyKey: number;
  day: number;
  min: number;
  max: number;
  icon: string;
  isLastItem: boolean;
  today: boolean;
};

const DailyForecast = (props: Props) => {
  const { dailyKey, day, min, max, icon, isLastItem, today } = props;

  const formatDtToDay = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    const formattedDay = date.getDay();
    const day = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return day[formattedDay];
  };

  return (
    <>
      <div key={dailyKey} className="daily-weather-box">
        {!today ? <span>{formatDtToDay(day)}</span> : <span>Today</span>}

        <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
        <div className="daily-temperature">
          <span className="lowest-temp">{Math.round(min)}</span>
          <div className="progress-bar">
            <div className="bar"></div>
          </div>
          <span>{Math.round(max)}</span>
        </div>
      </div>
      {!isLastItem && <div className="horisontal-bar"></div>}
    </>
  );
};

export default DailyForecast;
