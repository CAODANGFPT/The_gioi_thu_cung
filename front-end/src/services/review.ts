import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBlockReview, TReview } from "../schema/review";

const reviewApi = createApi({
  reducerPath: "review",
  tagTypes: ["Review"],
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
      review: builder.query<TReview[], void>({
        query: () => {
          return {
            url: "/reviews",
            method: "GET",
          };
        },
        providesTags: ["Review"],
      }),
      updateBlockReview: builder.mutation<TBlockReview, Partial<TBlockReview>>({
        query: (review) => {
          return {
            url: "/blockReview",
            method: "PATCH",
            body: review,
          };
        },
        invalidatesTags: ["Review"],
      }),
    };
  },
});

export const { useReviewQuery, useUpdateBlockReviewMutation } = reviewApi;
export const reviewReducer = reviewApi.reducer;
export default reviewApi;
