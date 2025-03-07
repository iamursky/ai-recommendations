import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

type TGetRecommendationsParams = {
  city: string;
  topic: string;
};

export function getRecommendations({ city, topic }: TGetRecommendationsParams) {
  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `Recommend top 10 ${topic} places and activities in ${city}. Use Markdown to format the response.`,
    messages: [],
  });

  return result.toDataStreamResponse();
}
