import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDashboard } from "../schema/dashboard";

const dashboardApi = createApi({
  reducerPath: "dashboard",
  tagTypes: ["Dashboard"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      list: builder.query<TDashboard[], void>({
        query: () => {
          return {
            url: "/dashboard",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      total: builder.query<number, void>({
        query: () => {
          return {
            url: "/dashboardTotal",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
    };
  },
});

export const { useListQuery, useTotalQuery } = dashboardApi;
export const dashboardReducer = dashboardApi.reducer;
export default dashboardApi;
