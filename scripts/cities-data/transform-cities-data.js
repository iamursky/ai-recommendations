/* eslint-disable @typescript-eslint/no-require-imports */

const { randomUUID } = require("crypto");
const { resolve } = require("path");
const { writeFile } = require("fs");

// Source: https://github.com/dr5hn/countries-states-cities-database
const citiesData = require("./cities.json");

// Source: https://raw.githubusercontent.com/lmfmaier/cities-json
const pupulationData = require("./population.json");

const outputData = [];

citiesData.forEach((country) => {
  const cities = country.cities.map((city) => city.name);
  const uniqueCities = Array.from(new Set(cities));

  if (uniqueCities.length === 0) return;

  uniqueCities.forEach((cityName) => {
    console.log(`${country.name}, ${cityName}`);

    const cityNameLowerCase = cityName.toLowerCase();

    const cityPopulationData = pupulationData.find(
      (city) => city.name.toLowerCase() === cityNameLowerCase,
    );

    const cityPopulation = cityPopulationData ? parseInt(cityPopulationData.pop) : null;

    if (cityPopulationData) {
      outputData.push({
        cityName,
        cityNameLowerCase,
        cityPopulation,
        id: randomUUID(),
        countryName: country.name,
      });
    }
  });
}, {});

writeFile(resolve(__dirname, "output.json"), JSON.stringify(outputData, null, 2), "utf8", (err) => {
  if (err) console.error("Error writing data to output.json:", err);
  else console.log("Successfully wrote data to output.json");
});
