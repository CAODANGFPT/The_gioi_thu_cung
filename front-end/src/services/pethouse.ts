import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TpetHouse } from "../schema/pethouse";

const pethouseApi = createApi({
  reducerPath: "pethouse",
  tagTypes: ["PetHouse"],
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
      getAllpetHouse: builder.query<TpetHouse[], void>({
        query: () => {
          return {
            url: "/pethouse",
            method: "GET",
          };
        },
        providesTags: ["PetHouse"],
      }),
      petHouseById: builder.query<TpetHouse, number>({
        query: (id) => {
          return {
            url: `/pethouse/${id}`,
            method: "GET",
          };
        },
        providesTags: ["PetHouse"],

      }),
      createPetHouse: builder.mutation<TpetHouse, TpetHouse>({
        query: (pethouse) => ({
            url: `/pethouse`,
            method: "POST",
            body: pethouse
        }),
        invalidatesTags: ["PetHouse"],

    }),
      updatePetHouse: builder.mutation<TpetHouse, TpetHouse>({
        query: (updatedPethouse) => ({
            url: `/pethouse/${updatedPethouse.id}`,
            method: "PUT",
            body: updatedPethouse
        }),
        invalidatesTags: ["PetHouse"],

    })
    };
  },
});

export const { useGetAllpetHouseQuery , usePetHouseByIdQuery , useUpdatePetHouseMutation , useCreatePetHouseMutation}  = pethouseApi;
export const pethouseReducer = pethouseApi.reducer;
export default pethouseApi;
