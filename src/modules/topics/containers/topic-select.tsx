"use client";

import { Button, Combobox, Input, InputBase, Text, useCombobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState, type FC } from "react";

import type { TTopic } from "../types";

import { getTopicLabel } from "../lib/get-topic-label";
import { useTopics } from "../hooks/use-topics";

type TTopicSelectProps = {
  initialValue?: TTopic;
  onChange?: (topic: TTopic) => void;
};

export const TopicSelect: FC<TTopicSelectProps> = ({ initialValue = null, onChange }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchValueDebounced] = useDebouncedValue(searchValue, 250);
  const [selectedTopic, setSelectedTopic] = useState<TTopic | null>(initialValue);

  useEffect(() => {
    if (!selectedTopic) return;
    if (!onChange) return;

    onChange(selectedTopic);
  }, [selectedTopic, onChange]);

  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useTopics(searchValueDebounced);

  const { options } = useMemo(() => {
    const topics = data?.pages.flatMap((page) => page.data) ?? [];

    const options = topics.map((topic) => (
      <Combobox.Option key={topic} value={topic}>
        <Text>{getTopicLabel(topic)}</Text>
      </Combobox.Option>
    ));

    return { topics, options };
  }, [data]);

  return (
    <Combobox
      position="bottom"
      store={combobox}
      onOptionSubmit={(topic) => {
        setSelectedTopic(topic as TTopic);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          pointer
          size="md"
          type="button"
          component="button"
          rightSectionPointerEvents="none"
          rightSection={<Combobox.Chevron />}
          onClick={() => {
            combobox.toggleDropdown();
            combobox.focusSearchInput();
          }}
        >
          {selectedTopic ? (
            <Text>{getTopicLabel(selectedTopic)}</Text>
          ) : (
            <Input.Placeholder>Choose topic</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          size="md"
          type="search"
          placeholder="Search topics"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />

        <Combobox.Options className="max-h-60 overflow-y-auto">
          {options}

          {isFetching || isFetchingNextPage ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : options.length === 0 ? (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          ) : null}

          {hasNextPage && !isFetchingNextPage ? (
            <Combobox.Empty>
              <Button
                fullWidth
                variant="white"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                Load More
              </Button>
            </Combobox.Empty>
          ) : null}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
