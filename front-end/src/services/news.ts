import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TContact } from "../schema/contact";

const newsApi = createApi({
  reducerPath: "news",
  tagTypes: ["News"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      news: builder.query<TContact[], void>({
        query: () => {
          return {
            url: "/getNewsUsers",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useNewsQuery } = newsApi;
export const newsReducer = newsApi.reducer;
export default newsApi;
