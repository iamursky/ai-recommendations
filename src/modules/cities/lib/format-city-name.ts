import type { TCity } from "../types";

export function getCityLabel(city: TCity): string {
  return `${city.city}, ${city.country}`;
}
