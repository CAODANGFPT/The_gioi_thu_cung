import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TNews } from "../schema/news";

const newsApi = createApi({
  reducerPath: "news",
  tagTypes: ["News"],
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
      news: builder.query<TNews[], void>({
        query: () => {
          return {
            url: "/getNewsUsers",
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      addNews: builder.mutation<TNews, Partial<TNews>>({
        query: (News) => ({
          url: `/news`,
          method: "POST",
          body: News,
        }),
        invalidatesTags: ["News"],
      }),
      removeNews: builder.mutation<TNews, number>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["News"],
      }),
    };
  },
});

export const { useNewsQuery, useAddNewsMutation, useRemoveNewsMutation } =
  newsApi;
export const newsReducer = newsApi.reducer;
export default newsApi;
