import type { TTopic } from "../types";

import { TOPICS } from "../mock/topics";

export type TGetTopicsParams = {
  query: string;
  limit: number;
  offset: number;
};

export type TGetTopicsResponse = {
  data: TTopic[];
  total: number;
  offset: number;
  limit: number;
};

export function getTopics({
  query = "",
  offset = 0,
  limit = 10,
}: TGetTopicsParams): TGetTopicsResponse {
  query = query.trimStart().toLowerCase();

  const topics = query.length === 0 ? TOPICS : TOPICS.filter((topic) => topic.includes(query));

  const data = topics.slice(offset, offset + limit);
  const total = topics.length;

  return { data, total, offset, limit };
}
