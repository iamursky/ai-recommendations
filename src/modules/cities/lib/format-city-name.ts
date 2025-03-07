import type { TCity } from "../types";

export function formatCityName(city: TCity): string {
  return `${city.city}, ${city.country}`;
}
