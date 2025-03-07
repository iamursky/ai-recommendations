"use client";

import { useEffect, useMemo, type FC } from "react";
import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";

import { Button, Text } from "@mantine/core";

type TRecommendationChatProps = {
  city: string;
  topic: string;
};

export const RecommendationsChat: FC<TRecommendationChatProps> = ({ city, topic }) => {
  const { messages, error, reload, handleSubmit } = useChat({
    api: "/api/ai/recommendations",
    body: { city, topic },
  });

  const markdown = useMemo(() => {
    if (messages.length === 0) return "";
    return messages.flatMap((message) => message.content).join("\n");
  }, [messages]);

  useEffect(() => {
    if (!city) return;
    if (!topic) return;

    handleSubmit(undefined, { allowEmptySubmit: true });
  }, [city, topic, handleSubmit]);

  return error ? (
    <div className="flex flex-col gap-6">
      <Text>An error occurred, please try again.</Text>
      <Button fullWidth size="md" variant="filled" onClick={() => reload()}>
        Retry
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      <Markdown>{markdown}</Markdown>
    </div>
  );
};
