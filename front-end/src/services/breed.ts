import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBreed } from "../schema/breed";

const breedApi = createApi({
  reducerPath: "breed",
  tagTypes: ["Breed"],
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
      breed: builder.query<TBreed[], void>({
        query: () => {
          return {
            url: "/getAllBreedsSpecies",
            method: "GET",
          };
        },
          providesTags: ["Breed"],
      }),
       getBreedById: builder.query<TBreed, number>({
        query: (id) => {
          return {
            url: `/breed/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Breed"],
      }),
       updateBreed: builder.mutation<TBreed[], TBreed>({
        query: (breed) => {
          return {
             url: `/breed/${breed.id}`,
            method: "PATCH",
            body: breed
          };
        },
        invalidatesTags: ["Breed"],
      }),
    removeBreed: builder.mutation<TBreed, number>({
        query: (id) => {
          return {
            url: `/breed/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Breed"],
      }),
       createBreed: builder.mutation<TBreed, TBreed>({
        query: (breed) => ({
          url: `/breed`,
          method: "POST",
          body: breed
        }),
        invalidatesTags: ["Breed"],
      }),
    };
    
  },
});

export const { useBreedQuery, useGetBreedByIdQuery, useUpdateBreedMutation, useRemoveBreedMutation, useCreateBreedMutation } = breedApi;
export const breedReducer = breedApi.reducer;
export default breedApi;
