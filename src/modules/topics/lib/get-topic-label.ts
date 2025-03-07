import type { TTopic } from "../types";

import { TOPIC_LABELS } from "../constants";

export function getTopicLabel(topic: TTopic): string {
  return TOPIC_LABELS[topic];
}
