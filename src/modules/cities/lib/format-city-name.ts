import type { TCity } from "../types";

export function getCityLabel(city: TCity): string {
  return `${city.cityName}, ${city.countryName}`;
}
