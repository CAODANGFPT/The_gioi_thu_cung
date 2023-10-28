import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TReview } from "../schema/review";

const reviewApi = createApi({
  reducerPath: "review",
  tagTypes: ["Review"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
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
      }),
    };
  },
});

export const { useReviewQuery } = reviewApi;
export const reviewReducer = reviewApi.reducer;
export default reviewApi;
