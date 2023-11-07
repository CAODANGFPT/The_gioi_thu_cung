import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PetsResponse, TPets } from "../schema/pets";

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
      getAllUserPets: builder.query<TPets[], number | undefined>({
        query: (id) => {
          return {
            url: `/ListUserPets/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Pets"],
      }),
      createPets: builder.mutation<PetsResponse, Partial<TPets>>({
        query: (pets) => ({
          url: "/pets",
          method: "POST",
          body: pets,
        }),
        invalidatesTags: ["Pets"],
      }),
       removePets: builder.mutation<TPets, number>({
        query: (id) => {
          return {
            url: `/pets/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Pets"],
      }),
    };
  },
});

export const {
  useGetAllPetsQuery,
  useGetAllUserPetsQuery,
  useCreatePetsMutation, useRemovePetsMutation
} = petsApi;
export const petsReducer = petsApi.reducer;
export default petsApi;
