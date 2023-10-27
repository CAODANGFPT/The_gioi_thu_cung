import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tbreed } from "../schema/breed";

const breedApi = createApi({
  reducerPath: "breed",
  tagTypes: ["Breed"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      breed: builder.query<Tbreed[], void>({
        query: () => {
          return {
            url: "/getAllBreedsSpecies",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useBreedQuery } = breedApi;
export const breedReducer = breedApi.reducer;
export default breedApi;
