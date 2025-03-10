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

function searchCities(query: string): TCity[] {
  query = query.trimStart().toLowerCase();

  if (query.length === 0) return CITIES;

  const startingWithQuery = CITIES.filter(({ cityNameLowerCase }) =>
    cityNameLowerCase.startsWith(query),
  );

  const containingQuery = CITIES.filter(({ cityNameLowerCase }) =>
    cityNameLowerCase.includes(query),
  );

  const uniqueCities = Array.from(new Set([...startingWithQuery, ...containingQuery]));

  const sortedByPopulationDesc = uniqueCities.sort((a, b) => b.cityPopulation - a.cityPopulation);

  return sortedByPopulationDesc;
}

export function getCities({
  query = "",
  offset = 0,
  limit = 10,
}: TGetCitiesParams): TGetCitiesResponse {
  const cities = searchCities(query);
  const data = cities.slice(offset, offset + limit);
  const total = cities.length;

  return { data, total, offset, limit };
}
