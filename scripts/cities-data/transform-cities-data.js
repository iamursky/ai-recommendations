/* eslint-disable @typescript-eslint/no-require-imports */

const { randomUUID } = require("crypto");
const { resolve } = require("path");
const { writeFile } = require("fs");

// Source: https://github.com/dr5hn/countries-states-cities-database
const inputData = require("./input.json");

const outputData = [];

inputData.forEach((country) => {
  const cities = country.cities.map((city) => city.name);
  const uniqueCities = Array.from(new Set(cities));

  if (uniqueCities.length === 0) return;

  uniqueCities.forEach((cityName) => {
    outputData.push({
      id: randomUUID(),
      city: cityName,
      country: country.name,
      lowerCaseCity: cityName.toLowerCase(),
      lowerCaseCountry: country.name.toLowerCase(),
    });
  });
}, {});

writeFile(resolve(__dirname, "output.json"), JSON.stringify(outputData, null, 2), "utf8", (err) => {
  if (err) console.error("Error writing data to output.json:", err);
  else console.log("Successfully wrote data to output.json");
});
