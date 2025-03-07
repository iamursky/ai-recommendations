import { useInfiniteQuery } from "@tanstack/react-query";

import type { TGetCitiesResponse } from "../api/get-cities";

export function useCities(query: string = "") {
  query = query.trimStart().toLowerCase();

  return useInfiniteQuery<TGetCitiesResponse>({
    queryKey: ["cities", query],
    initialPageParam: 0,

    queryFn: async (context) => {
      const offset = String(context.pageParam ?? 0);
      const urlSearchParams = new URLSearchParams({ query, offset });
      const response = await fetch(`/api/cities?${urlSearchParams}`);
      const data = await response.json();

      return data;
    },

    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      return nextOffset < lastPage.total ? nextOffset : null;
    },
  });
}
