import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSetTime, TSetTimeAdd } from "../schema/setTime";

const setTimeApi = createApi({
  reducerPath: "setTime",
  tagTypes: ["SetTime"],
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
      setTime: builder.query<TSetTime[], void>({
        query: () => {
          return {
            url: "/setTime",
            method: "GET",
          };
        },
        providesTags: ["SetTime"],
      }),
      createSetTime: builder.mutation<TSetTime, TSetTime>({
        query: (setTime) => ({
          url: `/settime`,
          method: "POST",
          body: setTime,
        }),
        invalidatesTags: ["SetTime"],
      }),
      removeSetTime: builder.mutation<TSetTimeAdd, number>({
        query: (id) => {
          return {
            url: `/settime/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["SetTime"],
      }),
    };
  },
});

export const { useSetTimeQuery, useCreateSetTimeMutation, useRemoveSetTimeMutation } = setTimeApi;
export const setTimeReducer = setTimeApi.reducer;
export default setTimeApi;
