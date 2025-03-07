"use client";

import { Button, Combobox, Input, InputBase, Text, useCombobox } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState, type FC } from "react";

import type { TCity } from "../types";

import { formatCityName } from "../lib/format-city-name";
import { useCities } from "../hooks/use-cities";

type TCitySelectProps = {
  initialValue?: TCity;
  onChange?: (city: TCity) => void;
};

export const CitySelect: FC<TCitySelectProps> = ({ initialValue = null, onChange }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchValueDebounced] = useDebouncedValue(searchValue, 250);
  const [selectedCity, setSelectedCity] = useState<TCity | null>(initialValue);

  useEffect(() => {
    if (!selectedCity) return;
    if (!onChange) return;

    onChange(selectedCity);
  }, [selectedCity, onChange]);

  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useCities(searchValueDebounced);

  const { cities, options } = useMemo(() => {
    const cities = data?.pages.flatMap((page) => page.data) ?? [];

    const options = cities.map((city) => (
      <Combobox.Option key={city.id} value={city.id}>
        <Text>{formatCityName(city)}</Text>
      </Combobox.Option>
    ));

    return { cities, options };
  }, [data]);

  return (
    <Combobox
      position="bottom"
      store={combobox}
      onOptionSubmit={(cityId) => {
        const city = cities.find(({ id }) => id === cityId);
        setSelectedCity(city ?? null);
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
          {selectedCity ? (
            <Text>{formatCityName(selectedCity)}</Text>
          ) : (
            <Input.Placeholder>Select city</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          size="md"
          type="search"
          placeholder="Search cities"
          value={searchValue}
          leftSectionPointerEvents="none"
          leftSection={<IconSearch className="h-5 w-5" />}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />

        <Combobox.Options className="max-h-60 overflow-y-auto">
          {options}

          {isFetching || isFetchingNextPage ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : cities.length === 0 ? (
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
