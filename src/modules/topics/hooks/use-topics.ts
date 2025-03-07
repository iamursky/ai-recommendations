import { useInfiniteQuery } from "@tanstack/react-query";

import type { TGetTopicsResponse } from "../api/get-topics";

export function useTopics(query: string = "") {
  query = query.trimStart().toLowerCase();

  return useInfiniteQuery<TGetTopicsResponse>({
    queryKey: ["topics", query],
    initialPageParam: 0,

    queryFn: async (context) => {
      const offset = String(context.pageParam ?? 0);
      const urlSearchParams = new URLSearchParams({ query, offset });
      const response = await fetch(`/api/topics?${urlSearchParams}`);
      const data = await response.json();

      return data;
    },

    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      return nextOffset < lastPage.total ? nextOffset : null;
    },
  });
}
