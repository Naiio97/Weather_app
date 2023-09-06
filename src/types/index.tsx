export type optionType = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export type forecastType = {
  alerts: [
    {
      description: string;
      start: number;
    }
  ];
  timezone: string;
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;

    weather: [
      {
        description: string;
        icon: string;
        main: string;
      }
    ];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  };
  daily: [
    {
      dt: number;
      rain: number;
      summary: string;
      temp: {
        max: number;
        min: number;
      };
      weather: [
        {
          icon: string;
        }
      ];
    }
  ];
  hourly: [
    {
      dt: number;
      temp: number;
      uvi: number;
      weather: [
        {
          icon: string;
        }
      ];
    }
  ];
};
