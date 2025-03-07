import type { TCity } from "../types";

import { CITIES } from "../mock/cities";

export type TGetCitiesParams = {
  query: string;
  limit: number;
  offset: number;
};

export type TGetCitiesResponse = {
  data: TCity[];
  total: number;
  offset: number;
  limit: number;
};

export function getCities({
  query = "",
  offset = 0,
  limit = 10,
}: TGetCitiesParams): TGetCitiesResponse {
  query = query.trimStart().toLowerCase();

  const cities =
    query.length === 0
      ? CITIES
      : CITIES.filter(({ lowerCaseCity }) => lowerCaseCity.includes(query));

  const data = cities.slice(offset, offset + limit);
  const total = cities.length;

  return { data, total, offset, limit };
}
