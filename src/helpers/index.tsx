import { forecastType } from "../types/index";
import { DateTime } from "luxon";

export const firstLetterUppercase = (word: string) => {
  const str = word;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);

  return str2;
};

export const uvInfo = (
  uv: number,
  hourly: forecastType["hourly"],
  timezone: string,
  dt: number
): { level: string; info: string } => {
  const dateTime = DateTime.fromSeconds(dt, { zone: timezone });
  const currentHour = dateTime.hour;

  const upcomingHours = hourly.filter((hour) => {
    const hourDate = DateTime.fromSeconds(hour.dt, { zone: timezone });
    const hourValue = hourDate.hour;
    return hourValue > currentHour && hourValue < 24;
  });

  let startWarningHour = null;
  let endWarningHour = null;

  if (upcomingHours.length <= 24) {
    const nearestHighUv = upcomingHours.find((hour) => hour.uvi >= 2);

    if (nearestHighUv) {
      const highDate = DateTime.fromSeconds(nearestHighUv.dt, {
        zone: timezone,
      });

      startWarningHour = highDate.hour;

      const startIndex = upcomingHours.findIndex(
        (hour) => hour === nearestHighUv
      );
      console.log(upcomingHours);
      

      if (startIndex !== -1) {
  
        const nearestLowUvHour = upcomingHours.find((hour, index) => index > startIndex && hour.uvi < 4);

      
        console.log(nearestLowUvHour);
        

      
        if (nearestLowUvHour) {
          const lowDate = DateTime.fromSeconds(nearestLowUvHour.dt, {
            zone: timezone,
          });
  
          endWarningHour = lowDate.hour;
        }
      }
    }
  } else {
    const nearestLowUvHour = upcomingHours.find((hour) => hour.uvi < 2);

    if (nearestLowUvHour) {
      const lowDate = DateTime.fromSeconds(nearestLowUvHour.dt, {
        zone: timezone,
      });

      endWarningHour = lowDate.hour;
    }
  }

  const roundUv = Math.round(uv);

  if (endWarningHour !== null) {
    if (roundUv >= 3 && roundUv < 6)
      return {
        level: "Moderate",
        info: `Use sun protection until ${endWarningHour}:00.`,
      };
    if (roundUv >= 5 && roundUv < 8)
      return {
        level: "High",
        info: `Avoid the sun until ${endWarningHour}:00.`,
      };
    if (roundUv >= 7 && roundUv < 11)
      return {
        level: "Very high",
        info: `Avoid the sun until ${endWarningHour}:00.`,
      };
    if (roundUv > 10)
      return {
        level: "Extreme",
        info: `Avoid the sun until ${endWarningHour}:00.`,
      };
    if (
      startWarningHour !== null &&
      roundUv <= 2 &&
      currentHour < startWarningHour
    )
      return {
        level: "Low",
        info: `Keep out of the sun from ${startWarningHour}:00 to ${endWarningHour}:00.`,
      };

    if (roundUv <= 2 && endWarningHour < 17) {
      return {
        level: "Low",
        info: "UV is at a low level.",
      };
    }
  }

  return { level: "Low", info: "It stays low for the rest of the day." };
};

export const getWindDirection = (deg: number): string => {
  if (deg > 15 && deg <= 75) return "NE";

  if (deg > 76 && deg <= 105) return "E";
  if (deg > 105 && deg <= 165) return "SE";

  if (deg > 166 && deg <= 195) return "S";
  if (deg > 195 && deg <= 255) return "SW";

  if (deg > 255 && deg <= 285) return "W";
  if (deg > 285 && deg <= 345) return "NW";

  return "N";
};

export const feelsLikeInfo = (
  feelsLike: number,
  currentTemp: number
): string => {
  const fLTemp = Math.round(feelsLike);
  const temp = Math.round(currentTemp);

  if (temp <= 10) {
    if (fLTemp === temp) return "Similar to the actual temperature.";
    if (fLTemp < temp) return "Wind is making it feel cooler.";
  }

  if (temp >= 27) {
    if (fLTemp === temp) return "Similar to the actual temperature.";
    if (fLTemp > temp) return "Humidity is making it feel warmer.";
  }

  return "Similar to the actual temperature.";
};

export const visibilityKm = (visibility: number) => {
  const kmVisibility = visibility / 1000;

  return kmVisibility;
};

export const visibilityInfo = (visibility: number): string => {
  const kmVisibility = visibility / 1000;

  if (kmVisibility < 10) return "Visibility is low.";

  return "Perfect clear view.";
};

export const setBackgroud = (weather: string | undefined) => {
  const background = document.querySelector(".weather-window ") as HTMLElement;
  const hours = new Date().getHours();

  if (background) {
    const weatherGradients: Record<string, string> = {
      Mist: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Smoke: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Haze: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Dust: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Fog: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Sand: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Ash: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Squall: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Tornado: "linear-gradient(180deg, #fff -10%, #245C81 80%)",
      Thunderstorm: "linear-gradient(180deg, #fff -50%, #444e55 40%)",
      Rain: "linear-gradient(180deg, #fff -50%, #444e55 40%)",
      Drizzle: "linear-gradient(180deg, #fff -50%, #444e55 40%)",
      Clouds: "linear-gradient(180deg, #fff -20%, #245C81 40%)",
    };

    if (typeof weather === "string") {
      if (weather in weatherGradients) {
        background.style.background = weatherGradients[weather];
        return;
      }

      if (weather === "Clear" && hours > 20 && hours < 5) {
        background.style.background =
          "linear-gradient(90deg, rgba(2,0,36,1) 50%, rgba(9,9,121,1) 100%, rgba(0,212,255,1) 100%)";
        return;
      }

      background.style.background =
        "linear-gradient(145deg, #ffed4b -40%, #2f99df 40%)";
      return;
    }
  }
};
