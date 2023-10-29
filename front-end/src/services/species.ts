import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tspecies } from "../schema/species";

const speciesApi = createApi({
  reducerPath: "species",
  tagTypes: ["Species"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      if (user) {
        const { accessToken } = JSON.parse(user);
        if (accessToken) {
          headers.set("Authorization", "Bearer " + accessToken);
        }
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
        getAllspecies: builder.query<Tspecies[], void>({
        query: () => {
          return {
            url: "/species",
            method: "GET",
          };
        },
        providesTags: ["Species"],

      }),
      getSpeciesById: builder.query<Tspecies, number>({
        query: (species) => {
          return {
            url: `/species/${species}`,
            method: "GET",
          };
        },
        providesTags: ["Species"],
      }),
      createSpecies: builder.mutation<Tspecies[], Partial<Tspecies>>({
        query: (species) => ({
          url: "/species",
          method: "POST",
          body: species, 
        }),
        invalidatesTags: ["Species"],

      }),
      updateSpecies: builder.mutation<Tspecies, Tspecies>({
        query: (species) => ({
            url: `/species/${species.id}`,
            method: "PUT",
            body: species
        }),
        invalidatesTags: ["Species"],

    })
    };
  },
});

export const { useGetAllspeciesQuery , useGetSpeciesByIdQuery , useUpdateSpeciesMutation , useCreateSpeciesMutation} = speciesApi;
export const speciesReducer = speciesApi.reducer;
export default speciesApi;
