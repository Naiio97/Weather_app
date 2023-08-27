import { forecastType } from "../types/index";

export const firstLetterUppercase = (word: string) => {
  const str = word;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);

  return str2;
};

export const uvInfo = (
  uv: number,
  hourly: forecastType["hourly"]
): { level: string; info: string } => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const upcomingHours = hourly.filter((hour) => {
    const hourDate = new Date(hour.dt * 1000);
    const hourValue = hourDate.getHours();
    return hourValue > currentHour && hourValue < 23;
  });


  let startWarningHour = null;
  let endWarningHour = null;
  if (upcomingHours.length > 23) {
    const nearestHighUv = upcomingHours.find((hour) => hour.uvi > 2);
    if (nearestHighUv) {
      const highDate = new Date(nearestHighUv.dt * 1000);
      startWarningHour = highDate.getHours();

      const startIndex = upcomingHours.findIndex(
        (hour) => hour === nearestHighUv
      );
      if (startIndex !== -1) {
        const nearestLowUvHour = upcomingHours
          .slice(startIndex)
          .find((hour) => hour.uvi < 2);

        if (nearestLowUvHour) {
          const lowDate = new Date(nearestLowUvHour.dt * 1000);
          endWarningHour = lowDate.getHours();
        }
      }
    }
  } else {
    const nearestLowUvHour = upcomingHours.find((hour) => hour.uvi < 2);

    if (nearestLowUvHour) {
      const lowDate = new Date(nearestLowUvHour.dt * 1000);

      endWarningHour = lowDate.getHours();
    }
  }

  const roundUv = Math.round(uv)
  

  if(endWarningHour !== null){
    if(roundUv <= 2 && endWarningHour < 17){
        return {
            level: "Low",
            info: "UV is at a low level.",
          };
    }
    if (roundUv >= 3 && roundUv < 6)
    return {
      level: "Moderate",
      info: `Use sun protection until ${endWarningHour}:00.`,
    };
  if (roundUv >= 5 && roundUv < 8 )
    return { level: "High", info: `Avoid the sun until ${endWarningHour}:00.` };
  if (roundUv >= 7 && roundUv < 11 && endWarningHour < 17)
    return {
      level: "Very high",
      info: `Avoid the sun until ${endWarningHour}:00.`,
    };
  if (roundUv > 10)
    return {
      level: "Extreme",
      info: `Avoid the sun until ${endWarningHour}:00.`,
    };
    if (startWarningHour !== null && roundUv <= 2 && currentHour < startWarningHour)
    return {
      level: "Low",
      info: `Keep out of the sun from ${startWarningHour}:00 to ${endWarningHour}:00.`,
    };
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

export const feelsLikeInfo = (feelsLike: number, currentTemp: number): string => {
    const fLTemp = Math.round(feelsLike);
    const temp = Math.round(currentTemp);

    if(temp <= 10) {
        if(fLTemp === temp) return "Similar to the actual temperature."
        if(fLTemp < temp) return "Wind is making it feel cooler."
    }
    
    if(temp >= 27 ){
        if(fLTemp === temp) return "Similar to the actual temperature."
        if(fLTemp > temp) return "Humidity is making it feel warmer."
    }

    return "Similar to the actual temperature.";
}

export const visibilityKm = (visibility: number) => {
    const kmVisibility = visibility / 1000;

    return kmVisibility;
}

export const visibilityInfo = (visibility: number): string => {
    const kmVisibility = visibility / 1000;

    if(kmVisibility < 10) return "Visibility is low.";

    return "Perfect clear view.";
}