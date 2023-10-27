import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tspecies } from "../schema/species";

const speciesApi = createApi({
  reducerPath: "species",
  tagTypes: ["Species"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
        species: builder.query<Tspecies[], void>({
        query: () => {
          return {
            url: "/species",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useSpeciesQuery } = speciesApi;
export const speciesReducer = speciesApi.reducer;
export default speciesApi;
