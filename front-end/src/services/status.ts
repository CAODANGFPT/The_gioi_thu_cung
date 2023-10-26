import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatus } from "../schema/status";

const statusApi = createApi({
  reducerPath: "status",
  tagTypes: ["Status"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
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
    };
  },
});

export const { useStatusQuery } = statusApi;
export const statusReducer = statusApi.reducer;
export default statusApi;
