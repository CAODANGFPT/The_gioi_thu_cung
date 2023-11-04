import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPets } from "../schema/pets";

const petsApi = createApi({
  reducerPath: "pets",
  tagTypes: ["Pets"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      getAllPets: builder.query<TPets[], void>({
        query: () => {
          return {
            url: "/pets",
            method: "GET",
          };
        },
        providesTags: ["Pets"],
      }),

      createPets: builder.mutation<TPets[], Partial<TPets>>({
        query: (pets) => ({
          url: "/pets",
          method: "POST",
          body: pets, 
        }),
        invalidatesTags: ["Pets"],

      }),
    };
  },
});

export const { useGetAllPetsQuery, useCreatePetsMutation } = petsApi;
export const petsReducer = petsApi.reducer;
export default petsApi;
