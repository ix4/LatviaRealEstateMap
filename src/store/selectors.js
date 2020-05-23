import axios from "axios";
import { selector } from "recoil";
import parse from "csv-parse/lib/sync";

import { filterState } from "./state";

const getCategoryFilter = selector({
  key: "filters.category",
  get: ({ get }) => get(filterState).category,
});
const getTypeFilter = selector({
  key: "filters.type",
  get: ({ get }) => get(filterState).type,
});
const getLocationFilter = selector({
  key: "filters.location",
  get: ({ get }) => get(filterState).location,
});

export const getPrices = async (category, type) => {
  const { data: csvString } = await axios.get(
    `https://raw.githubusercontent.com/brokalys/data/master/data/${category}/${type}-monthly-riga.csv`
  );

  const csv = parse(csvString);
  const header = csv.shift();
  const [, , ...locations] = header;

  return locations
    .map((row, index) => ({
      location: row,
      prices: csv.map((price) => ({
        start: price[0],
        end: price[1],
        value: parseInt(price[index + 2]),
      })),
    }))
    .reduce((carry, row) => ({ ...carry, [row.location]: row.prices }), {});
};

export const getPricesInFilteredLocation = selector({
  key: "priceInFilteredLocation",
  get: async ({ get }) => {
    const location = get(getLocationFilter);
    const type = get(getTypeFilter);
    const category = get(getCategoryFilter);
    const data = await getPrices(category, type);
    return data[location];
  },
});

export const getMedianPriceLastMonth = selector({
  key: "medianPriceLastMonth",
  get: async ({ get }) => {
    const data = await get(getPricesInFilteredLocation);
    const { value } = data[data.length - 1];

    return {
      price: value,
      change: {
        mom: (1 - value / data[data.length - 2].value) * 100,
        yoy: (1 - value / data[data.length - 13].value) * 100,
      },
    };
  },
});

export const getRentalYield = selector({
  key: "rentalYield",
  get: async ({ get }) => {
    const category = get(getCategoryFilter);
    const location = get(getLocationFilter);

    const rentData = (await getPrices(category, "rent"))[location];
    const sellData = (await getPrices(category, "sell"))[location];
    return (
      (rentData[rentData.length - 1].value /
        sellData[sellData.length - 1].value) *
      100
    );
  },
});