import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatus } from "../schema/status";

const statusApi = createApi({
  reducerPath: "status",
  tagTypes: ["Status"],
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
      status: builder.query<TStatus[], void>({
        query: () => {
          return {
            url: "/status",
            method: "GET",
          };
        },
      }),
      
      createStatus: builder.mutation<TStatus[], Partial<TStatus>>({
        query: (statusData) => ({
          url: "/status",
          method: "POST",
          body: statusData, 
        }),
      }),
    };
  },
});

export const { useStatusQuery, useCreateStatusMutation } = statusApi;
export const statusReducer = statusApi.reducer;
export default statusApi;
