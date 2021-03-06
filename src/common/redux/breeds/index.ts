import type { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppState } from "common/redux/store";
import type { Breed } from "common/types";
import { GET_BREEDS_URL } from "common/utils/api";
import { HYDRATE } from "next-redux-wrapper";

import filterByCategories from "./filterByCategories";
import filterByLifeSpan from "./filterByLifeSpan";
import filterByName from "./filterByName";
import filterBySize from "./filterBySize";

interface Filters {
  name?: string;
  categories?: Array<string>;
  sizes?: Array<string>;
  lifeSpan?: number;
  temperament?: Array<string>;
  count?: number;
}

interface BreedsState {
  data: Array<Breed>;
  filteredBreeds: Array<Breed>;
  filters: Filters;
  status: string;
}

export const initialState: BreedsState = {
  data: [],
  filteredBreeds: [],
  filters: {
    name: "",
    categories: [],
    sizes: [],
    lifeSpan: 6,
    temperament: [],
    count: 0,
  },
  status: "idle",
};

export const fetchBreeds = createAsyncThunk("breeds/fetchBreeds", async () => {
  const res = await fetch(GET_BREEDS_URL);
  const breeds = await res.json();

  return breeds;
});

const reducers = {
  filterBreeds: (state: any, action: PayloadAction<Filters>) => {
    state.filters = { ...state.filters, ...action.payload };

    const filteredBreedsByName =
      state.filters.name.length === 0
        ? state.data
        : filterByName(state.data, state.filters.name);

    const filteredBreedsByCategories = filterByCategories(
      state.data,
      state.filters.categories
    );

    const filteredBreedsBySize = filterBySize(state.data, state.filters.sizes);

    const filteredBreedsByLifeSpan = filterByLifeSpan(
      state.data,
      state.filters.lifeSpan
    );

    const filteredBreeds = filteredBreedsByName.filter((target: any) => {
      const elementExists =
        filteredBreedsBySize.includes(target) &&
        filteredBreedsByCategories.includes(target) &&
        filteredBreedsByLifeSpan.includes(target);

      return elementExists;
    });

    // Set filters count
    (() => {
      let count: number = 0;
      if (state.filters.name.length !== 0) count += 1;
      count += state.filters.categories.length;
      count += state.filters.sizes.length;
      if (state.filters.lifeSpan !== 6) count += 1;
      state.filters.count = count;
    })();

    state.filteredBreeds = filteredBreeds;
  },
};

export const breedsSlice = createSlice({
  name: "breeds",
  initialState,
  reducers,
  extraReducers(builder) {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreeds.fulfilled, (state, action: AnyAction) => {
        state.status = "idle";
        state.data = action.payload;
        state.filteredBreeds = action.payload;
      })
      .addCase(HYDRATE, (state, action: AnyAction) => {
        const nextState = {
          ...state,
          ...action.payload.breeds,
        };

        if (state.filters) nextState.filters = state.filters;
        if (state.status) nextState.status = state.status;

        return nextState;
      });
  },
});

export const { filterBreeds } = breedsSlice.actions;

export const selectBreeds = () => (state: AppState) => state.breeds.data;

export const selectFilteredBreeds = () => (state: AppState) =>
  state.breeds.filteredBreeds;

export const selectFilters = () => (state: AppState) => state.breeds.filters;

export const selectStatus = () => (state: AppState) => state.breeds.status;

export const selectAreBreedsFiltered =
  () =>
  (state: AppState): boolean => {
    return state.breeds.filters.count !== 0;
  };

export const selectFiltersCount = () => (state: AppState) =>
  state.breeds.filters.count;

export default breedsSlice.reducer;
